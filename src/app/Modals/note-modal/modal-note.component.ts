import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-modal-note',
    templateUrl: './modal-note.component.html',
    styleUrls: ['./modal-note.component.scss']
  })
  export class NoteModalComponent {
    modal = {
      score: null,
      scoreMoyen: null,
      epreuve: '',
      sujet: ''
    }
    constructor(public dialogRef: MatDialogRef<NoteModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: string, public datepipe: DatePipe) { }
      close() {
        this.dialogRef.close(`<score score="12" base_score="13" subject="UE12" name="course à pied"></score>`);
      }
  }