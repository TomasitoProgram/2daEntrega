import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.page.html',
  styleUrls: ['./mis-datos.page.scss'],
  standalone: true,
  imports: [IonicModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MisDatosPage implements OnInit {
  public nombre: string = '';

  constructor(private auth: AuthService, private bd: DataBaseService) {  }

  ngOnInit() {
  }

  actualizarUsuario(){
    this.auth.leerUsuarioAutenticado().then( usuario => {
      if(usuario){
        usuario.nombre=this.nombre;
        this.auth.guardarUsuarioAutenticado(usuario);
        this.bd.guardarUsuario(usuario);
      }
    });
  }

}
