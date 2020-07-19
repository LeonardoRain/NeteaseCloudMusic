import { Injectable, inject, Inject } from '@angular/core';
import { ServicesModule, API_CONFIG } from './services.module';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { Banner } from './data-types/common.types';

@Injectable({
  providedIn: ServicesModule,
})
export class HomeService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string
  ) {}
  getBanners(): Observable<Banner[]> {
    return this.http
      .get(this.uri + 'banner')
      .pipe(map((res: { banners: Banner[] }) => res.banners));
  }
}
