import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  getListMovies(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/filmes`);
  }

  registerMovie(formMovie): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/filmes`, formMovie);
  }

  editMovie(formMovie, idMovie): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/filmes/` + idMovie, formMovie);
  }
  deleteMovie(idMovie): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/filmes/` + idMovie);
  }
}
