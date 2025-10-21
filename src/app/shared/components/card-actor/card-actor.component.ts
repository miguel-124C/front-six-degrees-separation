import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Actors } from '../../../core/interfaces';

@Component({
  selector: 'app-card-actor',
  imports: [],
  templateUrl: './card-actor.component.html',
  styleUrl: './card-actor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardActorComponent {

  public actor = input.required<Actors>();

}