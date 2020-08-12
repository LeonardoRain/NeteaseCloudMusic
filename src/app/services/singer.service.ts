import { Injectable, inject, Inject } from '@angular/core';
import { ServicesModule, API_CONFIG } from './services.module';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Singer } from './data-types/common.types';
import queryString from 'query-string';

type SingerParams = {
  offset: number;
  limit: number;
  type?: number;
};

const defaultParams: SingerParams = {
  offset: 0,
  limit: 9,
  type: -1,
};

@Injectable({
  providedIn: ServicesModule,
})
export class SingerService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string
  ) {}
  // 获取入驻歌手
  getEnterSinger(args: SingerParams = defaultParams): Observable<Singer[]> {
    const params = new HttpParams({ fromString: queryString.stringify(args) });
    return this.http
      .get(this.uri + 'artist/list', { params })
      .pipe(map((res: { artists: Singer[] }) => res.artists.slice(0, 10)));
  }
}
