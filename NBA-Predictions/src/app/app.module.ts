import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routers/home/home.component';
import { ViewPlayersComponent } from './routers/view-players/view-players.component';
import { ViewTeamsComponent } from './routers/view-teams/view-teams.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewPlayersComponent,
    ViewTeamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
