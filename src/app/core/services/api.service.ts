import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject( HttpClient );

  private readonly baseUrl = "http://192.168.0.11:8000"

  get<T>( url: string, params?: HttpParams ): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, {
      params: params
    })
  }

}