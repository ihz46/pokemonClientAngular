import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //Creamos el usuario
  usuario: Usuario;
  formulario: any;


  constructor(private builder: FormBuilder, private usuarioService: UsuarioService, private router: Router) {

  }//constructor

  ngOnInit() {

  }//ngOnInit

  enviar(values: any) {

  }
}
