import {Component, OnInit, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  photos = signal([]);

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
    this.http.get('https://jsonplaceholder.typicode.com/photos')
      .subscribe(value => {
        let slice = (value as []).slice(0, 5);
        this.photos.set(slice);
      });
  }
}
