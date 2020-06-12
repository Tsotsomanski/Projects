import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeService } from '../services/observable.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html'
})
export class SubscribeComponent implements OnInit {

  @Output() notification = new EventEmitter<string>();
   
  constructor(
    private httpClient: HttpClientModule,
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.callDataFromService();
  }

  showSubscribtion() {
    this.notification.emit("Subsctibtion success")
  }

  callDataFromService() {
    this.homeService
      .getGitHubProfile('ivaylokenov')
      .subscribe(data => console.log(data));
  }
}