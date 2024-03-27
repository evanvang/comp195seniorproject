import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAboutSectionComponent } from './edit-about-section.component';

describe('EditAboutSectionComponent', () => {
  let component: EditAboutSectionComponent;
  let fixture: ComponentFixture<EditAboutSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAboutSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAboutSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
