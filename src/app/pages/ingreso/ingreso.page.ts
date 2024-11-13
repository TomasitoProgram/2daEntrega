import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule, FormsModule]
})
export class IngresoPage implements OnInit {

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit() {
  }

  ingreso(){
    this.authservice.login("atorres", "1234")
  }

  correo(){
    this.router.navigate(['/correo']);
  }

  duoc(){
    this.router.navigate(['/home']);
  }

  temas(){
    this.router.navigate(['/theme'])

  }

}
