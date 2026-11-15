import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface TipoUsuario {
  idtipoUsuario: number;
  descripcion: string;
  imagen: string;
}

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  tipos: TipoUsuario[] = []; // Array para almacenar los tipos de usuario
  usuario = {
    tipoUsuario: null, // Aquí se guardará el ID seleccionado en el combo
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.buscarTiposUsuario(); // Llama al servicio al iniciar el componente
  }

  buscarTiposUsuario() {
    this.servicioBuscarTiposUsuario().subscribe((data: TipoUsuario[]) => {
      this.tipos = data; // Llena el array con los datos recibidos
    });
  }

  servicioBuscarTiposUsuario(): Observable<TipoUsuario[]> {
    return this.http.get<TipoUsuario[]>('http://localhost:8081/TipoUsuario/buscar');
  }
}
