import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-ingredientes',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './lista-ingredientes.component.html',
  styleUrl: './lista-ingredientes.component.css'
})
export class ListaIngredientesComponent {

  ingredientes:any =[];
constructor(private http:HttpClient){
this.buscarIngredientes(); 
}
buscarIngredientes(){
  this.servicioBuscarIngredientes().subscribe(
    (u:any) => this.ingredientes = u
  )
}
servicioBuscarIngredientes(): Observable<any>{
  return this.http.get<any>("http://localhost:8081/ingrediente/buscar");
}
//Eliminar ingrediente
eliminarIngrediente(id:any){
  console.log(id)
this.servicioEliminarIngrediente(id).subscribe(
  (u:any) => this.validarIngredienteEliminado(u)
)
}
servicioEliminarIngrediente(id:any){
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  return this.http.delete<any>("http://localhost:8081/ingrediente/eliminar/" + id, httpOptions).pipe(
    catchError(e =>"1")
  )
}

validarIngredienteEliminado(u:any){
  console.log(u)
  alert("ingrediente eliminado con exito.")
  location.href="vistaIngrediente";
}
//Editar ingrediente
modificarIngrediente(ingrediente:any){
  localStorage.setItem("ingrediente", JSON.stringify(ingrediente))
  location.href="pantallaIngrediente";
}
}
