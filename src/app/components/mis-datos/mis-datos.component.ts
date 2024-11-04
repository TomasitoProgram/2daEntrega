import { DatePickerComponent } from './../date-picker/date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonTitle, IonToolbar, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonGrid } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
  imports: [IonicModule, IonHeader, IonToolbar, IonTitle, 
            IonContent, IonItem, IonLabel, IonInput, 
            IonSelect, IonSelectOption, MatDatepickerModule, 
            IonGrid, CommonModule
          ],
  standalone: true,
})
export class MisDatosComponent  implements OnInit {

  usuario= new Usuario();
  repeticionPassword = '';
  constructor() { }

  ngOnInit() {}

}
