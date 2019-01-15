import { async, TestBed } from '@angular/core/testing';
import { CoreInterfacesModule } from './core-interfaces.module';

describe('CoreInterfacesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreInterfacesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CoreInterfacesModule).toBeDefined();
  });
});
