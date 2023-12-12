import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewOneComponent } from '../new-one/new-one.component';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SkeletonComponent, FormsModule, CommonModule, NewOneComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
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
        // console.log(data);
        this.current = data.current;
        this.location = data.location;
        this.isLoading = false;
      });
  }
}
