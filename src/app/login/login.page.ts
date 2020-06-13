// login.page.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuarios: any;
  validations_form: FormGroup;
  errorMessage: string = '';
  correop:string;
  rol1:string;
  mostrar1:boolean=true;
  mostrar2:boolean=false;


  
  constructor(

    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private firebase : FirebaseService

  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }


  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };


  loginUser(value) {
    this.authService.loginUser(value)
      .then(res => {
        console.log(res);
        this.correop=value.email
   
        this.firebase.read_Students1(this.correop).subscribe(data => {

 
          this.usuarios = data.map(e => {
            return {
              nombre: e.payload.doc.data()['Nombre'],
      
              rol: e.payload.doc.data()['Rol']

              
            };
          })
          
   

      
          this.mostrar1=false;
          this.mostrar2=true;

     
    
        });
    
   
      
      }, err => {
        this.errorMessage = err.message;
      })
  }


 

bienvenido(item){
  console.log(item.rol)
  console.log(item.rol)

if(item.rol=='Docente'||item.rol=='Estudiante'){
  this.navCtrl.navigateBack('/homeusuario');
  

}else  this.navCtrl.navigateBack('/home');


}


  

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

}
