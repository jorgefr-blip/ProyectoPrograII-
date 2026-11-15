import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-tipos-lista',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './tipos-lista.component.html',
  styleUrl: './tipos-lista.component.css'
})
export class TiposListaComponent {

tipos:any =[];
  constructor(private http:HttpClient){
    this.buscarTipos();
  }

  buscarTipos(){
    this.servicioBuscarTipos().subscribe(
      (u:any) => this.tipos = u
    )
  }
  servicioBuscarTipos():Observable<any>{
    return this.http.get<any>("http://localhost:8081/tipoAdministrador/buscar");

  }
}
