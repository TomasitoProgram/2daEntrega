import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/model/post';
import { APIClientService } from 'src/app/services/apiclient.service';
import { showToast } from 'src/app/tools/message-functions';
import { Router } from '@angular/router';
import { DatePickerComponent } from 'src/app/components/date-picker/date-picker.component';
import { NivelEducacional } from 'src/app/model/nivel-educacional';

import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';


@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,IonicModule, DatePickerComponent, FooterComponent, HeaderComponent]
})
export class MisDatosPage {
  usuario: Usuario = new Usuario();
  usuarios: Usuario[] = [];
  publicaciones: Post[] = [];
  listaNivelesEducacionales: NivelEducacional[] = NivelEducacional.getNivelesEducacionales();

  constructor(
    private bd: DataBaseService,
    private auth: AuthService,
    private api: APIClientService,
    private router: Router
  ) {
    this.bd.listaUsuarios.subscribe((usuarios) => {
      if (usuarios) {
        this.usuarios = usuarios;
      }
    });
    this.auth.leerUsuarioAutenticado().then((usuario) => {
      if (usuario) {
        this.usuario = usuario;
        console.log(this.usuario);
      }
    });
  }

  guardarUsuario() {
    if (this.usuario.nombre.trim() === '') {
      showToast('El usuario debe tener un nombre');
    } else {
      console.log(this.usuario);
      this.bd.guardarUsuario(this.usuario);
      this.auth.guardarUsuarioAutenticado(this.usuario);
      showToast('El usuario fue guardado correctamente');
    }
  }

  public actualizarNivelEducacional(event: any) {
    this.usuario.nivelEducacional = NivelEducacional.buscarNivelEducacional(event.detail.value)!;
  }

  onFechaNacimientoChange(event: any) {
    const fecha = new Date(event.detail.value);
    this.usuario.fechaNacimiento = fecha;
  }

  goBack() {
    this.router.navigate(['/inicio']);
  }

  Yendo(){
    this.router.navigate(['/home'])
  }
}
