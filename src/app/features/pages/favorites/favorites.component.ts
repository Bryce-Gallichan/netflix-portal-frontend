import { Component, OnInit } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Show } from 'src/app/core/models/show.interface';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ShowsService } from 'src/app/core/services/shows.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  shows$!: Observable<Show[]>;
  shows!: Show[];
  loading: boolean = false;

  constructor(
    private showService: ShowsService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loading = true;

    this.shows$ = this.showService.getFavorites().pipe(
      tap((res: Show[]) => {
        this.shows = res;
        this.loading = false;
      }),
      catchError(err => {
        this.loading = false;
        this.notificationService.showError('Something went wrong while fetching your favorite shows')
        return throwError(() => err.status);
      })
    );
  }

  deleteFavorite(showId: string) {
    this.loading = true;
    this.showService.deleteShowFromFavorites(showId).pipe(
      catchError(err => {
        this.notificationService.showError('Could not remove favorite. Please try again');
        this.loading = false;
        return throwError(() => err.status);
      })
    ).subscribe(res => {
      const showIndex = this.shows.findIndex(show => show.showId === showId);
      if (showIndex > -1) this.shows.splice(showIndex, 1);
      this.loading = false;
    });
  }

}
