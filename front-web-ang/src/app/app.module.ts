import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './customers/customers.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppHttpInterceptor } from './services/app-http.interceptor';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { CustomerTemplateComponent } from './customer-template/customer-template.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { LoadImageComponent } from './load-image/load-image.component';
import { AppBannerMain } from './app-banner-main/app-banner-main.component';
import { AppChooseUs } from './app-choose-us/app-choose-us.component';
import { AppTestimonial } from './app-testimonial/app-testimonial.component';
import { AppFooter } from './app-footer/app-footer.component';
import { AppContactUs } from './app-contact-us/app-contact-us.component';
import { StaticSectionsComponent } from './static-sections/static-sections.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CarsComponent } from './cars/cars.component';
import { AddCardComponent } from './add-card/add-card.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { ShowCardComponent } from './show-card/show-card.component';
import { CarComponent } from './car/car.component';
import { CarInfoComponent } from './car-info/car-info.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ShowCustomerComponent } from './show-customer/show-customer.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { ShowOrderComponent } from './orders/show-order/show-order.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomersComponent,
    AppNavbarComponent,
    ProfileComponent,
    CustomerTemplateComponent,
    NewCustomerComponent,
    NotAuthorizedComponent,
    LoadImageComponent,
    AppBannerMain,
    AppChooseUs,
    AppTestimonial,
    AppFooter,
    AppContactUs,
    StaticSectionsComponent,
    AboutUsComponent,
    CarsComponent,
    AddCardComponent,
    EditCardComponent,
    ShowCardComponent,
    CarComponent,
    CarInfoComponent,
    EditCustomerComponent,
    ShowCustomerComponent,
    OrdersComponent,
    ShowOrderComponent,
    AddOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
