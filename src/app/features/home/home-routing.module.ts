import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from '../pages/about/about.component';
import { MoviesComponent } from '../pages/movies/movies.component';
import { TvShowsComponent } from '../pages/tv-shows/tv-shows.component';
import { FavoritesComponent } from '../pages/favorites/favorites.component';
import { DetailsComponent } from '../shared/details/details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'about',
        component: AboutComponent,
        data: { title: 'About' }
      },
      {
        path: 'movies',
        component: MoviesComponent,
        data: { title: 'Movies' }
      },
      {
        path: 'tv-shows',
        component: TvShowsComponent,
        data: { title: 'TV Shows' }
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
        data: { title: 'Favorites' }
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'about'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
