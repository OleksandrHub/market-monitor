import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePriceComponent } from './live-price.component';

describe('LivePriceComponent', () => {
  let component: LivePriceComponent;
  let fixture: ComponentFixture<LivePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivePriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
