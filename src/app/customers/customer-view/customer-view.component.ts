import { Component, OnInit } from "@angular/core";
import { CustomersService } from "../customers.service";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { Customer } from "../customer";
import { UiService } from "src/app/ui/ui.service";

@Component({
  selector: "app-customer-view",
  templateUrl: "./customer-view.component.html",
  styleUrls: ["./customer-view.component.scss"]
})
export class CustomerViewComponent implements OnInit {
  customer: Customer;

  constructor(private ui: UiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.customer = this.route.snapshot.data.apiCustomer;
  }

  getStatusLabel(status: string) {
    return this.ui.getInvoiceStatusLabel(status);
  }

  getStatusClass(status: string) {
    return this.ui.getInvoiceStatusBadge(status);
  }
}
