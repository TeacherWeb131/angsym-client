import { Component, OnInit } from "@angular/core";
import { Customer } from "../customer";
import { CustomersService } from "../customers.service";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"]
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private service: CustomersService) {}

  ngOnInit() {
    this.service
      .findAll()
      .subscribe(httpcustomers => (this.customers = httpcustomers));
  }

  deleteCustomer(id) {
    this.service.delete(id).subscribe(data => alert("suppression OK"));
  }
}
