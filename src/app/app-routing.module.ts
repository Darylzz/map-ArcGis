import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResearchMapComponent } from './research-map/research-map.component';

const routes: Routes = [
  {
    path: '',
    component: ResearchMapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
