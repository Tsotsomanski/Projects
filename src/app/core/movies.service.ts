import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { from } from 'rxjs';
import { Movie } from '../models/movie.model';

const apiKey: string = '94b5e1070fe53e93ee905ffe5fea0da7';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  domainPath: string = "https://api.themoviedb.org/3";
  authentication: string = 'api_key=';

  popularMoviesPath: string = "/discover/movie?sort_by=popularity.desc";
  theatresMoviesPath: string = "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22";
  kidsMoviesPath: string = "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc";
  dramasMoviesPath: string = "/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10";

  constructor( private http: HttpClient ) { }

  getPopular() {
    let url:string = this.domainPath + this.popularMoviesPath + "&" + this.authentication + apiKey;

    return this.http.get<Movie[]>(url);
  }

  getTheatres() {
    let url:string = this.domainPath + this.theatresMoviesPath + "&" + this.authentication + apiKey;

    return this.http.get<Movie[]>(url);
  }

  getKids() {
    let url:string = this.domainPath + this.kidsMoviesPath + "&" + this.authentication + apiKey;

    return this.http.get<Movie[]>(url);
  }

  getDramas() {
    let url:string = this.domainPath + this.dramasMoviesPath + "&" + this.authentication + apiKey;

    return this.http.get<Movie[]>(url);
  }

  getMovieDetails(id: number) {
    let url:string = this.domainPath + "/movie/" + id + "?" + this.authentication + apiKey;

    return this.http.get<Movie>(url);
  }

  findAMovie(title: string) {
    let url:string = this.domainPath + "/search/movie" + "?" + this.authentication + apiKey + "&query=" + title;

    return this.http.get<Movie[]>(url);
  }
}