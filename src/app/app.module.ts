import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AppRoutingModule } from './app-routing.model'; 
import { AngularFileUploaderModule } from "angular-file-uploader";

import { HeaderComponent } from './header/header.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientEditComponent } from './clients/client-edit/client-edit.component';
import { ClientViewComponent } from './clients/client-view/client-view.component';
import { ClientAddComponent } from './clients/client-add/client-add.component';
import { ClientsService } from './clients/clients.service';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    ClientsComponent,
    ClientListComponent,
    ClientEditComponent,
    ClientViewComponent,
    ClientAddComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFileUploaderModule
  ],
  providers: [ClientsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
