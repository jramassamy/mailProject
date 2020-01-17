import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Mail, LightMessage, Participant } from '../Models/models';
import { NgForm, FormControl } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { MatAutocompleteSelectedEvent, MatDialog } from '@angular/material';
import { environment } from 'src/environments/environment';
import { NoteModalComponent } from '../Modals/note-modal/modal-note.component';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-mail-details',
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.scss']
})
export class MailDetailsComponent implements OnInit {
  myControl = new FormControl();
  userId = '';
  mailUUID = '';
  mail: Mail = null;
  answer = {
    uuid: '',
    emitter: '',
    body: '',
    participants: [],
    bodySchema: 'string'
  } as LightMessage;
  loaded = 0;
  participants: Participant[] = [];
  loadedResult = null;
  selectedOption = 'classique'; // classique ou polytech

  options = [
    { name: 'Classique', value: 'classique' },
    { name: 'Polytech', value: 'polytech' }
  ];
  listXMLToParse = [];
  constructor(public dialog: MatDialog, private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private userService: UserServiceService) {
    this.route.params.subscribe((params) => {
      if (params.participantId) {
        this.userId = params.participantId;
      }
      if (params.mailUUID) {
        this.mailUUID = params.mailUUID;
      }
      this.loadMail();
      this.loadAllParticipants();
    });
  }

  ngOnInit() {
  }

  loadMail() {
    this.http.get<Mail>(`${environment.baseAPI}emails/${this.mailUUID}`).subscribe(
      (result) => {
        result.historic.messages.forEach(
          (message) => {
            message.body.content = this.decodeScore(message.body.content);
          }
        );
        this.mail = result;
        this.answer.uuid = this.mailUUID;
        this.answer.emitter = this.userId;
        this.mail.participants.forEach(participant => {
          this.answer.participants.push(participant.id);
        });
        this.loaded++;
      }, (err) => {
        this.loaded++;
        console.log(err);
      }
    );
  }

  onSubmitAnswer(formAnswer: NgForm) {
    console.log(this.answer);
    if (formAnswer.valid) {
      this.loadedResult = false;
      this.formatPolytechText();
      this.http.post<Mail>(`${environment.baseAPI}emails/`, this.answer).subscribe(
        (result) => {
          this.mail = result;
          this.loadedResult = true;
          console.log(this.mail);
        }, (err) => {
          this.loadedResult = null;
          console.log(err);
        }
      );
    }
  }

  onSelectedParticipant(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    const currentParticipant: Participant = event.option.value;
    if (this.answer.participants
        .filter(participantId => participantId === currentParticipant.id)
          .length === 0) {
            this.answer.participants.push(currentParticipant.id);
            this.mail.participants.push(currentParticipant);
      }
    document.getElementById('myinvisiblefield').focus();
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
    this.answer.bodySchema = this.selectedOption;
  }

  openModalNote() {
    console.log('enter');
    const dialogRef = this.dialog.open(NoteModalComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('after close', result);
      this.answer.body += result.html;
      this.listXMLToParse.push(result.xml);
    });
  }
  formatPolytechText() {
    if (this.listXMLToParse.length === 1) {
      const regex = /\[.+\]/;
      this.answer.body = this.answer.body.replace(regex, this.listXMLToParse[0]);
    }
  }

  decodeScore(codedText: string) {
    console.log(codedText);
    const regex = /(&lt|<);score.*score(&gt;|>)/;
    const regex2 = /(&lt|<);group_scores.*group_scores(&gt;|>)/;
    codedText = codedText.replace(regex, 'balise score not encoded for human yet');
    // codedText = codedText.replace(regex2, 'balise group_scores not encoded yet');
    return codedText;
  }
}
