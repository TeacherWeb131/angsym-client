import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.isAuthenticated = this.auth.isAuthenticated();

    this.auth.authState.subscribe(state => {
      this.isAuthenticated = state;
    });
  }

  handleLogout() {
    this.auth.logout();
    this.isAuthenticated = false;
    this.router.navigateByUrl("/login");
  }
}
