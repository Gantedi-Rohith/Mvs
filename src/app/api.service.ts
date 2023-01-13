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

  newRegister(User: any, Pass: any, Mob: number) {
    return new Promise((resolve, reject) => {
      let reqParams = JSON.stringify({
        Username: User,
        Password: Pass,
        MobileNo: Mob,
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
}
