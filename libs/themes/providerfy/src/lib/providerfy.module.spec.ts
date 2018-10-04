import { async, TestBed } from '@angular/core/testing';
import { ThemeProviderfyModule } from './providerfy.module';

describe('ThemesProviderfyModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ThemeProviderfyModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ThemeProviderfyModule).toBeDefined();
  });
});
