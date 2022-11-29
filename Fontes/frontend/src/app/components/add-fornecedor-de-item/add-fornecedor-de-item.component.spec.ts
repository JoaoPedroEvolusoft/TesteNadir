import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFornecedorDeItemComponent } from './add-fornecedor-de-item.component';

describe('AddFornecedorDeItemComponent', () => {
  let component: AddFornecedorDeItemComponent;
  let fixture: ComponentFixture<AddFornecedorDeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFornecedorDeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFornecedorDeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
