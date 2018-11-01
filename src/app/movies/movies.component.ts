import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../core/movies.service';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  popularMovies: Movie[];
  theatersMovies: Movie[];
  kidsMovies: Movie[];
  dramasMovies: Movie[];
  isSearched: boolean;
  searchedResults;
  searchedWord: string;

  constructor( 
    private moviesService: MoviesService,
  ) { }

  ngOnInit() {

    this.moviesService.getPopular().subscribe(data => {
      this.popularMovies = data;
    });

    this.moviesService.getTheatres().subscribe(data => {
      this.theatersMovies = data;
    });

    this.moviesService.getKids().subscribe(data => {
      this.kidsMovies = data;
    });

    this.moviesService.getDramas().subscribe(data => {
      this.dramasMovies = data;
    });
  }

  onSearched(isSearched: boolean) {
    this.isSearched = isSearched;
  }

  onSearchedResults(searchedResults) {
    this.searchedResults = searchedResults;
  }

  onSearchedWord(searchedWord) {
    this.searchedWord = searchedWord;
  }
}