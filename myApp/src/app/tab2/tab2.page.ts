import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  platillos: any = [];
  ingrediente: any = [];
  usuario : any = {}
  constructor(private http: HttpClient) {
    this.buscarPlatillos(); 
    this.BuscarUsuario();
  }
  
  BuscarUsuario(){
    this.usuario = localStorage.getItem("usuario")
    this.usuario = JSON.parse(this.usuario)
    console.log(this.usuario);
  }
  buscarPlatillos() {

    this.servicioBuscarPlatillo().subscribe(
      (platillos: any) => {
        this.platillos = platillos;
  
        // Para cada platillo, busca el nombre del ingrediente
        this.platillos.forEach((platillo: any) => {
          platillo.ingredientePlatillos.forEach((ingPlatillo: any) => {
            this.buscarNombreIngrediente(ingPlatillo.ingredienteIdingrediente).subscribe(
              (ingrediente: any) => {
                // Asignar el nombre del ingrediente a la relación
                ingPlatillo.nombreIngrediente = ingrediente.nombre;
              }
            );
          });
        });
      }
    );
  }
// Servicio para buscar el nombre del ingrediente por su ID
  buscarNombreIngrediente(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8081/ingrediente/buscar/${id}`);
  }
  servicioBuscarPlatillo(): Observable<any> {
    return this.http.get<any>("http://localhost:8081/platillo/buscar");
  }

  enviarPlatillo(platillo:any){
    console.log(platillo);
    let pedido:any = {}
    const fecha = new Date()

    pedido.fechaHora = fecha.getTime()
    pedido.total = platillo.precio
    pedido.usuarioCorreo = this.usuario.correo
    pedido.estado = 2
    
    console.log(pedido)
    this.guardarPedido(pedido).subscribe(
      (respuesta : any) => {
        console.log("Se guardo pedido")
      }
    )
  }
  guardarPedido(pedido : any ): Observable<any> {
    return this.http.post<any>("http://localhost:8081/pedido/guardar", pedido);
  }
}
