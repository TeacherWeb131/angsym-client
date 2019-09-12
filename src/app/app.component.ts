import { Component, OnInit } from "@angular/core";
import {
  Router,
  ResolveStart,
  ResolveEnd,
  NavigationCancel
} from "@angular/router";
import { UiService } from "./ui/ui.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  isLoading = false;

  constructor(private router: Router, private ui: UiService) {}

  ngOnInit() {
    // J'écoute ...
    this.ui.loadingState.subscribe(state => {
      this.isLoading = state;
    });

    // J'ecoute le router
    this.router.events.subscribe(event => {
      if (event instanceof ResolveStart) {
        // On va charger
        this.isLoading = true;
      } else if (
        event instanceof ResolveEnd ||
        event instanceof NavigationCancel
      ) {
        // On a fini de charger
        this.isLoading = false;
      }
    });
  }
}
