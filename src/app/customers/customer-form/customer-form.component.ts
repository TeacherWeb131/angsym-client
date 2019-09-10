import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CustomersService } from "../customers.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Customer } from "../customer";
import { map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-customer-form",
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.scss"]
})
export class CustomerFormComponent implements OnInit {
  form: FormGroup;
  error = false;
  customer: Customer;

  constructor(
    private service: CustomersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initiliazeForm();

    // Nous observons les paramètres de la route (/customers/__:id__)
    // nous réagissons si ils changent
    this.route.paramMap
      // Transformation de l'observable
      .pipe(
        // On transforme une liste de paramètres en un simple nombre (l'id)
        map(params => +params.get("id")),
        // On transforme l'id en un observable
        switchMap(id => {
          if (id) {
            // Si on a un id, on tranforme en un observable d'un customer
            return this.service.find(id);
          }
          // Sinon on transforme en un observable de undefined
          return of(undefined);
        })
      )
      // On souscrit à l'observable qui va nous donner soit un customer soit undefined
      .subscribe(httpCustomer => {
        this.customer = httpCustomer;
        this.initiliazeForm();
      });
  }

  // AUTRE FACON D'ECRIRE initiliazeForm()
  // initiliazeForm() {
  //   this.form = new FormGroup({
  //     firstName: new FormControl(this.customer ? this.customer.firstName : ""),
  //     lastName: new FormControl(this.customer ? this.customer.lastName : ""),
  //     email: new FormControl(this.customer ? this.customer.email : "")
  //   });
  // }

  initiliazeForm() {
    this.form = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      email: new FormControl("")
    });

    if (this.customer)
      this.form.setValue({
        firstName: this.customer.firstName,
        lastName: this.customer.lastName,
        email: this.customer.email
      });
  }

  handleHttpError(httpError) {
    // Si ce n'est pas des violations du formulaire
    // Plus un problème de connexion / serveur
    if (!httpError.error.violations) {
      this.error = true;
      return;
    }

    // Si c'est un soucis sur les données du formulaire
    this.error = false;
    for (let violation of httpError.error.violations) {
      const { propertyPath, message } = violation;

      this.form.get(propertyPath).setErrors({
        violation: message
      });
    }
  }

  handleSubmit() {
    if (this.customer) {
      // update
      const customer = { ...this.form.value, id: this.customer.id };

      // On envoie une requête d'update et on observe le résultat
      this.service.update(customer).subscribe(
        () => {
          this.router.navigateByUrl("/customers/" + customer.id);
        },
        httpError => this.handleHttpError(httpError)
      );

      return;
    }

    // sinon du create
    this.service.create(this.form.value).subscribe(
      (customer: Customer) => {
        // Redirection vers la page du customer
        // /customers/:id
        this.router.navigateByUrl("/customers/" + customer.id);
      },
      httpError => this.handleHttpError(httpError)
    );
  }

  hasViolation(fieldName: string) {
    return this.form.get(fieldName).hasError("violation");
  }

  getViolationMessage(fieldName: string) {
    return this.form.get(fieldName).getError("violation");
  }
}
