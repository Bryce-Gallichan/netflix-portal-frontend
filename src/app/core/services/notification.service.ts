import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackbar: MatSnackBar) { }

  public showError(message: string, duration: number = 5000) {
    this.snackbar.open(message, 'DISMISS', {
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
      duration: duration
    })
  }

  public showSuccess(message: string, duration: number = 5000) {
    this.snackbar.open(message, 'DISMISS', {
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
      duration: duration
    })
  }
}
