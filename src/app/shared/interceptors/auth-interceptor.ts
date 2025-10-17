import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { ConfigService } from "../services/config.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip interceptor for config.json requests to avoid circular dependency
    if (req.url.includes('/assets/config.json')) {
      return next.handle(req);
    }

    // Get the auth token from the service.
    const authToken = localStorage.getItem('token');

    // Try to get API URL, but handle case where config isn't loaded yet
    let apiUrl: string;
    try {
      apiUrl = this.configService.apiUrl;
    } catch (error) {
      // Config not loaded yet, skip this request
      return next.handle(req);
    }

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    if (req.url.startsWith(apiUrl)) {
      if (authToken) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`,
          }
        });
        // send cloned request with header to the next handler.
        return next.handle(authReq).pipe(
          catchError(error => {
            if (error.status === 401) {
              // Handle unauthorized error and redirect to login page
              this.authService.logout();
            }
            return throwError(() => error);
          })
        );
      }
    }
    return next.handle(req);
  }
}
