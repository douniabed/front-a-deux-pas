import { Injectable } from '@angular/core';
import { AD_PATH, MEETING_PATH } from '../../../../../../shared/utils/constants/util-constants';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from '../../../../../../shared/services/handle-error.service';
import { catchError, Observable } from 'rxjs';
import { ConfigService } from '../../../../../../shared/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class CtaMyAdService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
    private configService: ConfigService
  ) {}

  private get adBaseUrl(): string {
    return `${this.configService.apiUrl}${AD_PATH}`;
  }

  private get meetingBaseUrl(): string {
    return `${this.configService.apiUrl}${MEETING_PATH}`;
  }

  getFavoriteCount(adId: number): Observable<number> {
    const url = `${this.adBaseUrl}/favoriteCount/${adId}`;
    return this.http.get<number>(url).pipe(
      catchError(this.handleErrorService.handleError)
    )
  }

  getBuyerAlias(adId: number): Observable<string> {
    const url = `${this.meetingBaseUrl}/${adId}/buyer`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      catchError(this.handleErrorService.handleError)
    )
  }

  getSaleDate(adId: number): Observable<Date> {
    const url = `${this.meetingBaseUrl}/${adId}/date`;
    return this.http.get<Date>(url).pipe(
      catchError(this.handleErrorService.handleError)
    )
  }

  deleteAd(adId: number): Observable<number> {
    const url = `${this.adBaseUrl}/${adId}`;
    return this.http.delete<number>(url, {
      responseType: 'text' as 'json'
    }).pipe(
      catchError(this.handleErrorService.handleError)
    )
  }
}
