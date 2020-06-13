import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authentication.service';

import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  constructor(private navCtrl :NavController, private authService: AuthenticateService) { }

  ngOnInit() {
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
