import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
import { OtpVerifyPage } from '../otp-verify/otp-verify.page';

@Component({
  selector: 'app-precovery',
  templateUrl: './precovery.page.html',
  styleUrls: ['./precovery.page.scss'],
})
export class PrecoveryPage implements OnInit {
  Username: string | undefined;
  recoveryStatus = 0;
  resData: any;
  changeIcon = 'eye';
  showPass: string | undefined;
  newPass: string | undefined;
  confirmPass: string | undefined;
  verifyStatus = 'Locked';
  constructor(
    private popOver: PopoverController,
    private modalCtrl: ModalController,
    private serv: ApiService,
    private help: HelperService
  ) {}

  ngOnInit() {}
  recover() {
    if (this.recoveryStatus == 0) {
      if (this.Username) {
        this.popOver
          .create({
            component: OtpVerifyPage,
            backdropDismiss: false,
            componentProps: { Username: this.Username },
            mode: 'md',
          })
          .then((res) => {
            res.present();
            res.onDidDismiss().then((res) => {
              this.resData = res.data;
              if (this.resData) {
                this.recoveryStatus = 1;
                this.Username = this.resData;
              }
            });
          });
      } else {
        this.help.presentToast('Username is Required');
      }
    } else if (this.recoveryStatus == 1) {
      if (
        this.newPass &&
        this.confirmPass &&
        this.newPass == this.confirmPass
      ) {
        this.verifyStatus = 'Unlocked';
        this.serv
          .passwordRecovery(this.Username, this.newPass, this.verifyStatus)
          .then(
            (res) => {
              this.resData = res;
              this.help.presentToast(this.resData.message);
              this.modalCtrl.dismiss();
            },
            (err) => {
              this.help.presentToast(err.error.message);
            }
          );
      } else {
        this.help.presentToast('Password dosent match');
      }
    }
  }
  showhidePass() {
    if (this.changeIcon == 'eye') {
      this.changeIcon = 'eye-off';
      this.showPass = 'text';
    } else {
      this.changeIcon = 'eye';
      this.showPass = 'password';
    }
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
