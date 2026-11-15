import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-pantalla-noticia',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './pantalla-noticia.component.html',
  styleUrl: './pantalla-noticia.component.css'
})
export class PantallaNoticiaComponent {
  ngOnInit(){
    this.anuncio=localStorage.getItem("anuncio")
    this.anuncio= JSON.parse(this.anuncio)
  }
  anuncio:any = {}
  constructor(private http:HttpClient){
  }

  editarAnuncio(){

    let formularioValido:any = document.getElementById("anuncioForm");
    if(formularioValido.reportValidity()){
      this.servicioEditarAnuncio().subscribe(
        (u:any) => this.validarEditarAnuncio(u)
      )
    }
  }

  validarEditarAnuncio(u:any){
    console.log(u)
    if(u != null){
      alert("Anuncio editado exitosamente")
      location.href="vistaAnuncio";
    }
    else{
      alert("Error")
    }

  }

  servicioEditarAnuncio(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }


    console.log(this.anuncio)
    return this.http.post<any>("http://localhost:8081/noticia/editar",this.anuncio, httpOptions).pipe(
      catchError(e => "1")
    )
  }
}
