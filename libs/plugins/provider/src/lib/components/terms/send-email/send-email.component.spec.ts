import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginProviderSendEmailFormComponent } from './send-email.component';

describe('PluginProviderSendEmailFormComponent', () => {
  let component: PluginProviderSendEmailFormComponent;
  let fixture: ComponentFixture<PluginProviderSendEmailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PluginProviderSendEmailFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginProviderSendEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
