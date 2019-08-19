import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { LeftMenuComponent } from './layout/left-menu/left-menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RightMenuComponent } from './layout/right-menu/right-menu.component';
import { MainComponent } from './main/main.component';
import { AdminModule } from './admin/admin.module';
import { ContratoService } from './services/contrato.service';

@NgModule({
  declarations: [
    AppComponent,

    MainComponent,
    HeaderComponent,
    LeftMenuComponent,
    RightMenuComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AdminModule
  ],
  providers: [
    ContratoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
