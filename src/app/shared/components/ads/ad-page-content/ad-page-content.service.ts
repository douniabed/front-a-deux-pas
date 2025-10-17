import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../../services/handle-error.service';
import { Observable, catchError } from 'rxjs';
import { AD_PATH } from '../../../utils/constants/util-constants';
import { AdCard } from '../../../models/ad/ad-card.model';
import { ConfigService } from '../../../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AdPageContentService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
    private configService: ConfigService
  ) {}

  private get adBaseUrl(): string {
    return `${this.configService.apiUrl}${AD_PATH}`;
  }

  // Find ads with a specific category
  getSimilarAds(category: string, publisherId: number, userId?: number): Observable<AdCard[]> {
    const url = `${this.adBaseUrl}/similarAdsList/${category}/${publisherId}/${userId}`;
    return this.http.get<AdCard[]>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
