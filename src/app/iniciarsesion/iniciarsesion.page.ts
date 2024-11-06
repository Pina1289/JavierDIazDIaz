import { Component } from '@angular/core';
import { ViewWillEnter, ViewDidLeave } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.page.html',
  styleUrls: ['./iniciarsesion.page.scss'],
})
export class IniciarsesionPage implements ViewWillEnter, ViewDidLeave{
  public formulario!: FormGroup;
  public cargando_bloqueo: boolean = false;
  public subCargando!: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { 
    this.formulario = fb.group({
      usuario: ['', [Validators.required]],
      contrasenia: ['', [Validators.required]]
    })
   }
  
  public validarFormulario(){
    const esValido = this.formulario.valid;
    if(!esValido){
      return
    }
    const datos = this.formulario.getRawValue();
    const usuario = datos['usuario'];
    const constrasenia = datos['contrasenia'];
    this.auth.iniciarSesion(usuario, constrasenia);
  }


  ionViewWillEnter(): void {
    this.subCargando = this.auth.cargando.subscribe(nuevoValor => {
      this.cargando_bloqueo = nuevoValor;
    })
  }

  ionViewDidLeave(): void {
    if(this.subCargando){
      this.subCargando.unsubscribe();
    }
  }

}
