import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { MainPageGuard } from './guards/main-page.guard';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: '', canActivate: [MainPageGuard], component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chart/:type',canActivate: [MainPageGuard] ,component: ChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
