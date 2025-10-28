import { inject, Injectable, signal } from '@angular/core';
import { Actors } from '../interfaces';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly baseUrl = 'game'
  private apiService = inject( ApiService );

  actorA = signal<Actors | undefined>(undefined);
  actorB = signal<Actors | undefined>(undefined);

  public verifyConexionAB( idA: number, idB: number ) {
    return this.apiService.get<{connection: boolean, ruta: any}>(`${this.baseUrl}/verify/conection`, new HttpParams({
      fromString: `idActorA=${idA}&idActorB=${idB}`
    }));
  }

  public isConnection( idA: number, idB: number ) {
    return this.apiService.get<{is_shared : boolean, film: any}>(`${this.baseUrl}/verify/connection_with_two_actor`, new HttpParams({
      fromString: `idActorA=${idA}&idActorB=${idB}`
    }));
  }

}