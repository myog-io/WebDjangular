import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from './forms.module';

describe('FormModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FormsModule).toBeDefined();
  });
});
