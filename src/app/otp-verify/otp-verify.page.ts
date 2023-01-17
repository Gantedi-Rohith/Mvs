import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.page.html',
  styleUrls: ['./otp-verify.page.scss'],
})
export class OtpVerifyPage implements OnInit {
  Username: string | undefined;
  otp: number | undefined;
  resData: any;
  verifyOtp: any;
  constructor(
    private serv: ApiService,
    private popOver: PopoverController,
    private help: HelperService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.serv.sendOTP(this.Username).then(
      (res) => {
        this.resData = res;
        this.verifyOtp = this.resData.otp;
        this.help.presentToast('OTP sent to your Email');
      },
      (err) => {
        this.help.presentToast(err.error.message);
      }
    );
  }
  changePassword() {
    if (this.otp == this.verifyOtp) {
      this.popOver.dismiss(this.Username);
    } else {
      this.help.presentToast('Please enter Valid OTP');
    }
  }
  closeModal() {
    this.popOver.dismiss();
  }
}
