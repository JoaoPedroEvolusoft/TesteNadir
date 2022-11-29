import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParceiroComponent } from './list-parceiro.component';

describe('ListParceiroComponent', () => {
  let component: ListParceiroComponent;
  let fixture: ComponentFixture<ListParceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParceiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListParceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
