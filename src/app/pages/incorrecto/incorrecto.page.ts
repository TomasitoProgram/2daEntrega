import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonButton, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonLabel, IonButton, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class IncorrectoPage {

  imagen: string = 'src/assets/images/incorrecto.jpg'; // Modifica esta ruta cuando agregues la imagen

  constructor(private router: Router) {}


  iniciarSesion() {
    this.router.navigate(['/login']);
  }
}

