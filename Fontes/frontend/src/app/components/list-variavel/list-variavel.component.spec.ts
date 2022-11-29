import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVariavelComponent } from './list-variavel.component';

describe('ListVariavelComponent', () => {
  let component: ListVariavelComponent;
  let fixture: ComponentFixture<ListVariavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVariavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVariavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
