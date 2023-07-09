import {Component, OnInit, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  photos = signal([]);
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
    this.http.get('https://jsonplaceholder.typicode.com/photos')
      .subscribe(value => {
        let slice = (value as []).slice(0, 2);
        this.photos.set(slice);
        this.isFetching = false;
      }, error => {
        this.isFetching = false;
      });
  }
}
