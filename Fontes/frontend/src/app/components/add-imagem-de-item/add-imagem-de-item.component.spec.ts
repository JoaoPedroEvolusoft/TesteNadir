import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImagemDeItemComponent } from './add-imagem-de-item.component';

describe('AddImagemDeItemComponent', () => {
  let component: AddImagemDeItemComponent;
  let fixture: ComponentFixture<AddImagemDeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImagemDeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImagemDeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
