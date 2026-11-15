import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-ingrediente',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent {
  ingrediente: any = {
    nombre: '',
    cantidad: '' 
  };

  constructor(private http: HttpClient) {}

  creaIngrediente() {
    let formularioValido: any = document.getElementById("ingredienteForm"); 
    if (formularioValido.reportValidity()) {
      this.servicioCreaIngrediente().subscribe(
        (u: any) => this.validarCreaIngrediente(u)
      );
    }
  }

  validarCreaIngrediente(u: any) {
    if (u && u !== null) {
      alert("Ingrediente creado exitosamente");
      this.ingrediente = { nombre: '', cantidad: 0 }; // Resetear campos
    } else {
      alert("Error en la creación del ingrediente");
    }
  }

  servicioCreaIngrediente() {
    let httpOptions = { 
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>("http://localhost:8081/ingrediente/guardar", this.ingrediente, httpOptions).pipe(
      catchError(e => "1")
    );
  }
}
