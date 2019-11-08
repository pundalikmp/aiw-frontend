import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  ProfileAuth,
  Order,
  Status,
  Register,
  FeedbackInput,
  RegisterPayload,
  AvatarPayload,
  UploadPayload,
  RegisterStatus,
} from "../model/data.model";
import { Observable } from "rxjs";
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: "root"
})
export class DataService {
  url: string = "../../../assets/data/profile.json";
  baseUrl: string = "https://aiw-backend-pupu.herokuapp.com";
  userData: string;

  constructor(private readonly http: HttpClient, private loaderService: LoaderService) {
    this.loaderService.userState.subscribe(data => {
      this.userData = data;
    });
  }

  fetchProfile(): Observable<RegisterPayload> {
    return this.http.get<RegisterPayload>(`${this.baseUrl}/register`,
      {
        params: {
          username: this.userData ? this.userData : ''
        }
      }).pipe(response => response);
  }

  fetchLogin(): Observable<ProfileAuth[]> {
    return this.http
      .get<ProfileAuth[]>(`${this.baseUrl}/login`)
      .pipe(response => response);
  }

  checkAuth(input: ProfileAuth): Observable<Status> {
    return this.http
      .post<Status>(`${this.baseUrl}/login/auth`, input)
      .pipe(response => response);
  }

  registerUser(input: Register): Observable<RegisterStatus> {
    return this.http
      .post<RegisterStatus>(`${this.baseUrl}/register`, input)
      .pipe(response => response);
  }

  orderVehicle(vehicleInput: Order): Observable<Status> {
    return this.http
      .post<Status>(`${this.baseUrl}/order/book`, vehicleInput)
      .pipe(response => response);
  }

  fetchOrder(): Observable<Order[]> {
    return this.http
      .get<Order[]>(`${this.baseUrl}/order`,
      {
        params: {
          username: this.userData ? this.userData : ''
        }
      })
      .pipe(response => response);
  }

  postFeedback(feedbackInput: FeedbackInput): Observable<Status> {
    return this.http
      .post<Status>(`${this.baseUrl}/feedback`, feedbackInput)
      .pipe(response => response);
  }

  uploadAvatar(avatarInput: FormData): Observable<UploadPayload> {
    return this.http
      .post<UploadPayload>(`${this.baseUrl}/upload`, avatarInput)
      .pipe(response => response);
  }

  downloadAvatar(): Observable<AvatarPayload> {
    return this.http.get<AvatarPayload>(`${this.baseUrl}/upload`,
    {
      params: {
        username: this.userData ? this.userData : ''
      }
    }
      ).pipe(res => res);
  }
}
