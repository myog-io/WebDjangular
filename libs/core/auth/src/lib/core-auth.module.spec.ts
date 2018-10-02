import { async, TestBed } from '@angular/core/testing';
import { CoreAuthModule } from './core-auth.module';

describe('CoreAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CoreAuthModule).toBeDefined();
  });
});
