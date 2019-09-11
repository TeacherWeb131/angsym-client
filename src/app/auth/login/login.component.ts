import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  errorMessage: string;

  form = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  });

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  handleSubmit() {
    if (this.form.invalid) return;

    this.auth.authenticate(this.form.value).subscribe(
      resultat => {
        console.log(resultat);
        this.errorMessage = "";
        this.router.navigateByUrl("/");
      },
      error => {
        if (error.status === 401) {
          this.errorMessage =
            "Nous n'avons pas trouvé de compte utilisateur qui corresponde avec cet email et ce mot de passe";

          return;
        }

        this.errorMessage =
          "Un problème est survenu, veuillez ré-essayer plus tard";
      }
    );
  }
}
