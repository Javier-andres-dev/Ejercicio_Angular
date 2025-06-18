import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common'; 
import { PlaylistService } from '../../../services/playlist.service'; // ajusta la ruta según tu proyecto

@Component({
  selector: 'app-create-playlist',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgFor,
    NgIf
  ],
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatePlaylistComponent>,
    private playlistService: PlaylistService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      canciones: this.fb.array([this.crearCancion()])
    });
  }

  get canciones(): FormArray {
    return this.form.get('canciones') as FormArray;
  }

  crearCancion(): FormGroup {
    return this.fb.group({
      titulo: ['', Validators.required],
      artista: ['', Validators.required],
      genero: [''],
      anno: [null],
      album: ['']
    });
  }

  agregarCancion(): void {
    this.canciones.push(this.crearCancion());
    
  }

  eliminarCancion(index: number): void {
    this.canciones.removeAt(index);
  }

  guardar(): void {
    if (this.form.valid) {
      const data = this.form.value;
      this.playlistService.createPlaylist(data).subscribe({
        next: () => {
          console.log('Playlist creada exitosamente');
          this.dialogRef.close(true); // puedes devolver true para recargar la tabla
        },
        error: (err) => {
          console.error('Error al crear playlist:', err);
          alert('Error al crear la playlist');
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }


}
