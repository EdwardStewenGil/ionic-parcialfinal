// register.page.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  Usuarios: any;
  Cafeteria: any;
  nombre: string;
  apellido: string;
  correo: string;
  facultad: string;
  sede: string;
  rol: string;
  estado:number ;
  password:string ;



  mostrar1:boolean=false;
  mostrar2:boolean=true;
  mostrar3:boolean=true;

  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };


 

  constructor(private firebaseService: FirebaseService  ,
    private authService: AuthenticateService,
    private navCtrl:NavController
   ) { }

  ngOnInit() {
    this.firebaseService.read_Students().subscribe(data => {

 
      this.Usuarios = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          nombre: e.payload.doc.data()['Nombre'],
          apellido: e.payload.doc.data()['Apellido'],
          facultad: e.payload.doc.data()['Facultad'],
          correo: e.payload.doc.data()['Correo'],
          sede: e.payload.doc.data()['Sede'],
          rol: e.payload.doc.data()['Rol'],
          estado: e.payload.doc.data()['Estado'],

          
        };
      })
      console.log(this.Usuarios);
 

    });



    

  }


  CreateRecord() {
    let record = {};
    let record1 = {};

    record['Nombre'] = this.nombre;
    record['Apellido'] = this.apellido;
    record['Facultad'] = this.facultad;
    record['Correo'] = this.correo;
    record['Sede'] = this.sede;
    record['Rol'] = this.rol;
    record['Estado'] = this.estado;
    record1['email'] = this.correo;
    record1['password'] = this.password;
    console.log(record1);
    console.log(record1);
    console.log(record1);
    console.log(record1);


    this.authService.registerUser(record1)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created. Please log in.";
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })


    this.firebaseService.create_NewStudent(record).then(resp => {
      this.nombre = "";
      this.apellido = "";
      this.correo = "";

      this.facultad = "";
      this.sede = "";
      this.rol = "";
      this.estado = undefined;
     
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });

      this.navCtrl.navigateBack('');
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_Student(rowID);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditNombre = record.nombre;
    record.EditApellido = record.apellido;
    record.EditFacultad = record.facultad;
    record.EditCorreo = record.correo;
    record.EditSede = record.sede;
    record.EditRol = record.rol;
    record.EditEstado = record.estado;

   
  }
 
  UpdateRecord(recordRow) { 
    let record = {};
    record['Nombre'] = recordRow.EditNombre;
    record['Apellido'] = recordRow.EditApellido;
    record['Facultad'] = recordRow.EditFacultad;
    record['Correo'] = recordRow.EditCorreo;
    record['Sede'] = recordRow.EditSede;
    record['Rol'] = recordRow.EditRol;
    record['Estado'] = recordRow.EditEstado;

    
    this.firebaseService.update_Student(recordRow.id, record);
    recordRow.isEdit = false;
  }





  goLoginPage() {
    this.navCtrl.navigateBack('');
  }


}
