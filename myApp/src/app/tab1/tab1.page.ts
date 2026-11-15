import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface TipoUsuario {
  idtipoUsuario: number;
  descripcion: string;
  imagen: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  usuario: any = {};
  cambiarContrasenaActivo: boolean = false; // Control de la vista
  tipos: TipoUsuario[] = []; // Lista de tipos de usuario

  constructor(private http: HttpClient) {
    const u: any = localStorage.getItem('usuario');
    this.usuario = JSON.parse(u);
  }

  ngOnInit() {
    this.buscarTiposUsuario(); // Cargar tipos de usuario al iniciar el componente
  }

  agregarfoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.usuario.foto = reader.result as string; // Convertimos el resultado a string para base64
      };
      reader.onerror = (error) => {
        console.error('Error al leer el archivo: ', error); // Manejo de errores
      };
      reader.readAsDataURL(file); // Leemos el archivo como base64
    } else {
      console.warn('No se seleccionó un archivo'); // Opcional: manejo si no se seleccionó archivo
    }
  }

  // Método para alternar entre la vista de perfil y cambiar contraseña
  activarCambiarContrasena() {
    this.cambiarContrasenaActivo = !this.cambiarContrasenaActivo;
  }

  // Método para cambiar la contraseña
  cambiarContrasena() {
    const formularioValido: any = document.getElementById('perfilForm');
    if (formularioValido.reportValidity()) {
      this.servicioEditarPerfil().subscribe((response: any) =>
        this.validarEdicionPerfil(response)
      );
    }
  }

  // Validar la respuesta del backend
  validarEdicionPerfil(response: any) {
    if (response) {
      alert('Contraseña cambiada con éxito');
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
      this.cambiarContrasenaActivo = false;
    } else {
      alert('Error al cambiar la contraseña');
    }
  }

  // Servicio para editar el perfil
  servicioEditarPerfil(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(
      'http://localhost:8081/usuario/editar',
      this.usuario,
      httpOptions
    );
  }

  // Cargar tipos de usuario desde el backend
  buscarTiposUsuario() {
    this.servicioBuscarTiposUsuario().subscribe((tipos: TipoUsuario[]) => {
      this.tipos = tipos; // Asignar la lista de tipos de usuario
    });
  }

  // Servicio para obtener los tipos de usuario
  servicioBuscarTiposUsuario(): Observable<TipoUsuario[]> {
    return this.http.get<TipoUsuario[]>('http://localhost:8081/TipoUsuario/buscar');
  }

  // Método para cerrar sesión
  logout() {
    localStorage.clear();
    location.href = '';
  }
}
