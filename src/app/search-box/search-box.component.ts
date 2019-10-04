import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { SearchResult } from 'src/search.result.model';
import { SearchService } from '../search.service';
import { Observable, pipe, fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap, switchAll } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private el: ElementRef, private youtube: SearchService) {}

  ngOnInit() {
    const source = fromEvent(this.el.nativeElement, 'keyup');
    source
      .pipe(
        map((e: any) => {
          console.log(e.target.value);
          return e.target.value;
        }),
        filter((text: string) => text.length > 1),
        debounceTime(1000),
        tap(() => this.loading.emit(true)),
        map((text: string) => {
          return this.youtube.search(text);
        }),
        switchAll()
      )
      .subscribe(
        (res: SearchResult[]) => {
          this.loading.emit(false);
          this.results.emit(res);
        },
        (err: any) => {
          console.log(err);
          this.loading.emit(false);
        },
        () => {
          this.loading.emit(false);
        }
      );
  }
}
