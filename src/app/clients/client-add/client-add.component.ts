import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  addClientForm: FormGroup;

  imageData: string;

  today = this.clService.getDate();

  constructor(private clService: ClientsService) { }

  ngOnInit(): void {
    this.addClientForm = new FormGroup({
      'fname': new FormControl(null, Validators.required),
      'lname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'datec': new FormControl(new Date().toDateString(), Validators.required),
      'plc': new FormControl(null, Validators.required),
      'dob': new FormControl(null),
      'image': new FormControl(null),
      'casedetails': new FormControl(null, Validators.required)
    });

    // console.log(this.getDate());
  }

  onFileSelected(event: Event){
    const file = (event.target as HTMLInputElement).files[0];

    this.addClientForm.patchValue({image: file});
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if(file && allowedTypes.includes(file.type)){
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      }

      reader.readAsDataURL(file);
    }else{
      alert('Unsupported image format');
      this.addClientForm.patchValue({'image': null});
      this.imageData = null;
    }
  }

  setDOB(event: Event){
    const dob = (<HTMLInputElement>event.target).value;
    this.addClientForm.patchValue({'dob': dob});
  }

  onSubmit(){
    if(this.addClientForm.valid){
      this.clService.addClient(this.addClientForm.value);
      alert('Client profiled');
      this.addClientForm.reset();
      this.imageData = '';
    }else{
      alert('Your information is not yet complete, please fill all required fields.');
    }
    // console.log(this.addClientForm.valid);
    
  }

  


  // afuConfig = {
  //   formatsAllowed: ".jpg,.png",
  //   uploadAPI: {
  //     url:"https://localhost:3000/images"
  //   }
  // };
}
