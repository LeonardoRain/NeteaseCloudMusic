import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';
import { NeCarouselComponent } from './components/ne-carousel/ne-carousel.component';

@NgModule({
  declarations: [HomeComponent, NeCarouselComponent],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
