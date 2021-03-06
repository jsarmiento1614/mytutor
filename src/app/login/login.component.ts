import { Component, OnInit } from '@angular/core';
import { UserApp, TutorApp } from '../shared/model/user';
import { Router } from '@angular/router';
import { NotificationsComponent } from "../notifications/notifications.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NotificationsComponent]
})
export class LoginComponent implements OnInit {
  users:Array<UserApp>;
  tutor:Array<TutorApp>
  constructor(private router: Router, private _notification: NotificationsComponent) {
    
    if (localStorage.getItem('users')) {
      let data: any = (new Function("return [" + localStorage.getItem('users') + "];")());
      this.users = data[0] as Array<UserApp>;
      this.tutor = data[0] as Array<TutorApp>;
    } 
   }

  ngOnInit() {
  }

  onLoginUser(event) : void{
   let email = event.target.elements.email.value;
   let password = event.target.elements.password.value;

   // Buscar por email y Passwprd
   let userEntry = this.users.find(f => f.email === email && f.password === password);
   let tutorEntry = this.tutor.find(t => t.email === email && t.password === password);
   if(userEntry || tutorEntry) {
      // Email y pass correctamente
      this.gotoHome(userEntry)
   } else {
    console.log("Usuario invalido");
    this._notification.notificationOpen('error', 'Error!', 'Usuario invalido');
   }
  }

  gotoHome(user: any) {
    this.router.navigate(['/home', { id: user.userId }]);
  }


}
