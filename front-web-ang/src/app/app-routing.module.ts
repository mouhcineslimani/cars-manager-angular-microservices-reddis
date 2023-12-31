import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers-service/customers/customers.component';
import { LoginComponent } from './comoponents/login/login.component';
import { ProfileComponent } from './comoponents/profile/profile.component';
import { CustomerTemplateComponent } from './customers-service/customer-template/customer-template.component';
import { AuthGuard } from './guards/auth.guard';
import { NewCustomerComponent } from './customers-service/new-customer/new-customer.component';
import { AdminGuard } from './guards/admin.guard';
import { NotAuthorizedComponent } from './comoponents/not-authorized/not-authorized.component';
import { StaticSectionsComponent } from './static-sections/static-sections.component';
import { AboutUsComponent } from './comoponents/about-us/about-us.component';
import { AppContactUs } from './comoponents/app-contact-us/app-contact-us.component';
import { CarsComponent } from './cars-service/cars/cars.component';
import { EditCardComponent } from './cars-service/edit-card/edit-card.component';
import { ShowCardComponent } from './cars-service/show-card/show-card.component';
import { AddCardComponent } from './cars-service/add-card/add-card.component';
import { CarInfoComponent } from './cars-service/car-info/car-info.component';
import { EditCustomerComponent } from './customers-service/edit-customer/edit-customer.component';
import { ShowCustomerComponent } from './customers-service/show-customer/show-customer.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { ShowOrderComponent } from './orders/show-order/show-order.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { NotFoundComponent } from './comoponents/not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact-us', component: AppContactUs },
  {
    path: 'admin',
    component: CustomerTemplateComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'customers',
        component: CustomersComponent,
        data: { requiresAdmin: true },
        canActivateChild: [AdminGuard],
      },
      { path: 'customer/add', component: NewCustomerComponent },
      { path: 'customer/edit/:id', component: EditCustomerComponent },
      { path: 'customer/show/:id', component: ShowCustomerComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'cars', component: CarsComponent },
      { path: 'car/edit/:id', component: EditCardComponent },
      { path: 'car/add', component: AddCardComponent },
      { path: 'car/show/:id', component: ShowCardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'order/add', component: AddOrderComponent },
      { path: 'order/show/:id', component: ShowOrderComponent },
      { path: 'notAuthorized', component: NotAuthorizedComponent },
    ],
  },
  { path: 'car/show/:id', component: CarInfoComponent },
  { path: 'home', component: StaticSectionsComponent },
  { path: 'notFound', component: NotFoundComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
