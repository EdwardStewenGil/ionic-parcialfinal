import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {
  cafeteria: any;
  nombre: string;
  ubicacion: string;
  telefono: Number;
  estado: number;
  sede: string;

  mostrar1:boolean=false;
  mostrar2:boolean=true;
  mostrar3:boolean=true;


 

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.read_Cafeteria().subscribe(data => {

 
      this.cafeteria = data.map(e => {
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
      console.log(this.cafeteria);
 

    });

  }

  CreateRecord() {
    let record = {};
    record['Nombre'] = this.nombre;
    record['Ubicacion'] = this.ubicacion;
    record['Telefono'] = this.telefono;
    record['Estado'] = this.estado;
    record['Sede'] = this.sede;
    
    this.firebaseService.create_Cafeteria(record).then(resp => {
      this.nombre = "";
      this.ubicacion = "";
      this.telefono = undefined;
      this.estado = undefined;
      this.sede = "";
     
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_Cafeteria(rowID);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditNombre = record.nombre;
    record.EditUbicacion = record.ubicacion;
    record.EditTelefono = record.telefono;
    record.EditEstado = record.estado;
    record.EditSede = record.sede;
   
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['Nombre'] = recordRow.EditNombre;
    record['Ubicacion'] = recordRow.EditUbicacion;
    record['Telefono'] = recordRow.EditTelefono;
    record['Estado'] = recordRow.EditEstado;
    record['Sede'] = recordRow.EditSede;
    
    this.firebaseService.update_Cafeteria(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
