import { Component } from '@angular/core';
import {
  AlertController,
  MenuController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { ApiService } from '../api.service';
import { AppComponent } from '../app.component';
import { FolderPage } from '../folder/folder.page';
import { HelperService } from '../helper.service';
import { PrecoveryPage } from '../precovery/precovery.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  skillInfo: any;
  skills: any = [];
  mainArray: any = [];
  Username: any;
  Password: any;
  resData: any;
  skill: any = [];
  constructor(
    private serv: ApiService,
    private menuCtrl: MenuController,
    private help: HelperService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController
  ) {}
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.serv.getSkills().then((res) => {
      this.skillInfo = res;
      this.skills = this.skillInfo.skills;
      this.skill = [];
      var i = 0;
      Object.entries(this.skills).forEach(([key, value]: any) => {
        this.skill.push({ Name: key, Value: value / 100 });
        i++;
      });
    });
  }
  Login() {
    if (this.Username && this.Password) {
      this.serv.loginService(this.Username, this.Password).then(
        (res) => {
          this.resData = res;
          this.help.presentToast(this.resData.message);
        },
        (err) => {
          this.help.presentToast(err.error.message);
          if (err.error.message == 'User not Found') {
            this.getAlert();
          }
        }
      );
    } else {
      this.help.presentToast('Required Username & Password');
    }
  }
  getAlert() {
    this.alertCtrl
      .create({
        header: 'Please Confirm?',
        message: 'Would you like to register?',
        buttons: [
          {
            text: 'No',
            role: 'No',
            handler: () => {},
          },
          {
            text: 'Yes',
            handler: () => {
              this.openRegistration();
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }
  SignUp() {
    this.openRegistration();
  }
  openRegistration() {
    this.modalCtrl
      .create({ component: FolderPage, showBackdrop: false })
      .then((res) => {
        res.present();
      });
  }
  passwordRecovery() {
    this.modalCtrl
      .create({
        component: PrecoveryPage,
        componentProps: { Username: this.Username },
      })
      .then((res) => {
        res.present();
      });
  }
}
