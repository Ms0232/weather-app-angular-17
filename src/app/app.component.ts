import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { Title } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    SkeletonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
})
export class AppComponent {
  constructor(private titleService: Title) {}
  isLoading: boolean = true;
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  httpclient = inject(HttpClient);
  private rapidAPIKey = '8e3437e495mshcde8228ffbac555p1fe60ejsnced00cd59db7';
  private rapidAPIHost = 'weatherapi-com.p.rapidapi.com';

  headers = new HttpHeaders({
    'x-rapidapi-key': this.rapidAPIKey,
    'x-rapidapi-host': this.rapidAPIHost,
  });
  current: any;
  location: any;
  // Default city

  title: string = '';
  onInputChange() {
    // Check if the input data has changed
    if (this.debounceTimer) {
      this.titleService.setTitle(this.title);
      clearTimeout(this.debounceTimer); // Clear previous timer
    }

    this.debounceTimer = setTimeout(() => {
      if (this.title !== '') {
        // Call your API here using this.inputData
        this.fetchData(this.title);
      }
    }, 400);
  }
  fetchData(data: string) {
    this.httpclient
      .get<any>(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=${data}`,
        {
          headers: this.headers,
        }
      )
      .subscribe((data: any) => {
        console.log(data);
        this.current = data.current;
        this.location = data.location;
        this.isLoading = false;
      });
  }
}
