import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteModalComponent } from './Modals/note-modal/modal-note.component';
import { UserServiceService } from './user-service.service';
import { environment } from '../environments/environment';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mailProject';
  tinyMceSettings = {
    base_url: '/tinymce', // Root for resources
    suffix: '.min',       // Suffix to use when loading resources
    language: 'fr_FR',
    plugins: 'lists, advlist, fullscreen, code, link',
    toolbar: 'fullscreen | code | link | forecolor | numlist bullist | formatselect fontsizeselect bold italic | alignleft aligncenter alignright alignjustify | removeformat | undo redo'
  };
  textMail = '';

    public ngOnInit(): void {
    }


  constructor(public dialog: MatDialog, public userService: UserServiceService) {
    this.userService.retrieveUser();
  }

}
