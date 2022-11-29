import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConfiguracaoBuscaComponent } from './list-configuracao-busca.component';

describe('ListConfiguracaoBuscaComponent', () => {
  let component: ListConfiguracaoBuscaComponent;
  let fixture: ComponentFixture<ListConfiguracaoBuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListConfiguracaoBuscaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConfiguracaoBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
