import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResearchMapComponent } from './research-map/research-map.component';
import { MapService } from './service/map.service';

@NgModule({
  declarations: [AppComponent, ResearchMapComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [MapService],
  bootstrap: [AppComponent],
})
export class AppModule {}
