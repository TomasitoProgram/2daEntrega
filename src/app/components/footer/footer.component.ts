import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, pawOutline, pencilOutline, qrCodeOutline, schoolOutline, personOutline, personCircleOutline, personCircle, extensionPuzzleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
      CommonModule    // CGV-Permite usar directivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , TranslateModule // CGV-Permite usar pipe 'translate'
    , IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon
  ]
})
export class FooterComponent {
  isAtorres: boolean = false;
  selectedButton = 'welcome';
  @Output() footerClick = new EventEmitter<string>();

  constructor(private router:Router, private auth: AuthService, ) { 
    addIcons({ homeOutline, qrCodeOutline, pawOutline, pencilOutline, schoolOutline, personOutline, personCircleOutline, personCircle,extensionPuzzleOutline });
  }

  async ngOnInit() {
    // Verifica si el usuario es "atorres"
    this.isAtorres = await this.auth.isUserAtorres();
  }

  sendClickEvent($event: any) {
    this.footerClick.emit(this.selectedButton);
  }

  gotomisdatos(){
    this.router.navigate(['misdatos']);
  }
}