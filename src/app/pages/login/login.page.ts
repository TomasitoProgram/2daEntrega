import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { ViewWillEnter } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { Router } from '@angular/router';
import { colorWandOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      TranslateModule,
      LanguageComponent
  ]
})
export class LoginPage implements ViewWillEnter {

  @ViewChild('selectLanguage') selectLanguage!: LanguageComponent;

  // en realidad es el usuario
  correo: string;
  password: string;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private authService: AuthService,
    private alertController: AlertController // Inyección de AlertController
  ) {
    this.correo = 'atorres';
    this.password = '1234';
    addIcons({ colorWandOutline });
  }

  async ionViewWillEnter() {
    this.selectLanguage.setCurrentLanguage();
  }

  navigateTheme() {
    this.router.navigate(['/theme']);
  }

  // Función para mostrar alerta
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Función de inicio de sesión con validación de correo y contraseña
  async login() {
    this.authService.login(this.correo, this.password);
  }
  async registrarme() {
    this.router.navigate(['/registrarme'])
  }

  registerNewUser() {
    // nuevo usuario
  }

  passwordRecovery() {
    this.router.navigate(['/correo']);
  }

  navigateToMap() {
    this.router.navigate(['/map']);
  }
}

