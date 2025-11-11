import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { SearchComponent, FooterComponent, ListActorsComponent, CardActorComponent } from '../../shared/components';
import { ApiService, GameService, TmdbService } from '../../core';
import { HttpParams } from '@angular/common/http';
import { Actors } from '../../core/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchComponent,
    FooterComponent,
    ListActorsComponent,
    CardActorComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  private tmdbService = inject( TmdbService );
  private gameService = inject( GameService );
  private router = inject( Router );

  public actor0 = signal<Actors | undefined>(undefined);
  public actorA = signal<Actors | undefined>(undefined);
  public actorB = signal<Actors | undefined>(undefined);
  public turnActor: '0' | 'A' | 'B' = '0';

  private readonly urlImage = "https://image.tmdb.org/t/p/original"
  public actorsSelected = computed(()=> !!this.actorA() && !!this.actorB() && !!this.actor0());

  public listActors = signal<Actors[]>([]);

  constructor(){
    effect(()=> {
      this.gameService.actor0.set(this.actor0());
      this.gameService.actorA.set(this.actorA());
      this.gameService.actorB.set(this.actorB());
    });
  }

  public searchActor( event: any ) {
    const name = event.target.value.trim();
    if( !name ) return this.listActors.set([]);

    this.tmdbService.searchActor(name).subscribe({
      next: data => {
        console.log(data);
        
        const actors = data.map( d => {
          d.profile_path = `${this.urlImage}${d.profile_path}` 
          return d
        });
        this.listActors.set( actors )
      }, error: error => {
        
      }
    })
  }

  selectActor( actor: Actors, aOrB: '0' | 'A' | 'B' ) {
    if (aOrB === '0') {
      this.turnActor = 'A';
      this.actor0.set(actor);
    }else if (aOrB === 'A') {
      this.turnActor = 'B';
      this.actorA.set(actor);
    }else if (aOrB === 'B') {
      this.turnActor = 'A';
      this.actorB.set(actor);
    }

    this.listActors.set([]);
  }

  public changeActors() {
    this.actorA.set(undefined);
    this.actorB.set(undefined);
  }

  public gameStart() {
    this.router.navigateByUrl('/game');
  }

}