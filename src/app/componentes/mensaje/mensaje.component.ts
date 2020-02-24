import { Component, OnInit, Input } from '@angular/core';
import { Mensaje } from 'src/app/model/mensaje';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.scss']
})
export class MensajeComponent implements OnInit {

  @Input() mensaje: Mensaje;

  constructor() {

  }// constructor()

  ngOnInit() {
  }//  ngOnInit()

}
