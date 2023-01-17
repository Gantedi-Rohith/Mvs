import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  getSkills() {
    return new Promise((resolve, reject) => {
      this.http.get('https://grohith.in/skills.php').subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  loginService(User: any, Pass: any) {
    return new Promise((resolve, reject) => {
      let reqParams = JSON.stringify({
        Username: User,
        Password: Pass,
      });
      this.http
        .post('https://grohith.in/loginservice.php', reqParams)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  newRegister(User: any, Pass: any, Mob: number, mail: any) {
    return new Promise((resolve, reject) => {
      let reqParams = JSON.stringify({
        Username: User,
        Password: Pass,
        MobileNo: Mob,
        Email: mail,
      });
      this.http.post('https://grohith.in/register.php', reqParams).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  sendOTP(User: any) {
    return new Promise((resolve, reject) => {
      let reqParams = JSON.stringify({
        Username: User,
      });
      this.http.post('https://grohith.in/otpService.php', reqParams).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  passwordRecovery(User: any, Pass: any, Status: number) {
    return new Promise((resolve, reject) => {
      let reqParams = JSON.stringify({
        Username: User,
        Password: Pass,
        verifyStatus: Status,
      });
      this.http
        .post('https://grohith.in/passwordRecovery.php', reqParams)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
}
