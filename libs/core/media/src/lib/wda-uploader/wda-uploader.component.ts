import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';

import { NbAuthService } from '@nebular/auth';
import { FileUploader } from '@core/chunk-file-upload/src/lib/file-uploader.class';
import { FileItem } from '@core/chunk-file-upload/src/lib/file-item.class';
import { InputTypes } from '@core/cms/src/lib/models/FormField.model';
@Component({
    selector: 'wda-uploader',
    templateUrl: './wda-uploader.component.html',
    styleUrls: ['./wda-uploader.component.scss']
})

export class WdaUploaderComponent implements OnInit {

    // inputs comming from the user when initializing the component
    @Input() label = 'Choose a file';
    @Input() accept = '.png, .jpg, .jpeg, .pdf';
    @Input() buttonClass = 'btn btn-info';
    @Input() allowedFileType: string = null;
    @Input() service: any = null;
    // events dispatched, we may listen for then in the place where we implement the component
    @Output() progressEvent = new EventEmitter();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onLoadEvent = new EventEmitter();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onLoadStartEvent = new EventEmitter();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onLoadEndedEvent = new EventEmitter();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onErrorEvent = new EventEmitter();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onAbortEvent = new EventEmitter();
    // references to the inputs elements in the HTML
    @ViewChild('buttonInput') buttonInput;
    @ViewChild('fileInput') fileInput;

    public labelToShow: string = this.label; // we update this value in the upload, that is why we got 2 in this comp.
    public uploader: FileUploader;
    private token: string = null;

    constructor(
        private nbAuthService: NbAuthService,
    ) {

    }
    ngOnInit() {
        this.nbAuthService.getToken().subscribe(
            (result) => {
                this.token = result['token'];
            }
        );
        this.uploader = new FileUploader({
            uploaderService: this.service,
            authToken: 'pre_token',
            disableMultipart: false,
            isHTML5: true,
            // maxFileSize:
            queueLimit: 1,
            // allowedFileType: [this.allowedFileType],
        });
        this.setupCallbacks();
        this.labelToShow = this.label
    }

    onFileSelected(event) {

        if (event[0]) {
            this.uploader.addToQueue(event[0]);
        }

        this.uploader.uploadAll();
    }

    setupCallbacks() {

        this.uploader.onProgress = (e: any, item: FileItem) => {
            this.labelToShow = this.uploader.progress + '%';
            this.progressEvent.emit({ event: e, item: item });
        };
        this.uploader.onStart = (e: any, item: FileItem) => {
            this.onLoadEvent.emit({ event: e, item: item });
        };
        this.uploader.onSuccessItem = (item: FileItem, response, status, headers) => {
            this.labelToShow = this.label;
            this.onLoadEndedEvent.emit({ item: item, response: response, status: status, headers: headers });
            this.uploader.clearQueue();
        };
        this.uploader.onErrorItem = (item: FileItem, response, status, headers) => {
            this.onErrorEvent.emit({ item: item, response: response, status: status, headers: headers });
        };
        this.uploader.onAbort = (e) => {
            this.onAbortEvent.emit(e);
        };
    }

}


