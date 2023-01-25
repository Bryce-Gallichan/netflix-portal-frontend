import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from '../home/home-routing.module';
import { AboutComponent } from '../pages/about/about.component';
import { MoviesComponent } from '../pages/movies/movies.component';
import { TvShowsComponent } from '../pages/tv-shows/tv-shows.component';
import { DetailsComponent } from '../shared/details/details.component';
import { FavoritesComponent } from '../pages/favorites/favorites.component';
import { ShowTableComponent } from '../shared/show-table/show-table.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    MoviesComponent,
    TvShowsComponent,
    DetailsComponent,
    FavoritesComponent,
    ShowTableComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatChipsModule
  ]
})
export class HomeModule { }
