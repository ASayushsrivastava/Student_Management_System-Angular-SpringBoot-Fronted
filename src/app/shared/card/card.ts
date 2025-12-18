import { AfterContentInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card implements AfterContentInit, OnDestroy {
  ngAfterContentInit() {
    console.log('Card → ngAfterContentInit');
  }

  ngOnDestroy() {
    console.log('Card → ngOnDestroy');
  }
}
