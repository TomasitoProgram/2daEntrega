import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonLabel, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonContent,IonButton, IonHeader,IonLabel, IonTitle, IonToolbar,
     CommonModule, FormsModule]
})
export class CorrectoPage {

  imagen: string = 'src/assets/images/correcto.jpg';
  usuario: Usuario= new Usuario();
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(() => {
      
      const nav = router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
        }
      }
    });
  }


  iniciarSesion() {
    this.router.navigate(['/login']);
  }
}
