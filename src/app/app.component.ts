import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'jest-test';
  public route$: Observable<string> = new BehaviorSubject<string>('default');
  constructor(private readonly _route: Router) {
    this.route$ = _route.events.pipe(
      filter((x) => x instanceof RouterEvent),
      map((x) => (x as RouterEvent).url),
    );
  }

  getRoute(): Observable<string> {
    return this._route.events.pipe(
      filter((x) => x instanceof RouterEvent),
      map((x) => (x as RouterEvent).url),
    );
  }
}
