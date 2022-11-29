import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFornecedorDeItemComponent } from './details-fornecedor-de-item.component';

describe('DetailsFornecedorDeItemComponent', () => {
  let component: DetailsFornecedorDeItemComponent;
  let fixture: ComponentFixture<DetailsFornecedorDeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsFornecedorDeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsFornecedorDeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
