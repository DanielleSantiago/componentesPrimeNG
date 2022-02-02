import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'componentesPrimeNG';

  items: MenuItem[] = [];

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.items = [
      {
        label: 'File',
        items: [{
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                items: [
                    {label: 'Project'},
                    {label: 'Other'},
                ]
              }]
      }
    ]
  }
}
