import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  title = 'pokemonClientAngularApp';

  ngOnInit(): void {
    console.debug(environment.ENDPOINT)
  }
}
