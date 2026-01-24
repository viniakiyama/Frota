import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencoesRevisoesComponent } from './manutencoes-revisoes.component';

describe('ManutencoesRevisoesComponent', () => {
  let component: ManutencoesRevisoesComponent;
  let fixture: ComponentFixture<ManutencoesRevisoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManutencoesRevisoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManutencoesRevisoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
