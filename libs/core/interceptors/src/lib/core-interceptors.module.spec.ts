import { async, TestBed } from '@angular/core/testing';
import { CoreInterceptorsModule } from './core-interceptors.module';

describe('CoreInterceptorsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreInterceptorsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CoreInterceptorsModule).toBeDefined();
  });
});
