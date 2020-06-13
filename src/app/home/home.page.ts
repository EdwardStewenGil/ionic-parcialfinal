import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  cafeteria: any;
  nombre: string;
  direccion: string;
  telefono: Number;
  combo: string;
  valor: Number;
  cantidad: Number;
 

  constructor(
    private firebaseService: FirebaseService) {
   
   }

  ngOnInit() {
    this.firebaseService.read_Cafeteria().subscribe(data => {

 
      this.cafeteria = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          nombre: e.payload.doc.data()['Nombre'],
          direccion: e.payload.doc.data()['Direccion'],
          telefono: e.payload.doc.data()['Telefono'],
          combo: e.payload.doc.data()['Combo'],
          valor: e.payload.doc.data()['Valor'],
          cantidad: e.payload.doc.data()['Cantidad'],
          
        };
      })
      console.log(this.cafeteria);
 

    });


  }

  mandarEvento(event){
    console.log(event);
  }


}
