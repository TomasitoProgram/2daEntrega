import { Component, ViewChild } from '@angular/core';
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
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
// import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, DatePickerComponent, HeaderComponent, FooterComponent]
})
export class MisDatosComponent {
  usuario: Usuario = new Usuario();
  usuarios: Usuario[] = [];
  publicaciones: Post[] = [];
  listaNivelesEducacionales: NivelEducacional[] = NivelEducacional.getNivelesEducacionales();

  @ViewChild(FooterComponent) footer!: FooterComponent;
  // selectedComponent: 'misdatos';

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

  // ionViewWillEnter() {
  //   this.changeComponent('welcome');
  // }
  // changeComponent(name: string) {
  //   this.selectedComponent = name;
  //   this.footer.selectedButton = name;
  //   console.log("Cambiando componente a:", name); // Para depuración
  // }

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
    this.bd.guardarUsuario(this.usuario);
    this.auth.guardarUsuarioAutenticado(this.usuario);
  }

  onFechaNacimientoChange(event: any) {
    const fecha = new Date(event.detail.value);
    this.usuario.fechaNacimiento = fecha;
    this.bd.guardarUsuario(this.usuario);
    this.auth.guardarUsuarioAutenticado(this.usuario);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
