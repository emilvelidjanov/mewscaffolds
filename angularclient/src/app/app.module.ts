import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MewDataListComponent } from './component/mew-data-list/mew-data-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TextConfig } from './config/text-config/text-config';
import { MewDataService } from './service/mew-data/mew-data.service';
import { MewDataFormComponent } from './component/mew-data-form/mew-data-form.component';
import { MewDataChartComponent } from './component/mew-data-chart/mew-data-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MewDataListComponent,
    MewDataFormComponent,
    MewDataChartComponent,
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
