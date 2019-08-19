import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router) {
  }

  ngOnInit() {
    $.widget.bridge('uibutton', $.ui.button);

    this.router.navigate(['/acompanhamento']);
  }

  ngOnDestroy() {
  }

}
