import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TokenListComponent } from './component/token-list/token-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TextConfig } from './config/text-config/text-config';
import { MewDataService } from './service/mewdata/mewdata.service';
import { TokenFormComponent } from './component/token-form/token-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TokenListComponent,
    TokenFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
  ],
  providers: [MewDataService, TextConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
