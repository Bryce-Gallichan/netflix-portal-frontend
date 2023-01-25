import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent {
  loading: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  loadingChange(isLoading: boolean) {
    this.loading = isLoading;
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
