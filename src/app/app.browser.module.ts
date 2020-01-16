import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoteModalComponent } from './Modals/note-modal/modal-note.component';
import { MatDialogModule, MatNativeDateModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DemoMaterialModule } from './material-module';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HomePageComponent } from './home-page/home-page.component';
import { BoxMailComponent } from './box-mail/box-mail.component';
import { NewMailComponent } from './new-mail/new-mail.component';
import { MailDetailsComponent } from './mail-details/mail-details.component';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from './app.module';
registerLocaleData(localeFr);

@NgModule({
  imports: [
    
    EditorModule,
    FormsModule, 
    ReactiveFormsModule, BrowserAnimationsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DemoMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    AppModule,
    BrowserTransferStateModule
  ],
  providers: [DatePipe,
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  entryComponents: [
    NoteModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }