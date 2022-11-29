import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImagemDeItemComponent } from './list-imagem-de-item.component';

describe('ListImagemDeItemComponent', () => {
  let component: ListImagemDeItemComponent;
  let fixture: ComponentFixture<ListImagemDeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListImagemDeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListImagemDeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
