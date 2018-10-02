
  import { async, TestBed } from '@angular/core/testing';
  import { CoreDynamicPageLoaderModule } from './core-dynamic-page-loader.module';
  
  describe('CoreDynamicPageLoaderModule', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ CoreDynamicPageLoaderModule ]
      })
      .compileComponents();
    }));
  
    it('should create', () => {
      expect(CoreDynamicPageLoaderModule).toBeDefined();
    });
  });
        