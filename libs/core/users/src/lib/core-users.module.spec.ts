import { async, TestBed } from '@angular/core/testing';
import { CoreUsersModule } from './core-users.module';

describe('CoreUsersModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreUsersModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CoreUsersModule).toBeDefined();
  });
});
