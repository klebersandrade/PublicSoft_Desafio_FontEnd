import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhamentoContratosComponent } from './detalhamento-contratos.component';

describe('DetalhamentoContratosComponent', () => {
  let component: DetalhamentoContratosComponent;
  let fixture: ComponentFixture<DetalhamentoContratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhamentoContratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhamentoContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
