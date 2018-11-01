import { Component, OnInit } from '@angular/core';

import { MoviesService } from '../core/movies.service';
import { ActivatedRoute } from '@angular/router';
import { debug } from 'util';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: Movie;

  constructor(
    private moviesService: MoviesService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params)=> {
      let id: number = params['id'];
      this.moviesService.getMovieDetails(id).subscribe(movie => {
        this.movie = movie;
      })
    })
  }

}
