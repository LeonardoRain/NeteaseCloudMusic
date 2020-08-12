import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeResolverService } from './home-resolver.service';
import { HomeService } from 'src/app/services/home.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: '??' },
    resolve: { homeData: HomeResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [HomeResolverService],
})
export class HomeRoutingModule {}
