import { Component } from '@angular/core';
import { Playlist } from './plalist.model';
import { PlaylistService } from '../../services/playlist.service';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatExpansionModule],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {
  playlists: Playlist[] = [];
  displayedColumns: string[] = ['nombre', 'descripcion'];

  constructor(private playlistService: PlaylistService) {
    this.playlistService.getAllPlaylists().subscribe({
      next: (data) => this.playlists = data,
      error: (err) => console.error('Error al cargar playlists', err)
    });
    console.log(this.playlists)
  }
}
