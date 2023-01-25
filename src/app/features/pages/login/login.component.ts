import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  loading: boolean = false;
  hide: boolean = true;

  isGoogleSignIn: boolean = true;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required]]
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  login() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.loading = true;

      this.authService
        .login(this.form.value)
        .then((res) => {
          this.router.navigate(['/about']);
        })
        .catch((err) => {
          this.loading = false;
          let errorMsg;
          err.code === 'auth/user-disabled' ?
            errorMsg = 'Account is disabled. Please contact support' :
            errorMsg = 'Email or password is incorrect'

          this.notificationService.showError(errorMsg, 3000);
        });
    }
  }

  signInWithGoogle() {
    this.authService
      .googleAuth()
      .then((res) => {
        this.router.navigate(['/about']);
      })
      .catch((err) => {
        this.loading = false;

        if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
          let errorMsg = 'Something went wrong while signing in. Please try again';
          console.log(err);
          this.notificationService.showError(errorMsg, 3000);
        }
      });
  }
}
