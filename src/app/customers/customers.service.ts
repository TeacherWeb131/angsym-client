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
}
