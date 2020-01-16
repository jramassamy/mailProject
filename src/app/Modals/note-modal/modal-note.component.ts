import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-modal-note',
    templateUrl: './modal-note.component.html',
    styleUrls: ['./modal-note.component.scss']
  })
  export class NoteModalComponent {

    date: Date;
    constructor(public dialogRef: MatDialogRef<NoteModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: string, public datepipe: DatePipe) { }
      close() {
        // let date =this.datepipe.transform(this.date, 'fullDate');
        // this.dialogRef.close(`<div data-type="date">
        // <img src='./assets/Calendar_Green.png' style="width: 100px; height: auto;"/>
        // <p>${date}</p>
        // </div>`);
      }
  }