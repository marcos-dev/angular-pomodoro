import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mute: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  //Turn on sound or mute
  switchSound(){
    //TODO: Ativar ou desativar alarme
    this.mute = !this.mute;
  }
}
