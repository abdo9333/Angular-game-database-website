import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGames(
    ordering : string,
    search?: string
  ): Observable<APIResponse<Game>>{

    let params = new HttpParams().set('ordering' , ordering);
    if(search){
      params = new HttpParams().set('ordering' , ordering).set('search' , search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BaseUrl}/games`, {
    params : params,
  });

  }

  getGamesDetails(id : string) : Observable<Game> {
    const gameInfoReq =  this.http.get(`${env.BaseUrl}/games/${id}`);
    const  gameTrailerReq = this.http.get(`${env.BaseUrl}/games/${id}/movies`);
    const  gameScreenShotReq = this.http.get(`${env.BaseUrl}/games/${id}/screenshots`);
    const gameScreenshotsRequest = this.http.get(
      `${env.BaseUrl}/games/${id}/screenshots`
    );
    return forkJoin({
      gameInfoReq,
      gameScreenShotReq,
      gameTrailerReq,

    }).pipe(
      map((resp : any)=> {
        return {
          ...resp['gameInfoReq'],
          screenshots : resp['gameScreenShotReq']?.results,
          trailers : resp['gameTrailerReq']?.results
        };
      })
      );
  }

}

