import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../shared/services/handle-error.service';
import { USER_PATH } from '../../shared/utils/constants/util-constants';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { UserAliasAndLocation } from '../models/user/user-alias-and-location.model';
import { UserPresentation } from '../models/user/user-presentation.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private sellerSubject = new BehaviorSubject<UserPresentation | null>(null);
  seller$ = this.sellerSubject.asObservable();

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
    private configService: ConfigService
  ) {}

  private get userBaseUrl(): string {
    return `${this.configService.apiUrl}${USER_PATH}`;
  }

  getUserAliasAndLocation(userId: number): Observable<UserAliasAndLocation> {
    const url = `${this.userBaseUrl}/${userId}/alias-and-location`;
    return this.http.get<UserAliasAndLocation>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  setSeller(seller: UserPresentation) {
    this.sellerSubject.next(seller);
  }

  fetchUserByAlias(alias: string): Observable<any> {
    const url = `${this.userBaseUrl}/${alias}`;
    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleErrorService.handleError));
  }
}
