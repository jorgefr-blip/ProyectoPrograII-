import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, MenuComponent],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {
  usuarios:any = [];
  constructor(private http:HttpClient){
    this.buscarUsuarios();

  }

  buscarUsuarios(){
    this.servicioBuscarUsuarios().subscribe(
      (u:any) => this.usuarios = u
    )
  }

  servicioBuscarUsuarios():Observable<any>{
    return this.http.get<any>("http://localhost:8081/usuario/buscar");

  }
}