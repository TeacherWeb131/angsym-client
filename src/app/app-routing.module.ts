import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomersComponent } from "./customers/customers/customers.component";
import { CustomersModule } from "./customers/customers.module";

const routes: Routes = [
  { path: "customers", component: CustomersComponent },
  { path: "", redirectTo: "/customers", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CustomersModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
