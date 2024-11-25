import { CommonModule} from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { GeolocationService } from 'src/app/services/geolocation-service.service';
import * as L from 'leaflet'; // Importamos Leaflet
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { arrowBackCircleOutline } from 'ionicons/icons';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { Capacitor } from '@capacitor/core';
import { MisDatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { QrWebScannerComponent } from 'src/app/components/qr-web-scanner/qr-web-scanner.component';
import { ScannerService } from 'src/app/services/scanner.service';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { Asistencia } from 'src/app/model/asistencia';
import { AsistenciaComponent } from 'src/app/components/asistencia/asistencia.component';
import { AuthService } from 'src/app/services/auth.service';
import { ForumComponent } from 'src/app/components/forum/forum.component';
import { UsuariosComponent } from 'src/app/components/usuarios/usuarios.component';
@Component({
  
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
      CommonModule    // CGV-Permite usar directivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , IonicModule     // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    , TranslateModule // CGV-Permite usar pipe 'translate'
    , HeaderComponent // CGV-Permite usar el componente Header
    , FooterComponent // CGV-Permite usar el componente Footer
    , WelcomeComponent
    , QrWebScannerComponent
    , MisDatosComponent
    , MiclaseComponent
    , AsistenciaComponent
    , ForumComponent
    , UsuariosComponent
  ]
})
export class HomePage implements OnInit {
  selectedComponent = 'welcome';
  map: L.Map | null = null;
  addressName: string = '';
  distance: string = '';

  @ViewChild(FooterComponent) footer!: FooterComponent;
  asistencia: Asistencia | null = null;

  constructor(private geo: GeolocationService,
              private http: HttpClient, 
              private router: Router,
              private scanner: ScannerService,
              private auth: AuthService
  ) { 
    addicons: ({arrowBackCircleOutline});

  }

  ionViewWillEnter() {
    this.changeComponent('welcome');
  }

  changeComponent(name: string) {
    this.selectedComponent = name;
    this.footer.selectedButton = name;
    console.log("Cambiando componente a:", name); // Para depuración
  }

  async headerClick(button: string) {

    if (button === 'testqr')
      this.showAsistenciaComponent(Asistencia.jsonAsistenciaExample);

    if (button === 'scan' && Capacitor.getPlatform() === 'web')
      this.selectedComponent = 'qrwebscanner';

    if (button === 'scan' && Capacitor.getPlatform() !== 'web')
        this.showAsistenciaComponent(await this.scanner.scan());
  }

  ngOnInit() {
    //this.loadMap();
    this.fixLeafletIconPath();
  }

  webQrScanned(qr: string) {
    this.showAsistenciaComponent(qr);
  }

  webQrStopped() {
    this.changeComponent('welcome');
  }

  showAsistenciaComponent(qr: string) {
    console.log("Código QR recibido:", qr);
    if (Asistencia.isvalidasistenciaQrCode(qr)) {
      this.auth.qrCodeData.next(qr);
      console.log("Cambiando a componente de asistencia.");
      this.changeComponent('asistencia');
      console.log("Selected component now is:", this.selectedComponent);
      return;
    }
    this.changeComponent('welcome');
  }


  fixLeafletIconPath() {
    // Sobrescribimos las rutas de los iconos de Leaflet
    const iconDefault = L.icon({
      iconUrl: 'assets/leaflet/images/marker-icon.png',
      shadowUrl: 'assets/leaflet/images/marker-shadow.png',
    });
    
    L.Marker.prototype.options.icon = iconDefault;
  }

  retroceder(){
    this.router.navigate(['/login']);
  }
  
  // footerClick(button: string) {
  //   this.selectedComponent = (button === 'mis-datos') ? 'misdatos' : button;
  //   console.log("Botón del footer seleccionado:", button); // Para depuración
  // }

  footerClick(button: string) {
    this.selectedComponent = button;
    console.log("Botón del footer seleccionado:", button); // Para depuración

  }
}
