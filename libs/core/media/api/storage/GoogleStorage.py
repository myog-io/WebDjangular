import hashlib
import uuid
import time
import random
import io
import sys
import tempfile
import json

from django.core.files.storage import Storage
from django.contrib.staticfiles.storage import FileSystemStorage

from django.core.exceptions import ValidationError

from google.auth.transport.requests import AuthorizedSession
from google.auth import compute_engine
from google.cloud import storage
from google.resumable_media import requests, common
from google.api_core import exceptions 

from django.utils.deconstruct import deconstructible
from datetime import datetime, timedelta
from libs.core.media.api.configs import CONFIG_STORAGE_JSON_CREDENTIALS, CONFIG_STORAGE_CONTAINER_NAME

UPLOAD_URL_PATTERN = 'https://www.googleapis.com/upload/storage' + \
    '/v1/b/{bucket}/o?uploadType=resumable'


@deconstructible
class GoogleStorage(FileSystemStorage):
    # in bytes, azure actual limit is 4Mb, we do 3 to be safe
    chunk_size = 256 * 1024
    container_name = None
    public_url = None
    client = None
    credentials = None
    bucket_name = None
    bucket = None
    request = None  # type: requests.ResumableUpload
    transport = None

    def __init__(self, **storage_config):
        super(GoogleStorage, self).__init__()
        credentials = json.loads(
            storage_config[CONFIG_STORAGE_JSON_CREDENTIALS])
        temp = tempfile.NamedTemporaryFile(delete=False)
        with open(temp.name, 'w') as f:
            json.dump(credentials, f)
        self.client = storage.Client.from_service_account_json(
            temp.name)
        self.bucket_name = storage_config[CONFIG_STORAGE_CONTAINER_NAME];
        self.bucket = self.client.get_bucket(self.bucket_name)
        self.transport = AuthorizedSession(
            credentials=self.client._credentials)


    def delete(self, name):
        try:
            self.bucket.blob(name).delete()
            print('Blob {} deleted.'.format(name))

        except exceptions.NotFound:
            super(GoogleStorage,self).delete(name)
            print('Blob {} was previus removed.'.format(name))
            pass
        
        return True

    def open(self, name, mode='rb', startByte=None, endByte=None, progress_callback=None):
        blob = GCSObjectStreamUpload(client=self.client, bucket_name=self.bucket_name, blob_name=name).read()
        
        if hasattr(blob, 'content'):
            return io.BytesIO(blob.content)
        else:
            return b""

    def openAsStream(self, name, stream, progress_callback=None):

        self.services['block_blob'].get_blob_to_stream(
            container_name=self.container_name,
            blob_name=name,
            stream=stream,
            progress_callback=progress_callback,
        )

    def exists(self, name):
        return self.bucket.blob(name).exists()

    def listdir(self):
        print("listdir() got called")
        return []

    def size(self, name):
        props = self.get_properties(name)
        return props.content_length

    def url(self, name):
        """
        This Function should return the Public URL to access the Image on the FrontEnd
        """
        blob = self.bucket.blob(name)
        if blob.exists():
            blob.make_public()

            print('Blob {} is publicly accessible at {}'.format(
                blob.name, blob.public_url))
            return blob.public_url
        else:
            return super(GoogleStorage, self).url(name)
        
    def urlWithSasAuth(self, name, ip=None, nameToGive=None):
        """
        SAS URl's are secure URL's
        """
        blob = self.bucket.blob(name)

        url = blob.generate_signed_url(
            response_disposition='attachment; filename={}'.format(nameToGive),
            # This URL is valid for 1 hour
            expiration=datetime.timedelta(hours=1),
            # Allow GET requests using this URL.
            method='GET')

        print('The signed url for {} is {}'.format(blob.name, url))
        return url

    def save(self, name, contents, max_length=None, progress_callback=None):
        with GCSObjectStreamUpload(client=self.client, bucket_name=self.bucket_name, blob_name=name) as s:
            s.write(contents)
        return name

    def append(self, name, contents, progress_callback=None):
        with GCSObjectStreamUpload(client=self.client, bucket_name=self.bucket_name, blob_name=name) as s:
            s.write(contents)
        return name

    def append_to_text(self, name, contents):
        '''
        Not Implemented
        '''
        raise NotImplementedError('Google Storage append_to_text is not implemented')

    def get_valid_name(self, name=''):
        uniqueName = str(uuid.uuid4()) + str(time.time) + str(random.random())
        uniqueName = hashlib.md5(uniqueName.encode('utf-8')).hexdigest()

        extension = name.split(".")

        if len(extension) > 1:
            uniqueName += "." + str(extension.pop())

        return uniqueName

    def get_properties(self, name=None):
        blob = self.bucket.get_blob(name)
        return blob

    def listContainer(self, prefix):
        return self.services['base_blob'].list_blobs(self.container_name, prefix)

class GCSObjectStreamUpload(object):
    def __init__(
            self, 
            client: storage.Client,
            bucket_name: str,
            blob_name: str,
            chunk_size: int=256 * 1024
        ):
        self._client = client
        self._bucket = self._client.bucket(bucket_name)
        self._blob = self._bucket.blob(blob_name)

        self._buffer = b''
        self._buffer_size = 0
        self._chunk_size = chunk_size
        self._read = 0

        self._transport = AuthorizedSession(
            credentials=self._client._credentials
        )
        self._request = None  # type: requests.ResumableUpload

    def __enter__(self):
        self.start()
        return self

    def __exit__(self, exc_type, *_):
        if exc_type is None:
            self.stop()

    def start(self):
        url = (
            f'https://www.googleapis.com/upload/storage/v1/b/'
            f'{self._bucket.name}/o?uploadType=resumable'
        )
        self._request = requests.ResumableUpload(
            upload_url=url, chunk_size=self._chunk_size
        )
        self._request.initiate(
            transport=self._transport,
            content_type='application/octet-stream',
            stream=self,
            stream_final=False,
            metadata={'name': self._blob.name},
        )

    def stop(self):
        self._request.transmit_next_chunk(self._transport)

    def write(self, data: bytes) -> int:
        data_len = len(data)
        self._buffer_size += data_len
        self._buffer += data.read()
        del data
        while self._buffer_size >= self._chunk_size:
            try:
                self._request.transmit_next_chunk(self._transport)
            except common.InvalidResponse:
                self._request.recover(self._transport)
        return data_len

    def read(self, chunk_size: int) -> bytes:
        # I'm not good with efficient no-copy buffering so if this is
        # wrong or there's a better way to do this let me know! :-)
        to_read = min(chunk_size, self._buffer_size)
        memview = memoryview(self._buffer)
        self._buffer = memview[to_read:].tobytes()
        self._read += to_read
        self._buffer_size -= to_read
        return memview[:to_read].tobytes()

    def tell(self) -> int:
        return self._read