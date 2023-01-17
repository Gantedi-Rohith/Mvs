import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  newUser: any;
  newPass: any;
  newMob: any;
  confirmPass: any;
  changeIcon = 'eye';
  showPass = 'password';
  resData: any;
  email: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private menuCtrl: MenuController,
    private serv: ApiService,
    private help: HelperService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
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
  register() {
    if (
      this.newUser &&
      this.newPass &&
      this.newMob &&
      this.confirmPass &&
      this.email
    ) {
      if (this.newPass == this.confirmPass) {
        this.serv
          .newRegister(this.newUser, this.confirmPass, this.newMob, this.email)
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
        this.help.presentToast('Passwords Dosent Match');
      }
    } else {
      this.help.presentToast('Please fill all Details');
    }
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
