import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Participant } from '../Models/models';
import { UserServiceService } from '../user-service.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  loaded = false;
  participants: Participant[] = [];
  constructor(private http: HttpClient, private router: Router, public userService: UserServiceService) {
    this.loadAllParticipants();
   }

  ngOnInit() {
  }

  loadAllParticipants() {
    this.http.get<Participant[]>('https://mail-server-polytech.herokuapp.com/participants/all').subscribe(
      (result) => {
        this.participants = result;
        console.log(this.participants);
        this.loaded = true;
      }, (err) => {
        this.loaded = true;
        console.log(err);
      }
    );
  }
  updateUserService(name: string) {
    this.userService.currentUserName = name;
    localStorage.setItem('currentUserName', JSON.stringify(name));
  }
}

