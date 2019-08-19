import { Component, OnInit } from '@angular/core';

declare var $: any;


@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {
  situacao: number;
  constructor() { }

  ngOnInit() {
    $.widget.bridge('uibutton', $.ui.button);
  }

}
