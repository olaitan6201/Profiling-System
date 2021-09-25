import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from '../clients.model';
import { ClientsService } from '../clients.service';
import 'rxjs';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  submitAction:string = '';

  clients: Client[];

  searchForm: FormGroup;

  @ViewChild('search') searchOption: ElementRef;

  constructor(private clService: ClientsService) {
    
  }

  ngOnInit(){
    this.clService.getClientsByAPI();
    // this.clients = this.clService.getClients();
    this.clService.addToClients.subscribe(
      (clients) => {
        this.clients = clients;
      }
    )

   

    this.searchForm = new FormGroup({
      'search': new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    // console.log(this.searchForm.value.search);
    const searchvalue:string = this.searchForm.value.search
    this.clients = this.clService.filterClients(searchvalue);
    this.searchForm.setValue({
      search: ''
    })
  }

  reloadTable(){
    this.clients = this.clService.getClients();
  }


}
