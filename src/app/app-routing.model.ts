import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientEditComponent } from './clients/client-edit/client-edit.component';
import { ClientViewComponent } from './clients/client-view/client-view.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientAddComponent } from './clients/client-add/client-add.component';

const appRoutes: Routes = [
	{ path: 'clients', component: ClientsComponent, children: [
		{ path: 'add', component: ClientAddComponent },
		{ path: 'edit/:id', component: ClientEditComponent },
		{ path: 'view/:id', component: ClientViewComponent },
		{ path: 'list', component: ClientListComponent }
	]},
	{ path: 'not-found', component: PageNotFoundComponent },
	{ path: '', redirectTo: '/clients/add', pathMatch:'full' },
	{ path: '**', redirectTo: '/not-found'}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule{

}