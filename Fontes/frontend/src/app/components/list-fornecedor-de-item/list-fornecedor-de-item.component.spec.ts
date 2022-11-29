import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFornecedorDeItemComponent } from './list-fornecedor-de-item.component';

describe('ListFornecedorDeItemComponent', () => {
  let component: ListFornecedorDeItemComponent;
  let fixture: ComponentFixture<ListFornecedorDeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFornecedorDeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFornecedorDeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
