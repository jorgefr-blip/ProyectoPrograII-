import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vista-platillo',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './vista-platillo.component.html',
  styleUrl: './vista-platillo.component.css'
})
export class VistaPlatilloComponent {

  platillos: any = [];
  ingrediente: any = [];

  constructor(private http: HttpClient){
    this.buscarPlatillos(); 
  }

  buscarPlatillos() {
    this.servicioBuscarPlatillo().subscribe(
      (platillos: any) => {
        this.platillos = platillos;
  
        // Para cada platillo, busca el nombre del ingrediente
        this.platillos.forEach((platillo: any) => {
          platillo.ingredientePlatillos.forEach((ingPlatillo: any) => {
            this.buscarNombreIngrediente(ingPlatillo.ingredienteIdingrediente).subscribe(
              (ingrediente: any) => {
                // Asignar el nombre del ingrediente a la relación
                ingPlatillo.nombreIngrediente = ingrediente.nombre;
              }
            );
          });
        });
      }
    );
  }

  // Servicio para buscar el nombre del ingrediente por su ID
  buscarNombreIngrediente(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8081/ingrediente/buscar/${id}`);
  }

  servicioBuscarPlatillo(): Observable<any> {
    return this.http.get<any>("http://localhost:8081/platillo/buscar");
  }

  eliminarPlatillo(id: any) {
    console.log(id);
    this.servicioEliminaPlatillo(id).subscribe(
      (u: any) => this.validadEliminarPlatillo(u)
    );
  }

  servicioEliminaPlatillo(id: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.delete<any>("http://localhost:8081/platillo/eliminar/"+ id, httpOptions).pipe(
      catchError(e => "1")
    );
  }

  validadEliminarPlatillo(u: any) {
    console.log(u);
    alert("Platillo eliminado");
    location.href = "vistaPlatillo";
  }

  editarPlatillo(platillo: any) {
    localStorage.setItem("platillo", JSON.stringify(platillo));
    location.href = "editarPlatillo";
  }
}
