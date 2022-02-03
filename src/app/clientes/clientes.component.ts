import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api'
import { Cliente } from './model/cliente';
import { ClientesService } from './service/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  displayBasic: boolean = false;

  selectedCities: string[] = [];

  cols: any[] = [];

  selectedClients: Cliente[] = [];
  _selectedClients: any[] = [];

  constructor(private clientesService: ClientesService) {}


  ngOnInit(): void {
    this.clientesService.listClients()
    .subscribe(resposta => {
      this.clientes = resposta;
    })

    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'idade', header: 'Idade' },
      { field: 'genero', header: 'Gênero' }
    ];

    this._selectedClients = this.cols;
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedClients;
  }

  set selectedColumns(val: any[]) {
      //restore original order
      this._selectedClients = this.cols.filter(col => val.includes(col));
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

}
