import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../../services/handle-error.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AD_PATH } from '../../../utils/constants/util-constants';
import { ConfigService } from '../../../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AdFormService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
    private configService: ConfigService
  ) { }

  private get adBaseUrl(): string {
    return `${this.configService.apiUrl}${AD_PATH}`;
  }

  createAd(adData: FormData): Observable<any> {
    const url = `${this.adBaseUrl}/create`;
    return this.http.post(url, adData).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  updateAd(adData: FormData): Observable<any> {
    const url = `${this.adBaseUrl}/update`;
    return this.http.put(url, adData).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
