import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { APIClientService } from 'src/app/services/apiclient.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Usuario } from 'src/app/model/usuario';
import { showToast } from 'src/app/tools/message-routines';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports:[CommonModule, FormsModule, IonicModule, DatePickerComponent, HeaderComponent]
})
export class UsuariosComponent  implements OnInit {
  isAtorres: boolean = false;
  usuarios: Usuario[] = [];
  usuario: Usuario = new Usuario();

  constructor(
    private bd: DataBaseService,
    private auth: AuthService,
    private api: APIClientService,
    private router: Router,

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

  async ngOnInit() {
    // Verifica si el usuario es "atorres"
    this.isAtorres = await this.auth.isUserAtorres();
  }

  EliminarUsuario(usuario: Usuario) {
    this.bd.eliminarUsuarioUsandoCuenta(usuario.cuenta).subscribe(() => {
      console.log('Usuario eliminado:', usuario.nombre);
      // Actualizar la lista localmente después de la eliminación
      this.usuarios = this.usuarios.filter(u => u.cuenta !== usuario.cuenta)
      showToast("El usuario se ha eliminado correctamente");
    });
  }
}
