import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './cambiarclave.component.html',
  styleUrl: './cambiarclave.component.css'
})
export class EditarPerfilComponent {
  administrador: any = {};
  tiposAdmin:any = []

  constructor(private http: HttpClient) {
    this.buscarTipos();   
    let adminStr:any = localStorage.getItem("usuario");
    this.administrador = JSON.parse(adminStr);
   }
   
   
  buscarTipos() {
    this.servicioBuscarTipos().subscribe(
      (u: any) => {
        this.tiposAdmin = u
        console.log(this.tiposAdmin);
        
      }
    )
  }
  servicioBuscarTipos(): Observable<any> {
    return this.http.get<any>("http://localhost:8081/tipoAdministrador/buscar");

  }

  editarPerfil() {
    let formularioValido: any = document.getElementById("perfilForm");
    if (formularioValido.reportValidity()) {
      this.servicioEditarPerfil().subscribe(
        (response: any) => this.validarEdicionPerfil(response)
      );
    }
  }

  validarEdicionPerfil(response: any) {
    if (response) {
      alert("se cambio contraseña");
      // Actualiza localStorage con los nuevos datos
      localStorage.setItem("usuario", JSON.stringify(this.administrador));
      location.href = "miPerfil"; // Redirige a la vista de perfil
    } else {
      alert("Error al editar el perfil");
    }
  }

  servicioEditarPerfil(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>("http://localhost:8081/administrador/editar", this.administrador, httpOptions).pipe(
      catchError(e => "1")
    );
  }
}
