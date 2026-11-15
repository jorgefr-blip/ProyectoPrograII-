import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-platillo',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './platillo.component.html',
  styleUrl: './platillo.component.css'
})
export class PlatilloComponent {
  platillos:any = [];
  ingrediente:any = [];
  platillo:any = {ingredientePlatillos:[]};
  constructor(private http:HttpClient){
    this.buscarPlatillos();
    this.buscarIngrediente();
  }

  buscarIngrediente(){
    this.servicioBuscarIngrediente().subscribe(
      (u:any) => this.ingrediente = u
    )
  }
  
  servicioBuscarIngrediente():Observable<any>{
    return this.http.get<any>("http://localhost:8081/ingrediente/buscar");
  
  }

agregarIngredientes(){
this.platillo.ingredientePlatillos.push({})

}

crearPlatillo(){
  let formularioValido:any = document.getElementById("PlatilloForm");
  if(formularioValido.reportValidity()){
    this.servicioLogin().subscribe(
      (u:any) => this.finalizarGuardar(u)
    )
  }
}
finalizarGuardar(u:any){
  if(u?.idplatillo){
    alert("Platillo creado con el id: "+u.idplatillo);
    this.platillo ={ingredientePlatillos:[]};
    this.buscarPlatillos();
  }

}


servicioLogin(){
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  return this.http.post(
    "http://localhost:8081/platillo/guardar",
    this.platillo,
    httpOptions
  );
}


buscarPlatillos(){
  this.servicioBuscarPlatillos().subscribe(
    (u:any) => this.platillos = u
  )
}

servicioBuscarPlatillos():Observable<any>{
  return this.http.get<any>("http://localhost:8081/platillo/buscar");

}


}