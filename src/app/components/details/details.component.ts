import { HttpService } from './../../services/http.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Game } from 'src/app/model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit , OnDestroy {

  gameRating = 0;
  gameId!: string;
  game!: Game;
  routeSub!: Subscription;
  gameSub!: Subscription;

  constructor(
    private activatedRoute : ActivatedRoute,
    private httpService : HttpService

  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params : Params)=>{
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    })
  }

  getGameDetails(id : string) : void{
    this.gameSub = this.httpService.getGamesDetails(id).subscribe((gameRes : Game)=>{
      this.game = gameRes;
      console.log('it show : ' + this.game.background_image);
      setTimeout(()=>{
        this.gameRating = this.game.metacritic;
      })
    })
  }


  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  ngOnDestroy(): void {
      if (this.routeSub){
        this.routeSub.unsubscribe();
      }
      if(this.gameSub){
        this.gameSub.unsubscribe()
      }
  }

}
