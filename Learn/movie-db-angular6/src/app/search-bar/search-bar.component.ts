import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MoviesService } from '../core/movies.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchingResults;
  isSearched:boolean;

  @Output() searched = new EventEmitter<any>();
  @Output() searchedResult = new EventEmitter<any>();
  @Output() searchedWord = new EventEmitter<any>();

  constructor( private moviesService: MoviesService ) { }

  ngOnInit() {}

  search(filmTitle) {
    this.isSearched = true;

    this.searched.emit(this.isSearched);
    this.searchedWord.emit(filmTitle.search);

    this.moviesService.findAMovie(filmTitle.search).subscribe(data => {
      this.searchingResults = data;
      this.searchedResult.emit(this.searchingResults.results);
    });
  }
}
