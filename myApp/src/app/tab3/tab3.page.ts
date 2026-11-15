import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  usuario : any = {}
  pedidos:any = []
totalPagar: number = 0;
  constructor(private http: HttpClient) {
    this.BuscarUsuario();
  }

  BuscarUsuario(){
    this.usuario = localStorage.getItem("usuario")
    this.usuario = JSON.parse(this.usuario)
    console.log(this.usuario);
    
    this.buscarPedidos(); 
  }

  buscarPedidos() {

    this.servicioBuscarPedidos().subscribe(
      (pedidos: any) => {
        console.log(pedidos);
        this.pedidos = pedidos
        
      }
    );
  }
  calcularTotal(){
    this.totalPagar = this.pedidos.reduce((total: any, pedido: any)=> total + this.pedidos.total,0) 
  }

  servicioBuscarPedidos(): Observable<any> {
    return this.http.get<any>("http://localhost:8081/pedido/buscar/" + this.usuario.correo);
  }
}
