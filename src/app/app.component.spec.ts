import 'zone.js';
import 'zone.js/testing';
import { describe } from '@jest/globals';

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { RouterEvent, Router, RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let spy: Subscription | null;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  const mockRouter = {
    events: new BehaviorSubject<RouterEvent>(new RouterEvent(1, 'url')),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterModule],
      providers: [{ provide: Router, useValue: mockRouter }],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    if (spy) {
      spy.unsubscribe();
      spy = null;
    }
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it("should have as title 'jest-test'", () => {
    expect(component.title).toEqual('jest-test');
  });

  it('should render title', fakeAsync(() => {
    mockRouter.events.next(new RouterEvent(1, 'regular'));
    spy = component.getRoute().subscribe((x) => {
      expect(x).toBe('regular');
    });
    flush();
  }));

  it('should render title with async', fakeAsync(() => {
    mockRouter.events.next(new RouterEvent(1, 'async'));
    spy = component.route$.subscribe((x) => {
      expect(x).toBe('async');
    });
    flush();
  }));

  describe.each([
    ['asdf', 'asdf'],
    ['fdsa', 'fdsa'],
  ])('url: %s results in %s', (url, expected) => {
    it('', fakeAsync(() => {
      mockRouter.events.next(new RouterEvent(1, url));
      spy = component.route$.subscribe((x) => {
        expect(x).toBe(expected);
      });
      flush();
    }));
  });
  it('should render title with async', fakeAsync(() => {
    mockRouter.events.next(new RouterEvent(1, 'async'));
    spy = component.getRoute().subscribe((x) => {
      expect(x).toBe('async');
    });
    flush();
  }));

  // it('should render title with angular utils', fakeAsync(() => {
  //   mockRouter.events.next(new RouterEvent(1, 'two'));
  //   fixture.detectChanges();
  //   flush();
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('two');
  // }));
});
