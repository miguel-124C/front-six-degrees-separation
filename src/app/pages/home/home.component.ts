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

  public actorA = signal<Actors | undefined>(undefined);
  public actorB = signal<Actors | undefined>(undefined);
  public turnActor: 'A' | 'B' = 'A';

  private readonly urlImage = "https://image.tmdb.org/t/p/original"
  public actorsSelected = computed(()=> !!this.actorA() && !!this.actorB());

  public listActors = signal<Actors[]>([]);

  constructor(){
    effect(()=> {
      this.gameService.actorA.set(this.actorA());
      this.gameService.actorB.set(this.actorB());
    });
  }

  public searchActor( event: any ) {
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

  selectActor( actor: Actors, aOrB: 'A' | 'B' ) {
    if (aOrB === 'A') {
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