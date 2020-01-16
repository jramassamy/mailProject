import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BoxMailComponent } from './box-mail/box-mail.component';
import { MailDetailsComponent } from './mail-details/mail-details.component';
import { NewMailComponent } from './new-mail/new-mail.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'box-mail/:participantId', component: BoxMailComponent },
  { path: 'box-mail/detail/:participantId/:mailUUID', component: MailDetailsComponent },
  { path: 'box-mail/newMail/:participantId', component: NewMailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }