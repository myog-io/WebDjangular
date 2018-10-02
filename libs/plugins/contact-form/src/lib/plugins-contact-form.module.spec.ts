import { async, TestBed } from '@angular/core/testing';
import { PluginsContactFormModule } from './plugins-contact-form.module';

describe('PluginsContactFormModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PluginsContactFormModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PluginsContactFormModule).toBeDefined();
  });
});
