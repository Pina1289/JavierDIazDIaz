import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioLegeado } from './../../interfaces/UsuarioLogeado';
import { CuerpoUs } from './../../interfaces/CuerpoLogin';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL_LOGIN: string = 'https://dummyjson.com/auth/login';
  public usuarioLogeado: UsuarioLegeado | null = null;
  public accessToken: string | null = null;
  // Observador
  public $cargando = new BehaviorSubject<boolean>(false);
  public cargando = this.$cargando.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public iniciarSesion(nombre_usuario: string, contrasenia: string){
    const cuerpo: CuerpoUs = {
      username: nombre_usuario,
      password: contrasenia,
    }
  this.http.post<UsuarioLegeado>(this.URL_LOGIN, JSON.stringify(cuerpo), {
    headers: {
      'Content-type': 'application/json'
    }
  })
  .subscribe(resultado => {
    this.usuarioLogeado = resultado;
    this.accessToken = resultado.accessToken;
    console.log(resultado);
    this.router.navigate(['/', 'productos'])
  });
  }

  public cerrarSesion(){
    if(this.usuarioLogeado){
      this.usuarioLogeado = null;
      this.accessToken = null;
    }
  }
}
