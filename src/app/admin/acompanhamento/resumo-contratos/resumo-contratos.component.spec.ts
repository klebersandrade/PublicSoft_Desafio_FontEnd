import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoContratosComponent } from './resumo-contratos.component';

describe('ResumoContratosComponent', () => {
  let component: ResumoContratosComponent;
  let fixture: ComponentFixture<ResumoContratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumoContratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumoContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
