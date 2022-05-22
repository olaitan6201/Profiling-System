import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from './clients.model';
import { ClientsService } from './clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClientsComponent implements OnInit {
  client: Client[] = [];

  clientid: string;

  constructor(private clService: ClientsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.clientid = this.route.snapshot.params['id'];
    
    if(this.clientid) this.clService.getClient(this.clientid);

    this.clService.fetchClient.subscribe(
      (client) => {
        this.client = client;
      }
    );
  }

}
