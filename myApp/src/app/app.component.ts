import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  sesionIniciada: boolean = false; 
  creacionCuenta: boolean = false;
  usuario: any = {};

  constructor(private http: HttpClient) {
   let u = localStorage.getItem("usuario");
if (u) {
  this.sesionIniciada = true;
}
  }

  crearCuenta() {
    this.creacionCuenta = !this.creacionCuenta;
  }

  crearCuentaUsuario() {
    if (this.usuario.password && this.usuario.correo && this.usuario.nombre && this.usuario.apellido && this.usuario.nit
      && this.usuario.fechaRegistro && this.usuario.edad) {  
      this.usuario.fechaRegistro = new Date();
      this.crearUsuario().subscribe(
        (u: any) => this.finalizarGuardar(u)
      );
    } else {
      alert("Información no ingresada");
    }
  }

  finalizarGuardar(u: any) {
    if (u?.idusuario) {
      alert("Cuenta creada con el ID: " + u.idusuario);
      this.usuario = {}; // Limpiar campos después de crear cuenta
      this.creacionCuenta = false;
    }
  }

  crearUsuario() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(
      "http://localhost:8081/usuario/guardar",
      this.usuario,
      httpOptions
    );
  }

  login() {
    if (this.usuario.password && this.usuario.correo) {    
      this.servicioLogin().subscribe(
        (u: any) => this.validarLogin(u)
      );
    } else {
      alert("Usuario o password incorrecto");
    }
  }

  validarLogin(u: any) {
    console.log(u);
    if (u != null) {
      this.sesionIniciada = true;
      let t = JSON.stringify(u);
      localStorage.setItem("usuario", t);
      this.usuario = {}; // Limpiar campos después del login exitoso
    } else {
      alert("Usuario o password inválido.");
      this.usuario.password = ''; // Limpiar solo la contraseña
    }
  }

  servicioLogin() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post("http://localhost:8081/usuario/login",
      this.usuario, 
      httpOptions
    );
  }
}
