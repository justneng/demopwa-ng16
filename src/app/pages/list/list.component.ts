import {Component, OnInit, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  movies = signal([]);
  isFetching: boolean = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    // this.http.get('/api/movies')
    //   .subscribe(value => {
    //     this.movies.set(value as []);
    //   });
    this.isFetching = true;
    this.http.get('https://justneng.github.io/movies.json')
      .subscribe(value => {
        console.log('value = ', value)
        // let slice = (value as []).slice(0, 2);
        // this.movies.set(slice);
        this.movies.set(value as any);
        this.isFetching = false;
      }, error => {
        this.isFetching = false;
      });
  }
}
