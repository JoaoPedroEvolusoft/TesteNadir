import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsConfiguracaoBuscaComponent } from './details-configuracao-busca.component';

describe('DetailsConfiguracaoBuscaComponent', () => {
  let component: DetailsConfiguracaoBuscaComponent;
  let fixture: ComponentFixture<DetailsConfiguracaoBuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsConfiguracaoBuscaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsConfiguracaoBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
