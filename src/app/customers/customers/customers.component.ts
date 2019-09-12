import { Component, OnInit } from "@angular/core";
import { Customer } from "../customer";
import { CustomersService } from "../customers.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"]
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomersService
  ) {}

  ngOnInit() {
    this.customers = this.route.snapshot.data.apiCustomers;
  }

  deleteCustomer(id) {
    // Avant ce travail dans le client, il faut modifier la propriété 'invoices' dans l'entité 'Customer'
    // et ajouter 'orphanRemoval=true' en annotations pour authoriser la suppression des factures (invoices) liés à ce client
    // ATTENTION: dans notre cas d'application client, c'est une très mauvaise pratique car on ne supprime jamais les factures ni le client, au pire on archive.
    this.customerService.delete(id).subscribe(data => alert("Suppression OK"));
    this.customerService
      .findAll()
      .subscribe(httpcustomers => (this.customers = httpcustomers));
  }
}
