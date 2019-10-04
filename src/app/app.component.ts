import { Component } from '@angular/core';
import { SearchResult } from 'src/search.result.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  results: SearchResult[];
  loading: boolean;

  updateResult(e: any) {
    console.log(e);
  }
}
