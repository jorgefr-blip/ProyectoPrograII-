import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-examen',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './examen.component.html',
  styleUrl: './examen.component.css'
})
export class ExamenComponent {

examen : any = {

}
constructor (private http: HttpClient){

}
consultaExamen(){
  let formularioValido:any = document.getElementById("examenForm");
    if(formularioValido.reportValidity()){
      this.servicioConsultaExamen().subscribe(
        (u:any) => this.validarConsulta(u)
      )
    }
  }
    validarConsulta(u:any){
      console.log(u)
      if(u != null){
        alert("examen consultado exitosamente")
        location.href="vistaAnuncio";
      }
      else{
        alert("datos incorrectos.")
      }
      
  }

  servicioConsultaExamen(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    console.log(this.examen)
    return this.http.post<any>("http://localhost:8081/examen/buscar",this.examen, httpOptions).pipe(
      catchError(e => "1")
    )
  }

}


