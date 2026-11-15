import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  adminitrador:any = {};

  constructor(private http:HttpClient){

    let usuario = localStorage.getItem("usuario");
    if (usuario){
      location.href="welcome";
    }
  }

  login(){
    let formularioValido:any = document.getElementById("loginForm");
    if(formularioValido.reportValidity()){
      this.servicioLogin().subscribe(
        (u:any) => this.validarLogin(u)
      )
      
    }
  }

validarLogin(u:any){
  console.log(u)
  if(u != null){
    //alert("OK")
    location.href="welcome";
    let t = JSON.stringify(u);
    localStorage.setItem("usuario", t);
  }
  else{
    alert("Usuario o password invalido.")
  }
  this.adminitrador = {}; //limpia el campo de usuario
}

  servicioLogin(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    
    console.log(this.adminitrador)
    return this.http.post<any>("http://localhost:8081/administrador/loginAdmin",this.adminitrador, httpOptions).pipe(
      catchError(e => "1")
    )
  }
}
