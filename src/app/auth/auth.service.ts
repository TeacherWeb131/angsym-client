import { Injectable } from "@angular/core";
import { Credentials } from "./credentials";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import jwtDecode from "jwt-decode";

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  // private authToken: string;
  authState = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  authenticate(credentials: Credentials) {
    return this.http
      .post("http://localhost:8000/login_check", credentials)
      .pipe(
        map((resultat: AuthResponse) => {
          window.localStorage.setItem("token", resultat.token);
          this.authState.next(true);
          return resultat;
        })
      );
  }

  logout() {
    window.localStorage.removeItem("token");
    this.authState.next(false);
  }

  getToken(): string {
    return window.localStorage.getItem("token") || null;
  }

  isAuthenticated(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    return true;
  }

  getUserData() {
    if (!this.getToken()) return null;

    return jwtDecode(this.getToken());
  }
}
