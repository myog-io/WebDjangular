import { async, TestBed } from '@angular/core/testing';
import { CoreSharedModule } from './core-shared.module';

describe('CoreSharedModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreSharedModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CoreSharedModule).toBeDefined();
  });
});
