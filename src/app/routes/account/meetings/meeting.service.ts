import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { MEETING_PATH } from '../../../shared/utils/constants/util-constants';
import { Meeting } from '../../../shared/models/meeting/meeting.model';
import { HandleErrorService } from '../../../shared/services/handle-error.service';
import { MeetingRequest } from '../../../shared/models/meeting/meeting-request.model';
import { ConfigService } from '../../../shared/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  private meeting: MeetingRequest | null = null;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
    private configService: ConfigService
  ) { }

  private get meetingBaseUrl(): string {
    return `${this.configService.apiUrl}${MEETING_PATH}`;
  }

  getProposedMeetings(userId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.meetingBaseUrl}/proposed/${userId}`
    ).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getToBeConfirmedMeetings(userId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.meetingBaseUrl}/toBeConfirmed/${userId}`
    ).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getPlannedMeetings(userId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.meetingBaseUrl}/planned/${userId}`
    ).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getToBeFinishedMeetings(userId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.meetingBaseUrl}/toBeFinalized/${userId}`
    ).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  acceptMeeting(meetingId: number): Observable<Meeting> {
    return this.http.put<Meeting>(`${this.meetingBaseUrl}/${meetingId}/accept`, {}
    ).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  finalizeMeeting(meetingId: number, userId: number): Observable<Meeting> {
    return this.http.put<Meeting>(`${this.meetingBaseUrl}/finalize/${meetingId}/${userId}`, {}
    ).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  // Meeting state management methods
  setMeeting(
    meeting: MeetingRequest | null
  ): void {
    this.meeting = meeting;
  }

  getMeeting(): MeetingRequest | null {
    return this.meeting;
  }
}
