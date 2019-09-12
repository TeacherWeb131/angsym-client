import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { UiService } from "src/app/ui/ui.service";

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

  constructor(
    private auth: AuthService,
    private router: Router,
    private ui: UiService
  ) {}

  ngOnInit() {}

  handleSubmit() {
    if (this.form.invalid) return;

    // Active l'ecran de chargement
    this.ui.activateLoading();

    this.auth.authenticate(this.form.value).subscribe(
      resultat => {
        this.ui.deactivateLoading();
        this.errorMessage = "";
        this.router.navigateByUrl("/");
      },
      error => {
        // Desactive l'ecrand e chargement
        this.ui.deactivateLoading();
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
