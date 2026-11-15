import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  tipo : any ={}

  constructor(private http:HttpClient) { }

  ngOnInit() {}

  agregarfoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.tipo.imagen = reader.result as string; // Convertimos el resultado a string para base64
      };
      reader.onerror = (error) => {
        console.error('Error al leer el archivo: ', error); // Manejo de errores
      };
      reader.readAsDataURL(file); // Leemos el archivo como base64
    } else {
      console.warn('No se seleccionó un archivo'); // Opcional: manejo si no se seleccionó archivo
    }
  }

  creaProducto(){
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
      alert("tipo guardado exitosamente")
      this.tipo = {}
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

    console.log(this.tipo)
    return this.http.post<any>("http://localhost:8081/TipoUsuario/guardar",this.tipo, httpOptions).pipe(
      catchError(e => "1")
    )
  }

}
