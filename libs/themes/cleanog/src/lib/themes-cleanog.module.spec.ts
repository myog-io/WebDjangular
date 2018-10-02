import { async, TestBed } from '@angular/core/testing';
import { ThemesCleanogModule } from './themes-cleanog.module';

describe('ThemesCleanogModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ThemesCleanogModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ThemesCleanogModule).toBeDefined();
  });
});
