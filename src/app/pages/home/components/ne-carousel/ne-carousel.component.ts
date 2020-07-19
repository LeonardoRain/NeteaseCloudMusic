import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-ne-carousel',
  templateUrl: './ne-carousel.component.html',
  styleUrls: ['./ne-carousel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeCarouselComponent implements OnInit {
  @Input() activeIndex = 0;
  @Output() changeSlide = new EventEmitter<'pre' | 'next'>();
  @ViewChild('dot', { static: true }) dotRef: TemplateRef<any>;
  constructor() {}

  ngOnInit(): void {}

  onChangeSlide(type: 'pre' | 'next') {
    this.changeSlide.emit(type);
  }
}
