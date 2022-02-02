import { Cliente } from './../model/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly API = '/assets/clientes.json'
  constructor(private httpClient: HttpClient) { }

  listClients() {
    return this.httpClient.get<Cliente[]>(this.API)
    .pipe(
      first(),
      tap(clientes => console.log(clientes))
    )
  }
}
