import { Component, OnInit } from '@angular/core';
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

  cols: any[] = [];

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

  }

}
