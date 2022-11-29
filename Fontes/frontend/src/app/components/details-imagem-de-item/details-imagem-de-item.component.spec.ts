import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsImagemDeItemComponent } from './details-imagem-de-item.component';

describe('DetailsImagemDeItemComponent', () => {
  let component: DetailsImagemDeItemComponent;
  let fixture: ComponentFixture<DetailsImagemDeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsImagemDeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsImagemDeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
