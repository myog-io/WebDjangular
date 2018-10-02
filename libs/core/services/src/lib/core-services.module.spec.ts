import { async, TestBed } from '@angular/core/testing';
import { CoreServicesModule } from './core-services.module';

describe('CoreServicesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreServicesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CoreServicesModule).toBeDefined();
  });
});
