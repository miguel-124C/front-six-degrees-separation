import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Actors } from '../../../core/interfaces';

@Component({
  selector: 'app-list-actors',
  standalone: true,
  imports: [],
  templateUrl: './list-actors.component.html',
  styleUrl: './list-actors.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListActorsComponent {

  public onSelectActor = output<Actors>();
  public actors = input.required<Actors[]>();

  selectActor( actor: Actors ) {
    this.onSelectActor.emit( actor );
  }

}