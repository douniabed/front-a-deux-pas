import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { PreferredSchedule } from '../../../shared/models/user/preferred-schedule.model';
import { PreferredMeetingPlace } from '../../../shared/models/user/preferred-meeting-place.model';
import { ACCOUNT_PATH } from '../../../shared/utils/constants/util-constants';
import { HandleErrorService } from '../../../shared/services/handle-error.service';
import { ConfigService } from '../../../shared/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
    private configService: ConfigService
  ) {}

  private get accountBaseUrl(): string {
    return `${this.configService.apiUrl}${ACCOUNT_PATH}`;
  }

  // Fetch user's preferred schedules from the API
  getUserPreferredSchedules(userId: number): Observable<PreferredSchedule[]> {
    return this.http.get<PreferredSchedule[]>(`${this.accountBaseUrl}/${userId}/schedules`)
    .pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  // Fetch user user's preferred meeting places from the API
  getPreferredMeetingPlaces(userId: number): Observable<PreferredMeetingPlace[]> {
    return this.http.get<PreferredMeetingPlace[]>(`${this.accountBaseUrl}/${userId}/meeting-places`)
    .pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
