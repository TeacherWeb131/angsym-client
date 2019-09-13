import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { UiService } from "src/app/ui/ui.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  error = false;

  form = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    avatar: new FormControl("")
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private ui: UiService
  ) {}

  ngOnInit() {}

  // getters
  get email() {
    return this.form.get("email");
  }

  get password() {
    return this.form.get("password");
  }

  get avatar() {
    return this.form.get("avatar");
  }

  handleSubmit() {
    this.auth.register(this.form.value).subscribe(
      // en cas de succès
      () => {
        this.ui.deactivateLoading();
        this.router.navigateByUrl("/login");
      },
      // en cas d'erreur
      (httpError: HttpErrorResponse) => {
        this.ui.deactivateLoading();

        if (httpError.status === 400) {
          // Violations
          const violations: Violation[] = httpError.error.violations;
          // const violations = httpError.error.violations as Violation[];

          for (let apiViolation of violations) {
            this.form.get(apiViolation.propertyPath).setErrors({
              violation: apiViolation.message
            });
          }

          return;
        }
        // Autre soucis
        this.error = true;
      }
    );
  }
}

export interface Violation {
  propertyPath: string;
  message: string;
}
