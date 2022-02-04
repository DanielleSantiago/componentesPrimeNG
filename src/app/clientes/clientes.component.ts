import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api'
import { Cliente } from './model/cliente';
import { ClientesService } from './service/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  providers: [MessageService],
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  displayBasic: boolean = false;

  selectedCities: string[] = [];

  cols: any[] = [];


  selectedClients: Cliente[] = [];
  _selectedClients: any[] = [];
  clonedClients: { [s: string]: Cliente; } = {};

  constructor(private clientesService: ClientesService, private messageService: MessageService) {}


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

  onRowEditInit(cliente: Cliente) {
    this.clonedClients[cliente.nome] = {...cliente};
  }

  onRowEditSave(cliente: Cliente) {
      if (cliente.idade > 0) {
          delete this.clonedClients[cliente.nome];
          this.messageService.add({severity:'success', summary: 'Success', detail:'Cliente editado com sucesso!'});
      }
      else {
          this.messageService.add({severity:'error', summary: 'Error', detail:'Idade precisa ser informada.'});
      }
  }

  onRowEditCancel(cliente: Cliente, index: number) {
      this.clientes[index] = this.clonedClients[cliente.nome];
      delete this.clonedClients[cliente.nome];
  }


}
