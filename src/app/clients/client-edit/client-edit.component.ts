import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../clients.model';
import { ClientsService } from '../clients.service';
import 'rxjs';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  client:Client[];

  editClientForm: FormGroup;

  imageData: string = '';

  clientid: string;


  constructor(private clService: ClientsService, private route: ActivatedRoute) { }
  

  ngOnInit(): void {

    this.editClientForm = new FormGroup({
      'fname': new FormControl(null, Validators.required),
      'lname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'plc': new FormControl(null, Validators.required),
      'dob': new FormControl(null),
      'image': new FormControl(null),
      'casedetails': new FormControl(null, Validators.required)
    });
    
    this.clientid = this.route.snapshot.params['id'];
    
    if(this.clientid) this.clService.getClient(this.clientid);

    this.clService.fetchClient.subscribe(
      (client) => {
        this.client = client;

        if(this.client[0].image){
          this.imageData = this.client[0].image.toString();
        }

        this.editClientForm.setValue({
          'fname': this.client[0].fname,
          'lname': this.client[0].lname,
          'email': this.client[0].email,
          'plc': this.client[0].plc,
          'dob': this.client[0].dob,
          'image': null,
          'casedetails': this.client[0].casedetails
        });
      }
    );
  }

  onFileSelected(event: Event){
    const file = (event.target as HTMLInputElement).files[0];

    this.editClientForm.patchValue({image: file});
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if(file && allowedTypes.includes(file.type)){
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      }

      reader.readAsDataURL(file);
    }else{
      alert('Unsupported image format');
      this.editClientForm.patchValue({'image': null});
      this.imageData = null;
    }
  }

  setDOB(event: Event){
    const dob = (<HTMLInputElement>event.target).value;
    this.editClientForm.patchValue({'dob': dob});
  }

  onSubmit(){
    if(this.editClientForm.valid){
      this.clService.updateClient(this.editClientForm.value, this.clientid);
      alert('Client Data Updated');
    }else{
      alert('Your information is not yet complete, please fill all required fields.');
    }
    
  }
}
