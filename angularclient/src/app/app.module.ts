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
import { ChartsModule } from 'ng2-charts';
import { SettingsModalComponent } from './component/settings-modal/settings-modal.component';
import { SettingsConfig } from './config/settings-config/settings-config';
import { CookieService } from 'ngx-cookie-service';
import { ScaffoldPositioningComponent } from './component/scaffold-positioning/scaffold-positioning.component';
import { GenerateCodeModalComponent } from './component/generate-code-modal/generate-code-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MewDataListComponent,
    MewDataFormComponent,
    MewDataChartComponent,
    SettingsModalComponent,
    ScaffoldPositioningComponent,
    GenerateCodeModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    ChartsModule,
  ],
  providers: [MewDataService, TextConfig, SettingsConfig, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
