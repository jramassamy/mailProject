import { BrowserModule } from '@angular/platform-browser';
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
import { DatePipe, registerLocaleData, CommonModule } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HomePageComponent } from './home-page/home-page.component';
import { BoxMailComponent } from './box-mail/box-mail.component';
import { NewMailComponent } from './new-mail/new-mail.component';
import { MailDetailsComponent } from './mail-details/mail-details.component';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgtUniversalModule } from '@ng-toolkit/universal';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    NoteModalComponent,
    HomePageComponent,
    BoxMailComponent,
    NewMailComponent,
    MailDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    EditorModule,
    FormsModule, 
    ReactiveFormsModule, BrowserAnimationsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DemoMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    TransferHttpCacheModule,
    NgtUniversalModule
  ],
  providers: [DatePipe,
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  entryComponents: [
    NoteModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }