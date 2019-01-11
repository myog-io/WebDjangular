
  import { async, TestBed } from '@angular/core/testing';
  import { CoreDynamicComponentLoaderModule } from './core-dynamic-component-loader.module';
  
  describe('CoreDynamicComponentLoaderModule', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ CoreDynamicComponentLoaderModule ]
      })
      .compileComponents();
    }));
  
    it('should create', () => {
      expect(CoreDynamicComponentLoaderModule).toBeDefined();
    });
  });
        