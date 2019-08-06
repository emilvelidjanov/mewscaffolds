import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './service/user-service.service';
import { TokenListComponent } from './component/token-list/token-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    TokenListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
