import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { ApplicationsComponent } from './applications/applications.component';
import { UserModalComponent } from './components/user-modal.component';
import { CurrencyFormatterDirective } from './directives/currency-formatter.directive';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ApplicationsComponent,
    CreateApplicationComponent,
    UserModalComponent,
    CurrencyFormatterDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    CurrencyMaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
