import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ne-player',
  templateUrl: './ne-player.component.html',
  styleUrls: ['./ne-player.component.less'],
})
export class NePlayerComponent implements OnInit {
  sliderValue = 35;
  bufferOffset = 70;
  constructor() {}

  ngOnInit(): void {}
}
