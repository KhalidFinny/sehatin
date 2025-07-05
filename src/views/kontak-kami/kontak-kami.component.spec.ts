import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontakKami } from './kontak-kami.component';

describe('KontakKamiComponent', () => {
  let component: KontakKami;
  let fixture: ComponentFixture<KontakKami>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KontakKami]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KontakKami);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
