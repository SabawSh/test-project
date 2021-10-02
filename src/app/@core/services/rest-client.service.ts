import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RestClientService {
  constructor(private http: HttpClient) {}

  public get(url: string): Observable<any> {
    return this.restHandler('get', url);
  }


  private restHandler(requestType, url): Observable<any> {

    return this.http.request(requestType,environment.server_address + url).pipe(
      catchError(err => {
        return throwError(err);
      }),
      timeout(60000)
    );
  }
}
