import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authentication.service';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";



@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  constructor(private navCtrl :NavController, private  authService : AuthenticateService,private barcodeScanner: BarcodeScanner) { this.encodeData = "https://www.FreakyJolly.com";
  //Options
  this.barcodeScannerOptions = {
    showTorchButton: true,
    showFlipCameraButton: true
  }; }

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


  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;



  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  encodedText() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData)
      .then(
        encodedData => {
          console.log(encodedData);
          this.encodeData = encodedData;
        },
        err => {
          console.log("Error occured : " + err);
        }
      );
  }
}
