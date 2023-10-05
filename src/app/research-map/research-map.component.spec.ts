import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchMapComponent } from './research-map.component';

describe('ResearchMapComponent', () => {
  let component: ResearchMapComponent;
  let fixture: ComponentFixture<ResearchMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResearchMapComponent]
    });
    fixture = TestBed.createComponent(ResearchMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
