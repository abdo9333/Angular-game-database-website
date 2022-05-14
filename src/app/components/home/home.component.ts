import { APIResponse } from './../../model';
import { HttpService } from './../../services/http.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public sorting!: string;
  public games!: Array<Game>;

  gamrSub = Subscription;
  routSub = Subscription;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort : string, search?:string): void{
    this.httpService.getGames(sort, search).subscribe((gamelist : APIResponse<Game>)=>{
      this.games = gamelist.results;
      console.log(gamelist);
    })

  }

  ngOndestroy(){

  }

  openDetails(id : string) : void{
    this.router.navigate(['datails', id]);
  }

}
