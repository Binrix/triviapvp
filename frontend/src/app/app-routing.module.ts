import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuizcreationComponent } from './quizcreation/quizcreation.component';
import { RegistrationComponent } from './registration/registration.component';
import { StartComponent } from './start/start.component';
import { LobbyComponent } from './lobby/lobby.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ImpressumComponent } from './impressum/impressum.component';

const routes: Routes = [
  {path: '', redirectTo: 'start', pathMatch: 'full'},
  {path: 'start', component: StartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'quizcreation', component: QuizcreationComponent},
  {path: 'join/:roomId/:initator', component: LobbyComponent },
  {path: 'rooms', component: RoomsComponent },
  {path: 'impressum', component: ImpressumComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
