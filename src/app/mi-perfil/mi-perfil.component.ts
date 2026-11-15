import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FormsModule } from '@angular/forms';
import { TiposAdminPipe } from '../tipos-admin.pipe';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [MenuComponent, FormsModule, HttpClientModule , TiposAdminPipe],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent {
  adminitrador:any = {};
  tipoAdmin = [];
  
constructor(private http:HttpClient){
  this.buscarTipos();
  let u:any = localStorage.getItem("usuario");
  this.adminitrador = JSON.parse(u);

  console.log(this.adminitrador);
}
buscarTipos(){
  this.servicioBuscarTipos().subscribe(
    (u:any) => this.tipoAdmin = u
  )
}
servicioBuscarTipos():Observable<any>{
  return this.http.get<any>("http://localhost:8081/tipoAdministrador/buscar");

}
}

