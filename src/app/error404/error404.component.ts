import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-error404",
  templateUrl: "./error404.component.html",
  styleUrls: ["./error404.component.scss"]
})
export class Error404Component implements OnInit {
  currentUrl = window.location.pathname;
  proposition: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // console.log(this.route.snapshot.url[0].path);
    let proposition: string;

    if (this.currentUrl.includes("cus") || this.currentUrl.includes("omer")) {
      this.proposition = "/customers";
    }
  }
}
