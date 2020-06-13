import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-combos',
  templateUrl: './combos.page.html',
  styleUrls: ['./combos.page.scss'],
})
export class CombosPage implements OnInit {

  Combo: any;
  Cafeteria: any;
  nombre: string;
  descripcion: string;
  precio: Number;
  imagen: string;
  cafeteria: string;
  promocion: Number;

  mostrar1:boolean=false;
  mostrar2:boolean=true;
  mostrar3:boolean=true;


 

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.read_Combo().subscribe(data => {

 
      this.Combo = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          nombre: e.payload.doc.data()['Nombre'],
          Descripcion: e.payload.doc.data()['Descripcion'],
          precio: e.payload.doc.data()['Precio'],
          imagen: e.payload.doc.data()['Imagen'],
          cafeteria: e.payload.doc.data()['Cafeteria'],
          promocion: e.payload.doc.data()['Promocion'],

          
        };
      })
      console.log(this.Combo);
 

    });


    this.firebaseService.read_Cafeteria().subscribe(data => {

 
      this.Cafeteria = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          nombre: e.payload.doc.data()['Nombre'],
          ubicacion: e.payload.doc.data()['Ubicacion'],
          telefono: e.payload.doc.data()['Telefono'],
          estado: e.payload.doc.data()['Estado'],
          sede: e.payload.doc.data()['Sede'],
          
        };
      })
      console.log(this.Cafeteria);
 

    });

  }

  CreateRecord() {
    let record = {};
    record['Nombre'] = this.nombre;
    record['Descripcion'] = this.descripcion;
    record['Precio'] = this.precio;
    record['Imagen'] = this.imagen;
    record['Cafeteria'] = this.cafeteria;
    record['promocion'] = this.promocion;
    
    this.firebaseService.create_Combo(record).then(resp => {
      this.nombre = "";
      this.descripcion = "";
      this.precio = undefined;
      this.cafeteria = "";
      this.promocion = undefined;
     
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_Combo(rowID);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditNombre = record.nombre;
    record.EditDescripcion = record.descripcion;
    record.EditPrecio = record.precio;
    record.EditCafeteria = record.cafeteria;
    record.EditPromocion = record.promocion;
   
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['Nombre'] = recordRow.EditNombre;
    record['Descripcion'] = recordRow.EditDescripcion;
    record['Precio'] = recordRow.EditPrecio;
    record['Cafeteria'] = recordRow.EditCafeteria;
    record['Promocion'] = recordRow.EditPromocion;
    
    this.firebaseService.update_Combo(recordRow.id, record);
    recordRow.isEdit = false;
  }

}

