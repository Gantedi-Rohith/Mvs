import { Component } from '@angular/core';
import {
  AlertController,
  MenuController,
  ModalController,
} from '@ionic/angular';
import { ApiService } from '../api.service';
import { AppComponent } from '../app.component';
import { FolderPage } from '../folder/folder.page';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  skillInfo: any;
  skills: any = [];
  skillExpertise: any = [];
  mainArray: any = [];
  Username: any;
  Password: any;
  resData: any;
  constructor(
    private serv: ApiService,
    private menuCtrl: MenuController,
    private help: HelperService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.serv.getSkills().then((res) => {
      this.skillInfo = res;
      this.skills = this.skillInfo.skillName;
      this.skillExpertise = this.skillInfo.skillLevel;
      var i = 0;
      this.skills.forEach((ele: any) => {
        this.mainArray.push({ Name: ele, Value: this.skillExpertise[i] / 100 });
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
          console.log(err);

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
            handler: () => {
              console.log('No clicked');
            },
          },
          {
            text: 'Yes',
            handler: () => {
              console.log('Buy clicked');
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
}
