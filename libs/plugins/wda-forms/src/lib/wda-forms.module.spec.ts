import { async, TestBed } from '@angular/core/testing';
import { WDAFormsModule } from './wda-forms.module';

describe('WDAFormModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WDAFormsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WDAFormsModule).toBeDefined();
  });
});
