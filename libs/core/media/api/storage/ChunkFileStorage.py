import os

from django.contrib.staticfiles.storage import FileSystemStorage
from django.core.files import File, locks
from django.core.files.move import file_move_safe
from django.utils.encoding import filepath_to_uri
from libs.core.media.api.models.Media import media_path

from urllib.parse import urljoin


class ChunkFileStorage(FileSystemStorage):

    def append(self, name, content, progress_callback=None):
        full_path = self.path(name)
        while True:

            # This file has a file path that we can move.
            if hasattr(content, 'temporary_file_path'):
                file_move_safe(content.temporary_file_path(), full_path)

            # This is a normal uploadedfile that we can stream.
            else:
                # This fun binary flag incantation makes os.open throw an
                # OSError if the file already exists before we open it.
                flags = (os.O_WRONLY | getattr(os, 'O_BINARY', 0))
                # The current umask value is masked out by os.open!
                fd = os.open(full_path, flags, 0o666)
                _file = None
                try:
                    locks.lock(fd, locks.LOCK_EX)
                    for chunk in content.chunks():
                        if _file is None:
                            # if isinstance(chunk, bytes) else 'wt'
                            mode = 'ab'
                            _file = os.fdopen(fd, mode)

                        _file.write(chunk)
                    break
                finally:
                    locks.unlock(fd)
                    if _file is not None:
                        _file.close()
                    else:
                        os.close(fd)
                    break

        if self.file_permissions_mode is not None:
            os.chmod(full_path, self.file_permissions_mode)

        # Store filenames with forward slashes, even on Windows.
        return name.replace('\\', '/')

    def urlWithSasAuth(self, name, ip=None, nameToGive=None):
        print("urlWithSasAuth() got called")

