import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Mail } from '../Models/models';
import { UserServiceService } from '../user-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-box-mail',
  templateUrl: './box-mail.component.html',
  styleUrls: ['./box-mail.component.scss']
})
export class BoxMailComponent implements OnInit {
  userId = '';
  userName = '';
  listMail: Mail[];
  loaded = false;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, public userService: UserServiceService) {
    this.route.params.subscribe((params) => {
      if (params.participantId) {
        this.userName = this.userService.currentUserName;
        this.userId = params.participantId;
        this.loadMails();
      }
    });
  }

  ngOnInit() {
  }

  loadMails() {
    this.http.get<Mail[]>(`${environment.baseAPI}emails/byParticipantName/${this.userName}`).subscribe(
      (result) => {
        result.forEach((mail) => {
          mail.historic.messages.forEach(
            (message) => {
              message.body.content = this.decodeScore(message.body.content);
            }
          );
        });
        this.listMail = result;
        console.log(this.listMail);
        this.loaded = true;
      }, (err) => {
        this.loaded = true;
        console.log(err);
      }
    );
  }

  decodeScore(codedText: string) {
    console.log(codedText);
    const regex = /(&lt|<);score.*score(&gt;|>)/;
    const regex2 = /(&lt|\<)group_scores\>(.+)group_scores(&gt;|\>)/;
    codedText = codedText.replace(regex, 'balise score not encoded for human yet');
    // codedText = codedText.replace(regex2, 'balise group_scores not encoded yet');
    return codedText;
  }
}
