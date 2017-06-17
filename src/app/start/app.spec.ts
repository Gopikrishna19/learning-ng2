import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app';

describe('<main-app/>', () => {

  beforeEach(() => TestBed.configureTestingModule({declarations: [AppComponent]}));

  it('should exist', () => {
    const component = TestBed.createComponent(AppComponent);
    expect(component.componentInstance instanceof AppComponent).toBe(true);
  });

});
