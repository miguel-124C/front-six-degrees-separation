import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { GameService } from '../../core';
import { BetterRouts } from '../../core/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examen',
  imports: [],
  templateUrl: './examen.html',
  styleUrl: './examen.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Examen implements OnInit {

  private gameService = inject( GameService );
  private router = inject( Router );
  
  private readonly urlImage = "https://image.tmdb.org/t/p/original";

  betterRuta = signal<BetterRouts[]>([]);

  public getUrl( path: string ) {
    return `${this.urlImage}${path}`
  }

  ngOnInit(): void {
    this.betterRuta.set( this.gameService.betterRuta() );
  }

  public backGame() {
    this.router.navigateByUrl('/')
  }

}