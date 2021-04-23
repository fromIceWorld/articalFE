import { Component, Input, OnInit } from '@angular/core';

enum Level {
  first = '第一层回复',
  second = '第二层回复',
}

@Component({
  selector: 'app-replay-card',
  templateUrl: './replay-card.component.html',
  styleUrls: ['./replay-card.component.scss'],
})
export class ReplayCardComponent implements OnInit {
  @Input() articals;
  level: string = Level.first;
  constructor() {}

  ngOnInit(): void {}
  secondLevelReplay() {}
}
