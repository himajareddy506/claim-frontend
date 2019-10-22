import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyComponent } from './policy.component';

describe('PolicyComponent', () => {
  let component: PolicyComponent;
  let fixture: ComponentFixture<PolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create new object', () => {
    // @ts-ignore
    const comp = new PolicyComponent();
    comp.ngOnInit();
    expect(comp).toBeTruthy();
  });
});
