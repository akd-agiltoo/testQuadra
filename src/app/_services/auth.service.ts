import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

const base_url= environment.BASE_URL;
const base_api=environment.BASE_API; 
const base_auth=environment.BASE_AUTH;
const AUTH_API = base_url+base_api+base_auth;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  login(login: string, password: string): Observable<any> {
    return this.http.post(AUTH_API+ '/login', {
      login,
      password
    }, httpOptions);
  }

  register(login: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      login,
      email,
      password
    }, httpOptions);
  }
}
