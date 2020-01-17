import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatDialog } from '@angular/material';
import { Participant, Mail, LightMessage } from '../Models/models';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NoteModalComponent } from '../Modals/note-modal/modal-note.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.scss']
})

export class NewMailComponent implements OnInit {
  myControl = new FormControl();
  myControl2 = new FormControl();
  participants: Participant[] = [];
  listSelectedParticipant: Participant[] = [];
  loaded = 0;
  mailBody = {
    uuid: null,
    emitter: '',
    body: '',
    object: '',
    participants: []
  } as LightMessage;
  loadedResult = null;
  selectedOption = 'classique'; // classique ou polytech

  options = [
    { name: 'Classique', value: 'classique' },
    { name: 'Polytech', value: 'polytech' }
  ];
  userId = '';
  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      if (params.participantId) {
        this.userId = params.participantId;
        this.mailBody.emitter = this.userId;
      }
      this.loadAllParticipants();
    });
  }

  onSelectedParticipant(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    const currentParticipant: Participant = event.option.value;
    if (this.listSelectedParticipant
        .filter(participant => participant.id === currentParticipant.id)
          .length === 0) {
          this.listSelectedParticipant.push(currentParticipant);
      }
    document.getElementById('myinvisiblefield').focus();
  }

  ngOnInit() {
  }

  loadAllParticipants() {
    this.http.get<Participant[]>(`${environment.baseAPI}participants/all`).subscribe(
      (result) => {
        this.participants = result;
        console.log(this.participants);
        this.loaded++;
      }, (err) => {
        this.loaded++;
        console.log(err);
      }
    );
  }

    onChangeFormat(oldValue: any) {
      console.log(this.selectedOption);
    }

    openModalNote() {
      console.log('enter');
      const dialogRef = this.dialog.open(NoteModalComponent, {
        width: '250px'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('after close', result);
        this.mailBody.body += result;
      });
    }

    onSubmitMail(formMail: NgForm) {
      if (formMail.valid && this.listSelectedParticipant.length > 0) {
        console.log('enter');
        this.loadedResult = false;
        this.listSelectedParticipant.forEach(participant => {
          this.mailBody.participants.push(participant.id);
        });
        this.mailBody.bodySchema = 'string';
        this.http.post<Mail>(`${environment.baseAPI}emails/`, this.mailBody).subscribe(
          (result) => {
            this.loadedResult = true;
            setTimeout(() => {
              this.router.navigate([`/box-mail/${this.userId}`]);
            }, 5000);
          }, (err) => {
            this.loadedResult = null;
            console.log(err);
          }
        );
      }
    }
}
