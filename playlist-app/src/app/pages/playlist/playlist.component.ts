import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from './plalist.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-playlist',
  standalone: true,
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule 
  ]
})
export class PlaylistComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'descripcion', 'canciones', 'acciones'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private playlistService: PlaylistService) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cargarPlaylists();
  }

  cargarPlaylists() {
    this.playlistService.getAllPlaylists().subscribe({
      next: (data) => {
        this.dataSource.data = data.map(p => ({
          ...p,
          canciones: p.canciones?.length ?? 0
        }));
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(row: any) {
  alert('Editar playlist: ' + row.nombre);
  }

  eliminar(row: any) {
    if (confirm(`¿Eliminar la playlist "${row.nombre}"?`)) {
      this.playlistService.deletePlaylist(row.nombre).subscribe({
        next: () => {
          alert('Playlist eliminada');
          this.cargarPlaylists();
        },
        error: () => alert('Error al eliminar')
      });
    }
  }

}
