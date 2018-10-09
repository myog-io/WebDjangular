import { async, TestBed } from '@angular/core/testing';
import { ChunkFileUploadModule } from './chunk-file-upload.module';

describe('ChunkFileUploadModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChunkFileUploadModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ChunkFileUploadModule).toBeDefined();
  });
});
