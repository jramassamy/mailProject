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
    body = {
      xml: '',
      html: ''
    }
    constructor(public dialogRef: MatDialogRef<NoteModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: string, public datepipe: DatePipe) { }
      close() {
        // tslint:disable-next-line: max-line-length
        this.body.xml = `<score score="${this.modal.score}" base_score="${this.modal.scoreMoyen}" subject="${this.modal.sujet}" name="${this.modal.epreuve}"></score>`;
        this.body.html = `[Score: ${this.modal.score}, Score Moyen: ${this.modal.scoreMoyen} Sujet: ${this.modal.sujet} Nom du sujet: ${this.modal.epreuve}]`;
        this.dialogRef.close(this.body);
      }
  }