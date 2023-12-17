import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TESTWISHLISTComponent } from './testwishlist.component';

describe('TESTWISHLISTComponent', () => {
  let component: TESTWISHLISTComponent;
  let fixture: ComponentFixture<TESTWISHLISTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TESTWISHLISTComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TESTWISHLISTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
