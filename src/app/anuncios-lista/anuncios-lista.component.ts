import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-anuncios-lista',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './anuncios-lista.component.html',
  styleUrl: './anuncios-lista.component.css'
})
export class AnunciosListaComponent {

noticias: any = []; 

  constructor(private http:HttpClient){
    this.buscarNoticias();
  }

  buscarNoticias(){
    this.servicioBuscarNoticias().subscribe(
      (u:any) => this.noticias = u
    )
  }

  servicioBuscarNoticias():Observable<any>{
    return this.http.get<any>("http://localhost:8081/noticia/buscar");
  }

  //Eliminar noticia
  eliminarNoticia(id:any){
    console.log(id)

    this.servicioEliminaAnuncio(id).subscribe(
      (u:any) => this.validarEliminaAnuncio(u)
    )
  }

  servicioEliminaAnuncio(id:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }

    return this.http.delete<any>("http://localhost:8081/noticia/eliminar/" + id, httpOptions).pipe(
      catchError(e => "1")
    )
  }

  validarEliminaAnuncio(u:any){
    console.log(u)
    alert("Noticia eliminado exitosamente")
    location.href="vistaAnuncio";
  }

  //Modificar noticia
  modificarNoticia(noticia:any){
    localStorage.setItem("anuncio", JSON.stringify(noticia))
    location.href="pantallaNoticia";
  }
}