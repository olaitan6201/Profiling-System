import { Injectable, OnInit } from "@angular/core";
import { HttpClient , HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Client } from "./clients.model";
import { Subject } from "rxjs";

@Injectable()
export class ClientsService implements OnInit {
    clients: Client[] = [];

    client: Client[] = [];

    addToClients = new Subject<Client[]>();

    fetchClient = new Subject<Client[]>();

    constructor(private http: HttpClient){}

    ngOnInit(): void {
        this.getClientsByAPI();
    }

    getClients(){
        return this.clients.slice();
    }

    getClient(id:string){
        this.http.get<{message: string, clients: Client[]}>('https://profiling-system-api.herokuapp.com/api/clients/fetch/'+id)
        .subscribe(
            (clientData) => {
                this.client = clientData.clients;
                this.fetchClient.next([...this.client]);
            }
        );
    }

    filterClients(value:string){
        const filteredClients: Client[] = [];

        for(let client of this.clients){
            if(client.lname === value){
                filteredClients.push(client);
            }
        }

        return filteredClients;
    }


    getClientsByAPI(){
        this.http.get<{message: string, clients: Client[]}>('https://profiling-system-api.herokuapp.com/api/clients/fetch')
        .subscribe(
            (clientData) => {
                this.clients = clientData.clients;
                this.addToClients.next([...this.clients]);
            }
        );
        
    }

    // addClient(newClient){
    //     var headers = new HttpHeaders();

    //     headers.append('Content-Type', 'application-json');

    //     return this.http.post('https://profiling-system-api.herokuapp.com/api/clients/add', newClient, {headers: headers})
    //     .map((res: Response) => res.json());
    // }

    deleteClient(id){
        return this.http.delete('https://profiling-system-api.herokuapp.com/api/clients/delete/'+id)
        .map((res: Response) => res.json());
    }

    addClient(client: Client){
        const clientData = new FormData();

        clientData.append("fname", client.fname);
        clientData.append("lname", client.lname);
        clientData.append("email", client.email);
        clientData.append("datec", client.datec);
        clientData.append("dob", client.dob);
        clientData.append("plc", client.plc);
        clientData.append("casedetails", client.casedetails);

        if(client.image){
            clientData.append("image", client.image);
            this.http.post<{msg: string, client: Client}>("https://profiling-system-api.herokuapp.com/api/clients/add/image", clientData)
            .subscribe(
                (clientData) => {
                    const client: Client = {
                        _id: clientData.client._id,
                        fname: clientData.client.fname,
                        lname: clientData.client.lname,
                        email: clientData.client.email,
                        dob: clientData.client.dob,
                        datec: clientData.client.datec,
                        casedetails: clientData.client.casedetails,
                        plc: clientData.client.plc,
                        image: clientData.client.image
                    }
                    this.clients.push(client);
                    this.addToClients.next([...this.clients]);
                }
            );
        }else{
            this.http.post<{msg: string, client: Client}>("https://profiling-system-api.herokuapp.com/api/clients/add", client)
            .subscribe(
                (clientData) => {
                    const client: Client = {
                        _id: clientData.client._id,
                        fname: clientData.client.fname,
                        lname: clientData.client.lname,
                        email: clientData.client.email,
                        dob: clientData.client.dob,
                        datec: clientData.client.datec,
                        casedetails: clientData.client.casedetails,
                        plc: clientData.client.plc,
                        image: clientData.client.image
                    }
                    this.clients.push(client);
                    this.addToClients.next([...this.clients]);
                }
            );
        }
    }



    updateClient(client: Client, id: string): any{
        const clientData = new FormData();

        clientData.append("fname", client.fname);
        clientData.append("lname", client.lname);
        clientData.append("email", client.email);
        clientData.append("dob", client.dob);
        clientData.append("plc", client.plc);
        clientData.append("casedetails", client.casedetails);

        if(client.image){
            clientData.append("image", client.image);
            this.http.put<{msg: string, client: Client}>("https://profiling-system-api.herokuapp.com/api/clients/updateWithImage/"+id, clientData)
            .subscribe(
                (clientData) => {
                    if(clientData.msg === 'success'){
                        return 'success';
                    }else{
                        return 'failed';
                    }
                }
            );
        }else{
            this.http.put<{msg: string, client: Client}>("https://profiling-system-api.herokuapp.com/api/clients/update/"+id, client)
            .subscribe(
                (clientData) => {
                    if(clientData.msg === 'success'){
                        return 'success';
                    }else{
                        return 'failed';
                    }
                }
            );
        }
    }

    getDate(){
        const today = new Date().toDateString();
        return today;
      }

}