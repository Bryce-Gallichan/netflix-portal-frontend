import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { catchError, map, merge, Observable, startWith, switchMap, throwError } from 'rxjs';
import { Show } from 'src/app/core/models/show.interface';
import { ShowQuery } from 'src/app/core/models/show-query.interface';
import { ShowsService } from 'src/app/core/services/shows.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss']
})
export class ShowTableComponent implements OnInit, AfterViewInit {

  @Input() showType!: string;
  @Output() loadingChangeEvent = new EventEmitter<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['index', 'title', 'releaseYear', 'rating', 'actions'];

  shows$!: Observable<Show[]>
  shows: Show[] = [];
  query!: ShowQuery;
  smallScreen: boolean = false;
  searchInput?: string = '';
  previousPageIndex: number = 0;

  constructor(
    private showService: ShowsService,
    private notificationService: NotificationService,
    private observer: BreakpointObserver,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.query = {
      start_title: '',
      search_parms: '',
      type: this.showType
    }
  }

  ngAfterViewInit(): void {
    //Hide columns if screen is too small
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      this.smallScreen = res.matches;
    });

    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });

    this.fetchData()
  }

  fetchData() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loadingChangeEvent.emit(true);

          let lastShow = this.shows[this.shows.length-1];
          let startTitle = this.paginator.pageIndex === 0 ? '' : lastShow?.title
          this.query = {
            start_title: startTitle,
            search_parms: this.searchInput,
            type: this.showType,
            is_ascending: this.sort.direction === 'asc'
          }

          return this.showService.getAllShows(this.query).pipe(
            catchError(err => {
              console.log(err);
              this.notificationService.showError('Something went wrong while fetching shows');
              this.loadingChangeEvent.emit(false);
              return throwError(() => err.status);
            }));
        }),
        map(data => {
          this.previousPageIndex = this.paginator.pageIndex;
          this.loadingChangeEvent.emit(false);

          if (data === null) {
            return [];
          }
          return data;
        }),
      )
      .subscribe(data => (this.shows = data));
  }

  search() {
    if (this.searchInput) {
      this.fetchData();
    }
  }

  clearSearch() {
    this.searchInput = '';
    this.fetchData();
  }

  addToFavorite(row: Show) {
    this.loadingChangeEvent.emit(true);
    this.showService.addShowToFavorites(row.showId).pipe(
      catchError(err => {
        this.notificationService.showError('Something went wrong. Please try again');
        this.loadingChangeEvent.emit(false);
        return throwError(() => err.status);
      })
    ).subscribe(() => {
      this.loadingChangeEvent.emit(false);
      this.notificationService.showSuccess(`${row.title} added to your favorites`);
    });
  }

  showDetails(row: Show) {
    const dialogRef = this.dialog.open(DetailsComponent, {
      panelClass: 'dialog-borderless'
    });
    dialogRef.componentInstance.showData = row;
  }

}
