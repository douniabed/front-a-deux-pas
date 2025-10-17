import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../shared/services/handle-error.service';
import { ACCOUNT_PATH } from '../../shared/utils/constants/util-constants';
import { Observable, catchError } from 'rxjs';
import { ConfigService } from '../../shared/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
    private configService: ConfigService
  ) {}

  private get accountBaseUrl(): string {
    return `${this.configService.apiUrl}${ACCOUNT_PATH}`;
  }

  saveProfile(userProfileData: FormData): Observable<any> {
    return this.http
      .patch(`${this.accountBaseUrl}/create`, userProfileData, {
        responseType: 'text' as 'json',
      })
      .pipe(catchError(this.handleErrorService.handleError));
  }
}
