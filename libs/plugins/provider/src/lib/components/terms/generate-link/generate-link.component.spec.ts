import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginProviderGenerateLinkFormComponent } from './generate-link.component';

describe('PluginProviderGenerateLinkFormComponent', () => {
  let component: PluginProviderGenerateLinkFormComponent;
  let fixture: ComponentFixture<PluginProviderGenerateLinkFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PluginProviderGenerateLinkFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginProviderGenerateLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
