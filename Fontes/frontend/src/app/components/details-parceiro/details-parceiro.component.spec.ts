import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsParceiroComponent } from './details-parceiro.component';

describe('DetailsParceiroComponent', () => {
  let component: DetailsParceiroComponent;
  let fixture: ComponentFixture<DetailsParceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsParceiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsParceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
