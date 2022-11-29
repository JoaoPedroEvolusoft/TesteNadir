import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVariavelComponent } from './details-variavel.component';

describe('DetailsVariavelComponent', () => {
  let component: DetailsVariavelComponent;
  let fixture: ComponentFixture<DetailsVariavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsVariavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsVariavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
