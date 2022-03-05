import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tache } from '../_models/tache.model';
import { environment } from 'src/environments/environment';



const base_url= environment.BASE_URL;
const base_api=environment.BASE_API; 
const base_crud=environment.BASE_CRUD_TODO;

const API_URL= base_url+base_api+base_crud;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private http: HttpClient) { }

  getTaches(): Observable<any> {
    return this.http.get(API_URL +'/list', httpOptions);
  }

  getTacheById(tacheId: string): Observable<Tache> {
    return this.http.get<Tache>(API_URL + '/' + tacheId);
  }

  createTache(tache: Tache): Observable<Tache> {
    return this.http.post<Tache>(API_URL, tache, httpOptions);
  }
  updateTache(tache: Tache): Observable<Tache> { 
    return this.http.post<Tache>(API_URL, tache, httpOptions);
  }
  

  deleteTacheById(tacheid: string): Observable<any> {
    return this.http.delete<any>(API_URL + '/' + tacheid, httpOptions);
  }
  
  
}
