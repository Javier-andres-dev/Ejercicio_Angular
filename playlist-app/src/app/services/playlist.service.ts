import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../pages/playlist/plalist.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private baseUrl = 'http://localhost:3000/lists';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getPlaylist(nombre: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.baseUrl}/${nombre}`, {
      headers: this.getAuthHeaders()
    });
  }

  createPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(this.baseUrl, playlist, {
      headers: this.getAuthHeaders()
    });
  }

  deletePlaylist(nombre: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${nombre}`, {
      headers: this.getAuthHeaders()
    });
  }
}
