import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonItem, IonLabel, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { User } from 'src/app/model/user';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonContent,IonInput, IonButton, IonLabel, IonItem, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PreguntaPage {

  public usuario = new User();
  public secretQuestion: string;
  public secretAnswer: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.usuario = new User();
    this.secretQuestion = '';
    this.secretAnswer='';
    this.activatedRoute.queryParams.subscribe(() => {
      const nav = router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
        }
      }
    });
  }

  recuperarContrasena() {
    // Lógica para validar la respuesta y recuperar la contraseña

    if (this.secretAnswer === this.usuario.secretAnswer) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario,
        }
      }
      this.router.navigate(['/correcto'], navigationExtras);
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }

  iniciarSesion() {
    this.router.navigate(['/login']);
  }


}
