import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { environment } from 'src/environments/environment';
import { RouteInfo } from 'src/app/core/models/route-info.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  isSidenavOpen: boolean = true;
  isDevMode: boolean = true;
  scrollPos: number = 0;
  currentUser?: User | null;

  menuItems: RouteInfo[] = [
    {
      title: 'About',
      icon: 'lightbulb',
      path: '/about'
    },
    {
      title: 'Movies',
      icon: 'movie',
      path: '/movies'
    },
    {
      title: 'TV Shows',
      icon: 'live_tv',
      path: '/tv-shows'
    },
    {
      title: 'Favorites',
      icon: 'bookmark',
      path: '/favorites'
    }
  ]

  constructor(
    private route: ActivatedRoute,
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  onWindowScroll(e: any) {
    this.scrollPos = e.srcElement.scrollTop;
  }

  ngOnInit(): void {
    this.isDevMode = !environment.production;

    this.currentUser = this.authService.getLoggedInUser();
  }

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

    this.cdr.detectChanges();
  }

  getTitle() {
    return this.route.snapshot.firstChild?.data['title'];
  }

  getUserPhoto() {
    return this.currentUser?.photoURL?.split('=')[0];
  }

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/login']))
      .catch((err) => console.error(err));
  }

  resetPassword() {
    let email = this.currentUser?.email;
    if (!email) this.notificationService.showError('Something went wrong while sending password reset email. Please try again');
    else {
      this.authService
      .forgotPassword(email)
      .then(() => this.notificationService.showSuccess(`Password reset email has been sent to ${email}`))
      .catch((err) => this.notificationService.showError('Something went wrong while sending password reset email. Please try again'));
    }
  }

  isPasswordProvider() {
    return this.currentUser?.providerData &&
      this.currentUser?.providerData.length > 0 &&
      this.currentUser?.providerData[0].providerId === 'password'
  }

}
