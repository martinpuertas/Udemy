import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  errorMessage: string; 
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // if the message won't change we can use the snapshot and it will read the message from app-routing.module
    this.errorMessage = this.route.snapshot.data['message'];
    // if the message might change we can use de subscribe
    this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data.message;
      }
    )
  }

}
