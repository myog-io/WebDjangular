import { async, TestBed } from '@angular/core/testing';
import { PluginsProviderModule } from './plugins-provider.module';

describe('PluginsProviderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PluginsProviderModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PluginsProviderModule).toBeDefined();
  });
});
