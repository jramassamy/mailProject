import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  currentUserName: string = null;
  constructor() { }
  retrieveUser() {
    if (!this.currentUserName) {
      if (localStorage.getItem('currentUserName')) {
        const value = JSON.parse(localStorage.getItem('currentUserName')).toString();
        if (value) {
          this.currentUserName = value;
        }
      }

    }
  }
}