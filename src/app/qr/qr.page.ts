import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  constructor(private navCtrl :NavController, private  authService : AuthenticateService) { }

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
