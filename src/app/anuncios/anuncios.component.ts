import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-anuncios',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './anuncios.component.html',
  styleUrl: './anuncios.component.css'
})
export class AnunciosComponent {

  anuncio:any = {}

  constructor(private http:HttpClient){

  }

  agregarfoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.anuncio.imagen = reader.result as string; // Convertimos el resultado a string para base64
      };
      reader.onerror = (error) => {
        console.error('Error al leer el archivo: ', error); // Manejo de errores
      };
      reader.readAsDataURL(file); // Leemos el archivo como base64
    } else {
      console.warn('No se seleccionó un archivo'); // Opcional: manejo si no se seleccionó archivo
    }
  }
  
  creaAnuncio(){

    let formularioValido:any = document.getElementById("anuncioForm");
    if(formularioValido.reportValidity()){
      this.servicioCreaAnuncio().subscribe(
        (u:any) => this.validarCreaAnuncio(u)
      )
    }
  }


  validarCreaAnuncio(u:any){
    console.log(u)
    if(u != null){
      alert("Anuncio guardado exitosamente")
      this.anuncio = {}
    }
    else{
      alert("Error")
    }
  }

  servicioCreaAnuncio(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }


    console.log(this.anuncio)
    return this.http.post<any>("http://localhost:8081/noticia/guardar",this.anuncio, httpOptions).pipe(
      catchError(e => "1")
    )
  }


  
}
