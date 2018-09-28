import { async, TestBed } from '@angular/core/testing';
import { CoreCmsModule } from './core-cms.module';

describe('CoreCmsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreCmsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CoreCmsModule).toBeDefined();
  });
});
