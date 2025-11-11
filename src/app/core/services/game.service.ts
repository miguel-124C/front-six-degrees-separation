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

  actor0 = signal<Actors | undefined>(undefined);
  actorA = signal<Actors | undefined>(undefined);
  actorB = signal<Actors | undefined>(undefined);

  public verifyConexionAB( id0: number, idA: number, idB: number ) {
    return this.apiService.get<{connection: boolean, ruta: any, ruta2: any}>(`${this.baseUrl}/verify/conection`, new HttpParams({
      fromString: `idActor0=${id0}&idActorA=${idA}&idActorB=${idB}`
    }));
  }

  public isConnection( idA: number, idB: number ) {
    return this.apiService.get<{is_shared : boolean, film: any}>(`${this.baseUrl}/verify/connection_with_two_actor`, new HttpParams({
      fromString: `idActorA=${idA}&idActorB=${idB}`
    }));
  }

}