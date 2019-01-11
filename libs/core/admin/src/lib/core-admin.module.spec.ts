import { async, TestBed } from '@angular/core/testing';
import { CoreAdminModule } from './core-admin.module';

describe('CoreAdminModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreAdminModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CoreAdminModule).toBeDefined();
  });
});
