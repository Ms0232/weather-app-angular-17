import { Routes } from '@angular/router';
import { DetailedComponent } from './detailed/detailed.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CrudComponent } from './crud/crud.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'detailed', component: DetailedComponent },
  { path: 'crud', component: CrudComponent },
];
