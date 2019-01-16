import { async, TestBed } from '@angular/core/testing';
import {StoreModule} from "@ngrx/store";

describe('StoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoreModule).toBeDefined();
  });
});
