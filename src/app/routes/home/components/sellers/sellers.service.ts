import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../../../shared/services/handle-error.service';
import { USER_PATH } from '../../../../shared/utils/constants/util-constants';
import { Observable, catchError } from 'rxjs';
import { UserPresentation } from '../../../../shared/models/user/user-presentation.model';
import { ConfigService } from '../../../../shared/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class SellersService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
    private configService: ConfigService
  ) {}

  private get userBaseUrl(): string {
    return `${this.configService.apiUrl}${USER_PATH}`;
  }

  getSellersNearby(userId: number): Observable<UserPresentation[]> {
    const url = `${this.userBaseUrl}/${userId}/nearby-sellers`;
    return this.http.get<UserPresentation[]>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
