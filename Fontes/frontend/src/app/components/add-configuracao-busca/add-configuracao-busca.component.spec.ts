import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConfiguracaoBuscaComponent } from './add-configuracao-busca.component';

describe('AddConfiguracaoBuscaComponent', () => {
  let component: AddConfiguracaoBuscaComponent;
  let fixture: ComponentFixture<AddConfiguracaoBuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConfiguracaoBuscaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConfiguracaoBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
