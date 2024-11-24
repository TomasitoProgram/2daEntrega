
import { Component, OnInit } from '@angular/core';
import { showToast } from 'src/app/tools/message-functions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonLabel, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Usuario } from 'src/app/model/usuario';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/model/post';
import { APIClientService } from 'src/app/services/apiclient.service';
import { Router } from '@angular/router';
import { DatePickerComponent } from 'src/app/components/date-picker/date-picker.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';


@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonSelect, IonSelectOption,DatePickerComponent]
    
})
export class RegistrarmePage implements OnInit {
  usuario: Usuario = new Usuario();
  listaNivelesEducacionales: NivelEducacional[] = NivelEducacional.getNivelesEducacionales();

  constructor(
    private bd: DataBaseService,
    private auth: AuthService,
    private api: APIClientService,
    private router: Router,
   
  ) {
  }

  ngOnInit() {
  }



  public actualizarNivelEducacional(event: any) {
    this.usuario.nivelEducacional = NivelEducacional.buscarNivelEducacional(event.detail.value)!;
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
  volverInicio() {
    this.router.navigate(['/login'])
  }

  onFechaNacimientoChange(event: any) {
    const fecha = new Date(event.detail.value);
    this.usuario.fechaNacimiento = fecha;
  }
}
// function showToast(arg0: string) {
//   throw new Error('Function not implemented.');
// }
