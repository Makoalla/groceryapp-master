import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CustomerService } from './customer.service';
import { HttpClientModule } from '@angular/common/http';
import { NewCustomerFormComponent } from './new-customer-form/new-customer-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [ {
  path: '',                     //default component to display
   component: ListCustomersComponent
 },       {
   path: 'addCustomer',         //when students added 
   component: NewCustomerFormComponent
 },       {
   path: 'editCustomer/:_id',         //when students edited 
   component: NewCustomerFormComponent
 },       {
   path: 'listCustomers',       //when students listed
   component: ListCustomersComponent
 },       {
   path: '**',                 //when path cannot be found
   component: NotFoundComponent
 }
];

@NgModule({
  declarations: [
    AppComponent,
    NewCustomerFormComponent,
    NavigationMenuComponent,
    ListCustomersComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
