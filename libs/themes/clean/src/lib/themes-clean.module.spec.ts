
import { async, TestBed } from '@angular/core/testing';
import { ThemesCleanModule } from './themes-clean.module';

describe('ThemesCleanModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ThemesCleanModule]
    })
      .compileComponents();
  }));

  it('should create', () => {
    expect(ThemesCleanModule).toBeDefined();
  });
});
