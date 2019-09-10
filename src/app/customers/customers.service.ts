import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Customer } from "./customer";

@Injectable({
  providedIn: "root"
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  public findAll() {
    return this.http.get("http://localhost:8000/customers").pipe(
      map(data => {
        // Travailler sur les données et les transformer
        const customers = data["hydra:member"] as Customer[];
        // les retourner sous la forme d'un tableau de véritables customers
        return customers;
      })
    );
  }

  public find(id: number) {
    return this.http.get<Customer>("http://localhost:8000/customers/" + id);
  }

  public create(customer: Customer) {
    return this.http.post<Customer>(
      "http://localhost:8000/customers",
      customer
    );
  }

  public update(customer: Customer) {
    const updatedCustomer = {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email
    };

    return this.http.put<Customer>(
      "http://localhost:8000/customers/" + customer.id,
      updatedCustomer
    );
  }
}
