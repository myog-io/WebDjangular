import { async, TestBed } from '@angular/core/testing';
import { PluginProviderModule } from './store.module';
import {StoreModule} from "@ngrx/store";

describe('PluginProviderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoreModule).toBeDefined();
  });
});
