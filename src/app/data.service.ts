// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private registerURL = "http://localhost:3000/register";
  private loginURL = "http://localhost:3000/login";
  private deleteAccountURL = "http://localhost:3000/delete-account";
  private userDetailsURL = "http://localhost:3000/user-details";
  private updateUserURL = "http://localhost:3000/update-user";
  private logoutURL = "http://localhost:3000/logout";
  private reservationURL = "http://localhost:3000/reservations"; // Endpoint para reservas

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(this.registerURL, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(this.loginURL, data);
  }

  deleteAccount(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.delete(this.deleteAccountURL, { params });
  }

  getUserDetails(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.get(this.userDetailsURL, { params });
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(this.updateUserURL, data);
  }

  logout(): Observable<any> {
    return this.http.post(this.logoutURL, {});
  }

  // Nuevo método para realizar una reserva
  createReservation(reservationData: any): Observable<any> {
    return this.http.post(this.reservationURL, reservationData);
  }
}
