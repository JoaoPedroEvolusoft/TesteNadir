import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParceiroComponent } from './add-parceiro.component';

describe('AddParceiroComponent', () => {
  let component: AddParceiroComponent;
  let fixture: ComponentFixture<AddParceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParceiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
