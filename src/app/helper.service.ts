import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private toastCtrl: ToastController) {}
  presentToast(Msge: any) {
    this.toastCtrl
      .create({
        message: Msge,
        duration: 1600,
        position: 'top',
        cssClass: 'mainToast',
      })
      .then((toast) => {
        toast.present();
      });
  }
}
