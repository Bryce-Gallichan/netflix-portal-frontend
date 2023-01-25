import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from '@angular/fire/auth'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Login } from '../models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  login({ email, password}: Login) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  forgotPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  async getToken() {
    let token = await this.auth.currentUser?.getIdToken();
    return token;
  }

  getEmail() {
    return this.auth.currentUser?.email;
  }

  getLoggedInUser() {
    return this.auth.currentUser;
  }

  googleAuth() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
}
