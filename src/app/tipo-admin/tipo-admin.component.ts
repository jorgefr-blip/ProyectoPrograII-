import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-tipo-admin',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './tipo-admin.component.html',
  styleUrls: ['./tipo-admin.component.css']
})
export class TipoAdminComponent {

  tipoAdmin: any = {};

  constructor(private http: HttpClient) {}

  agregarfoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.tipoAdmin.imagen = reader.result as string; // Convertimos el resultado a base64
      };
      reader.onerror = (error) => {
        console.error('Error al leer el archivo: ', error); // Manejo de errores
      };
      reader.readAsDataURL(file); // Leemos el archivo como base64
    } else {
      console.warn('No se seleccionó un archivo');
    }
  }

  creaTipoAdmin() {
    // Validamos si los campos son correctos
    if (!this.tipoAdmin.descripcion || !this.tipoAdmin.imagen) {
      alert('La descripción y la imagen son obligatorias');
      return;
    }

    let formularioValido: any = document.getElementById('tipoAdminForm');
    if (formularioValido.reportValidity()) {
      this.servicioCreaTipoAdmin().subscribe(
        (u: any) => this.validarCreaTipoAdmin(u)
      );
    }
  }

  validarCreaTipoAdmin(u: any) {
    console.log(u);
    if (u != null) {
      alert('Tipo de administrador guardado exitosamente');
      this.tipoAdmin = {}; // Limpiamos el formulario
    } else {
      alert('Error al guardar');
    }
  }

  servicioCreaTipoAdmin() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Aseguramos que el tipoAdmin tenga los datos correctos
    console.log('Enviando tipoAdmin:', this.tipoAdmin);

    return this.http.post<any>('http://localhost:8081/tipoAdministrador/guardar', this.tipoAdmin, httpOptions).pipe(
      catchError(e => {
        console.error('Error en la solicitud:', e);
        return [];
      })
    );
  }
}
