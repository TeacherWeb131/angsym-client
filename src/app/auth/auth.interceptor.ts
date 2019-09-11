import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.auth.isAuthenticated()) {
      return next.handle(req);
    }

    const token = this.auth.getToken();

    const clonedReq = req.clone({
      headers: req.headers.append("Authorization", "Bearer " + token)
    });

    return next.handle(clonedReq);
  }
}
