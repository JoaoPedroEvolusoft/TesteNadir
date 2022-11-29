import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVariavelComponent } from './add-variavel.component';

describe('AddVariavelComponent', () => {
  let component: AddVariavelComponent;
  let fixture: ComponentFixture<AddVariavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVariavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVariavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
