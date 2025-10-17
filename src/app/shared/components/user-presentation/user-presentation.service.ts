import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../services/handle-error.service';
import { UserPresentation } from '../../models/user/user-presentation.model';
import { USER_PATH } from '../../utils/constants/util-constants';
import { catchError, Observable } from 'rxjs';
import { ConfigService } from '../../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserPresentationService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
    private configService: ConfigService
  ) {}

  private get userBaseUrl(): string {
    return `${this.configService.apiUrl}${USER_PATH}`;
  }

  getUserPresentation(userAlias: string): Observable<UserPresentation> {
    return this.http.get<UserPresentation>(`${this.userBaseUrl}/${userAlias}/presentation`)
    .pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
