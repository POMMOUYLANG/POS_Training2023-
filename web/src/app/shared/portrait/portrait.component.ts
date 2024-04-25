// ==========================================================>> Core Library
import {
    Component,
    OnInit,
    Input,
    Inject,
    EventEmitter,
    Output,
} from '@angular/core';

// ==========================================================>> Third Party Library
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

// ==========================================================>> Custom Library
import { SnackbarService } from '../services/snackbar.service';

@Component({
    selector: 'app-portrait',
    templateUrl: './portrait.component.html',
    styleUrls: ['./portrait.component.scss'],
})
export class PortraitComponent implements OnInit {
    @Input() src: string = 'assets/icons/icon-img.png';
    @Input() index: string = '';
    @Input() title: string = 'ផ្ទុកឯកសារ​';
    @Input() mode: string = 'READONLY';
    @Input() responseType: string = 'base64';
    @Output() srcChange = new EventEmitter();

    constructor(
        public dialog: MatDialog,
        private snackBar: SnackbarService
    ) { }
    ngOnInit(): void {
        // trigger if datasource is changed then tell mateDataSource
    }

    fileChangeEvent(event: any): void {
        let check: string = '';
        check = event.target.files[0].type;
        if (check.substring(0, 5) === 'image') {
            console.log(check.substring(0, 5));
            const dialogRef = this.dialog.open(PortraitDialogComponent, {
                width: '600px',
                data: {
                    event: event,
                    responseType: this.responseType,
                },
            });

            dialogRef.afterClosed().subscribe((result) => {
                if (result !== '') {
                    this.src = result;
                    this.srcChange.emit(result);
                }
            });
        } else {
            console.log(check.substring(0, 5));
            this.snackBar.openSnackBar('សូមជ្រើសរើស file ប្រភេទជារូបភាព', 'error');
        }
    }

    selectFile(): any {
        if (this.mode === 'READONLY') {
            return;
        }
        document.getElementById('portrait-file-' + this.index).click();
    }
}

// ===================================================================>> Dialog
@Component({
    templateUrl: 'portrait.dialog.component.html',
    styleUrls: ['./portrait.component.scss'],
})
export class PortraitDialogComponent {
    public result: any;
    public imageChangedEvent: any = '';

    constructor(
        public dialogRef: MatDialogRef<PortraitDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.imageChangedEvent = data.event;
    }

    close(): void {
        this.dialogRef.close('');
    }

    imageCropped(event: ImageCroppedEvent): any {
        if (this.data.responseType === 'base64') {
            this.result = event.base64 ? event.base64 : '';
        } else {
            this.result = event;
        }
    }
    imageLoaded(): any {
        // show cropper
    }
    cropperReady(): any {
        // cropper ready
    }
    loadImageFailed(): any {
        // show message
    }
}
