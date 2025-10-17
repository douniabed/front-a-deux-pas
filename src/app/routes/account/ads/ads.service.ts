import { Injectable } from '@angular/core';
import { AD_PATH } from '../../../shared/utils/constants/util-constants';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from '../../../shared/services/handle-error.service';
import { catchError, Observable } from 'rxjs';
import { AdCard } from '../../../shared/models/ad/ad-card.model';
import { ConfigService } from '../../../shared/services/config.service';


@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
    private configService: ConfigService
  ) {}

  private get adBaseUrl(): string {
    return `${this.configService.apiUrl}${AD_PATH}`;
  }

  // Fetch a list of ads published by a specific user
  fetchUserAds(userId: number, pageNumber: number, pageSize: number): Observable<AdCard[]> {
    const url = `${this.adBaseUrl}/adTablist/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<AdCard[]>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
