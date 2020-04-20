import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { StoragePostService } from './storage-post.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = this.storageService.URL;

  constructor(private http: HttpClient, private storageService: StoragePostService) { }

  login(email: string, password: string) {
    return this.http.post<any>(this.url + "/user/login", { email: email, password: password }, httpOptions).pipe(
    );
  }

  authenticateUser(email: string, password: string) {
    return this.http.post<Number>(this.url + "/user/authenticateUser", { email: email, password: password }, httpOptions).pipe();
  }

  register(firstName: string, lastName: string, email: string, password: string, type: string) {
    return this.http.post<boolean>(this.url + "/user/register", { firstName: firstName, lastName: lastName, email: email, password: password, type: type }, httpOptions).pipe(
    );
  }

  sendOTP(email: string) {
    return this.http.post<boolean>(this.url + "/user/sendOTP", { email: email }, httpOptions).pipe();
  }

  updatePassword(email: string, password: string, otp: number) {
    let user = {
      email: email,
      password: password,
      otp: otp
    }
    return this.http.post<boolean>(this.url + "/user/updatePassword", user, httpOptions).pipe();
  }

}
