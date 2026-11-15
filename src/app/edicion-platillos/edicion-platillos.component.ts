import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-edicion-platillos',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './edicion-platillos.component.html',
  styleUrl: './edicion-platillos.component.css'
})
export class EdicionPlatillosComponent {
  ngOnInit(){
    this.platillo=localStorage.getItem("platillo")
    this.platillo= JSON.parse(this.platillo)
  }
platillo : any ={}
constructor(private http:HttpClient){

}

editarPlatillo(){
  let formularioValido:any = document.getElementById("platilloForm"); 
  if(formularioValido.reportValidity()){
    this.servicioEditarPlatillo().subscribe(
      (u:any) => this.validarEdicionPlatillo(u)
    )
  }
}
validarEdicionPlatillo(u:any){
  console.log(u)
  if(u !=null){
    alert("platillo editado exitosamente")
    location.href="vistaPlatillo"
  }
  else{
    alert("error")
  }
}

servicioEditarPlatillo(){
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }


console.log(this.platillo)
return this.http.post("http://localhost:8081/platillo/editar", this.platillo, httpOptions).pipe(
  catchError(e =>"1")
)
}
}
