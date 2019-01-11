import { async, TestBed } from '@angular/core/testing';
import { PluginProviderModule } from './provider.module';

describe('PluginProviderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ProviderModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ProviderModule).toBeDefined();
  });
});
