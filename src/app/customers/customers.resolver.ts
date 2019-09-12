import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { CustomersService } from "./customers.service";
import { Customer } from "./customer";

@Injectable({
  providedIn: "root"
})
export class CustomersResolver implements Resolve<Customer[]> {
  constructor(private service: CustomersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any[] | Observable<any[]> | Promise<any[]> {
    return this.service.findAll();
  }
}
