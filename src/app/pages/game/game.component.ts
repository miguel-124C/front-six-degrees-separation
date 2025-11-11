import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GameService, TmdbService } from '../../core';
import { Router } from '@angular/router';
import { CardActorComponent, SearchComponent, ListActorsComponent } from "../../shared/components";
import { Actors, BetterRouts } from '../../core/interfaces';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CardActorComponent, SearchComponent, ListActorsComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {

  private gameService = inject( GameService );
  private router = inject( Router );
  private tmdbService = inject( TmdbService );

  public connection = signal(false);

  public actorA = computed(()=> this.gameService.actorA());
  public actorB = computed(()=> this.gameService.actorB());

  public intentos = signal(0);
  public maxIntentos = signal(6);
  public listActors = signal<Actors[]>([]);
  private readonly urlImage = "https://image.tmdb.org/t/p/original";
  public win = signal(false);
  public loose = signal(false);
  public betterRuta = signal<BetterRouts[]>([]);
  public hayMejorRuta = signal(false);

  public arrayActors = signal<Actors[]>([]);
  public arrayMoviesActors = signal<any[]>([]);

  ngOnInit(): void {
    const actor0 = this.gameService.actor0();
    const actorA = this.gameService.actorA();
    const actorB = this.gameService.actorB();
    if (!actorA || !actorB || !actor0) {
      this.router.navigateByUrl('/');
      return;
    }

    this.verifyConexionActors( actor0.id, actorA!.id, actorB!.id );
  }

  public verifyConexionActors(id0: number, idA: number, idB: number) {
    this.gameService.verifyConexionAB( id0, idA, idB ).subscribe({
      next: ({connection, ruta, ruta2}) => {
        this.connection.set(connection);
        if (!connection) {
          alert('No se encontro conexion entre estos 2 actores');
          setTimeout(() => {
            this.router.navigateByUrl('/');
          }, 1000);
        }
        
        console.log(ruta);
        console.log(ruta2);
        
        ruta.push([...ruta2])
        this.betterRuta.set(ruta)
        console.log(this.betterRuta());
        
        this.arrayActors.update((actors)=> {
          return [
            ...actors,
            this.actorA()!
          ]
        });
      }, error: err => {
        // El bloque error solo maneja el 500 (fallo técnico)
        console.error('Error del servidor:', err);
        this.router.navigateByUrl('/'); // Redirección solo por fallo técnico
      }
    });
  }


  searchActor( event: any ) {
    if (this.win() || this.loose()) return;
    const name = event.target.value.trim();
    if( !name ) return this.listActors.set([]);

    this.tmdbService.searchActor(name).subscribe({
      next: data => {
        const actors = data.map( d => {
          d.profile_path = `${this.urlImage}${d.profile_path}` 
          return d
        });
        this.listActors.set( actors )
      }, error: error => {
        
      }
    })
  }

  selectActor( actor: Actors ) {
    if (this.win() || this.loose()) return;
    this.intentos.update(curr => curr + 1);
    if (this.intentos() >= this.maxIntentos()) {
      this.loose.set(true);
      this.hayMejorRuta.set(true)
      this.listActors.set([])
      return;
    }
    
    this.listActors.set([]);

    const ultimo = this.arrayActors().at(-1);
    this.gameService.isConnection(ultimo!.id, actor.id).subscribe({
      next: ({is_shared, film}) => {
        if (!is_shared) {
          alert('No existe conexion');
          return;
        }
        
        this.arrayMoviesActors.update((movies)=> {
          return [
            ...movies,
            {
              actual: ultimo!,
              movie: film,
              destino: actor
            }
          ]
        });
        this.arrayActors.update((actors)=> {
          return [
            ...actors,
            actor
          ]
        });
        console.log(this.arrayActors())
      }, error: error => {
        
      }
    });
  }

  comprobarConexionDirecta() {
    if (this.win() || this.loose()) return;
    this.intentos.update(curr => curr + 1);
    if (this.intentos() >= this.maxIntentos()) {
      this.loose.set(true);
      this.hayMejorRuta.set(true)
      this.listActors.set([])
      return;
    }

    const ultimo = this.arrayActors().at(-1);
    this.gameService.isConnection(ultimo!.id, this.actorB()!.id).subscribe({
      next: ({is_shared, film}) => {
        if (!is_shared) {
          alert('No existe conexion');
          return;
        }

        this.arrayMoviesActors.update((movies)=> {
          return [
            ...movies,
            {
              actual: ultimo!,
              movie: film,
              destino: this.actorB()!
            }
          ]
        });
        alert('Felicidades ganaste!!!')
        this.hayMejorRuta.set(this.betterRuta().length < this.arrayMoviesActors().length)
        this.win.set(true);
      }, error: error => {
        
      }
    });
  }

  public getUrl( path: string ) {
    return `${this.urlImage}${path}`
  }

  public backGame() {
    this.router.navigateByUrl('/')
  }

}