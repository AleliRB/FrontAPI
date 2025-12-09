import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCategoriasComponent } from './registro-categorias.component';

describe('RegistroCategoriasComponent', () => {
  let component: RegistroCategoriasComponent;
  let fixture: ComponentFixture<RegistroCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroCategoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
