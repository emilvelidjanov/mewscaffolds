import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TokenListComponent } from './component/token-list/token-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TextConfig } from './config/text-config/text-config';
import { PrintService } from './service/print-service/print.service';

@NgModule({
  declarations: [
    AppComponent,
    TokenListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
  ],
  providers: [PrintService, TextConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
