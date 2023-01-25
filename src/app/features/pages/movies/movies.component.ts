import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  loading: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  loadingChange(isLoading: boolean) {
    this.loading = isLoading;
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
