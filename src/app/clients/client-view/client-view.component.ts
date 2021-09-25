import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../clients.model';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})
export class ClientViewComponent implements OnInit {
  client: Client[] = [];

  clientid: string;

  constructor(private clService: ClientsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.clientid = this.route.snapshot.params['id'];
    
    this.clService.getClient(this.clientid);

    this.clService.fetchClient.subscribe(
      (client) => {
        this.client = client;
      }
    );
  }

}
