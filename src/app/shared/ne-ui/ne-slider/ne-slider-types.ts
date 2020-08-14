import { Observable } from 'rxjs';

export type NeSlierStyle = {
  width?: string | null;
  height?: string | null;
  left?: string | null;
  bottom?: string | null;
};

export type SliderEventObserverConfig = {
  start: string;
  move: string;
  end: string;
  filt: (e: Event) => boolean;
  pluckKey: string[];
  startPlucked$?: Observable<number>;
  moveResolved$?: Observable<number>;
  end$?: Observable<Event>;
};

export type sliderValue = number | null;
