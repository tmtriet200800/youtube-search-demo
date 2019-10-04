import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { SearchResult } from 'src/search.result.model';
import { map } from 'rxjs/operators';

export const YOUTUBE_API_KEY = 'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
export const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

@Injectable()
export class SearchService {
  constructor(
    private httpClient: HttpClient,
    @Inject(YOUTUBE_API_KEY) private apiKey: string,
    @Inject(YOUTUBE_API_URL) private apiUrl: string
  ) {}

  search(query: string): Observable<SearchResult[]> {
    const params = [`q=${query}`, `key=${this.apiKey}`, `maxResults=10`, `part=snippet`, `type=video`].join('&');

    const queryUrl = `${this.apiUrl}?${params}`;

    return this.httpClient.get(queryUrl).pipe(
      map(response => {
        console.log(response);
        return response['items'].map(item => {
          return new SearchResult({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url
          });
        });
      })
    );
  }
}
