import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticalComponent } from '../components/artical/artical.component';
const router: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    component: ArticalComponent,
  },
  {
    path: '**',
    redirectTo: '/index',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(router)],
})
export class AppRouterModule {}
