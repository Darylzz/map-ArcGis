import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResearchMapComponent } from './research-map/research-map.component';
import { MapService } from './service/map.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ResearchMapComponent],
  imports: [BrowserModule, AppRoutingModule, TabMenuModule, FormsModule],
  providers: [MapService],
  bootstrap: [AppComponent],
})
export class AppModule {}
