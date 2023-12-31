import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './comoponents/login/login.component';
import { CustomersComponent } from './customers-service/customers/customers.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppHttpInterceptor } from './services/app-http.interceptor';
import { AppNavbarComponent } from './comoponents/app-navbar/app-navbar.component';
import { ProfileComponent } from './comoponents/profile/profile.component';
import { CustomerTemplateComponent } from './customers-service/customer-template/customer-template.component';
import { NewCustomerComponent } from './customers-service/new-customer/new-customer.component';
import { NotAuthorizedComponent } from './comoponents/not-authorized/not-authorized.component';
import { LoadImageComponent } from './comoponents/load-image/load-image.component';
import { AppBannerMain } from './comoponents/app-banner-main/app-banner-main.component';
import { AppChooseUs } from './comoponents/app-choose-us/app-choose-us.component';
import { AppTestimonial } from './comoponents/app-testimonial/app-testimonial.component';
import { AppFooter } from './comoponents/app-footer/app-footer.component';
import { AppContactUs } from './comoponents/app-contact-us/app-contact-us.component';
import { StaticSectionsComponent } from './static-sections/static-sections.component';
import { AboutUsComponent } from './comoponents/about-us/about-us.component';
import { CarsComponent } from './cars-service/cars/cars.component';
import { AddCardComponent } from './cars-service/add-card/add-card.component';
import { EditCardComponent } from './cars-service/edit-card/edit-card.component';
import { ShowCardComponent } from './cars-service/show-card/show-card.component';
import { CarComponent } from './cars-service/car/car.component';
import { CarInfoComponent } from './cars-service/car-info/car-info.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditCustomerComponent } from './customers-service/edit-customer/edit-customer.component';
import { ShowCustomerComponent } from './customers-service/show-customer/show-customer.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { ShowOrderComponent } from './orders/show-order/show-order.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { NotFoundComponent } from './comoponents/not-found/not-found.component';

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
    NotFoundComponent,
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
