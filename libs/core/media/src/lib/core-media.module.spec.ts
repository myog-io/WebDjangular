import { async, TestBed } from '@angular/core/testing';
import { CoreMediaModule } from './core-media.module';

describe('CoreMediaModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreMediaModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CoreMediaModule).toBeDefined();
  });
});
