import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-pantalla-ingredinetes',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './pantalla-ingredinetes.component.html',
  styleUrl: './pantalla-ingredinetes.component.css'
})
export class PantallaIngredinetesComponent {
ngOInit(){
this.ingrediente=localStorage.getItem("ingrediente")
  this.ingrediente = JSON.parse(this.ingrediente)
}
ingrediente:any = {}
constructor(private http:HttpClient){
}

editarIngrediente(){

  let formularioValido:any = document.getElementById("ingredienteForm");
  if(formularioValido.reportValidity()){
    this.servicioEditarIngrediente().subscribe(
      (u:any) => this.validarEditarIngrediente(u)
    )
  }
}
validarEditarIngrediente(u:any){
  console.log(u)
  if(u != null){
      alert("ingrediente editado exitosamente")
      location.href="vistaIngrediente";
  }
  else{
    alert("error")
  }
}
servicioEditarIngrediente(){
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  console.log(this.ingrediente)
  return this.http.post<any>("http://localhost:8081/ingrediente/editar",this.ingrediente, httpOptions).pipe(
    catchError(e => "1")
  )
}
}
