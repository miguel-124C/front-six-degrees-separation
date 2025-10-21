import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { SearchComponent, FooterComponent, ListActorsComponent, CardActorComponent } from '../../shared/components';
import { ApiService } from '../../core';
import { HttpParams } from '@angular/common/http';
import { Actors } from '../../core/interfaces';

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

  private apiService = inject( ApiService );

  public actorA = signal<Actors | undefined>(undefined);
  public actorB = signal<Actors | undefined>(undefined);
  public turnActor: 'A' | 'B' = 'A';

  public actorsSelected = computed(()=> !!this.actorA() && !!this.actorB());

  public listActors = signal<Actors[]>([]);

  public searchActor( event: any ) {
    const name = event.target.value.trim();
    if( !name ) return this.listActors.set([]);

    this.apiService.get<Actors[]>(`tmdb/search/actors`, new HttpParams({
      fromString: `q=${name}`
    })).subscribe({
      next: data => {
        this.listActors.set( data )
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
    
  }

}