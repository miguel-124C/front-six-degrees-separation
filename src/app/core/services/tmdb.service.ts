import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Actors } from '../interfaces';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private readonly baseUrl = 'tmdb';
  private apiService = inject( ApiService );

  public searchActor( termBusq: string ) {
    return this.apiService.get<Actors[]>(`${this.baseUrl}/search/actors`, new HttpParams({
      fromString: `q=${termBusq}`
    }));
  }

}