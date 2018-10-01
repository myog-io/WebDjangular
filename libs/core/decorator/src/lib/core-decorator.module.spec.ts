import { async, TestBed } from '@angular/core/testing';
import { CoreDecoratorModule } from './core-decorator.module';

describe('CoreDecoratorModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreDecoratorModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CoreDecoratorModule).toBeDefined();
  });
});
