import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShowQuery } from '../models/show-query.interface';
import { Show } from '../models/show.interface';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  constructor(private http: HttpClient) { }

  getAllShows(query: ShowQuery): Observable<Show[]> {
    return this.http.post<Show[]>(`${environment.base_url}/show`, query);
  }

  getShowById(id: string): Observable<Show> {
    return this.http.get<Show>(`${environment.base_url}/show/get-show/${id}`);
  }

  addShowToFavorites(id: string): Observable<Show> {
    return this.http.post<Show>(`${environment.base_url}/show/add-show/${id}`, {});
  }

  deleteShowFromFavorites(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.base_url}/show/remove-show/${id}`);
  }

  getFavorites(): Observable<Show[]> {
    return this.http.get<Show[]>(`${environment.base_url}/show/favorites`);
  }
}
