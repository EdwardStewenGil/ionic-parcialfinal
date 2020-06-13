import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { MenuController } from '@ionic/angular';


import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';



@Component({
  selector: 'app-homeusuario',
  templateUrl: './homeusuario.page.html',
  styleUrls: ['./homeusuario.page.scss'],
})
export class HomeusuarioPage implements OnInit {

Usuario : any;
  Combo: any;
  Cafeteria: any;
  nombre: string;
  descripcion: string;
  precio: Number;
  imagen: string;
  cafeteria: string;
  promocion: Number;
  email:string;

  mostrar1:boolean=false;
  mostrar2:boolean=true;
  mostrar3:boolean=true;


 

  constructor(private firebaseService: FirebaseService,private auth:AuthenticateService,private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticateService,
    private navCtrl: NavController,) { }

  ngOnInit() {
    this.firebaseService.read_Combo().subscribe(data => {

 
      this.Combo = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          nombre: e.payload.doc.data()['Nombre'],
          descripcion: e.payload.doc.data()['Descripcion'],
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


    this.auth.userDetails().subscribe(data => {
      this.email = data.email
      console.log(this.email)
      console.log(this.email)
      console.log(this.email)
      console.log(this.email)

 

    });

  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }


  real1(){
    this.navCtrl.navigateBack('/homeusuario');
  }
  real2(){
    this.navCtrl.navigateBack('/qr');
  }
  real3(){
    this.navCtrl.navigateBack('/mapa');
  }
  mandarEvento(item) {
    let record = {};
    record['Nombre'] = item.nombre;
    record['Descripcion'] = item.descripcion;
    record['Precio'] = item.precio;
    record['Cafeteria'] = item.cafeteria;
    record['Email'] = this.email;
    
    this.firebaseService.create_Compra(record).then(resp => {
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
  
  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }


 
 

}




