import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { youTubeSearchInjectable } from '../youtube-search.injectable';
import { from } from 'rxjs';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
  declarations: [AppComponent, SearchBoxComponent, SearchResultComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [youTubeSearchInjectable],
  bootstrap: [AppComponent]
})
export class AppModule {}
