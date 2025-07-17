import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KecamatanComponent } from './kecamatan.component';

describe('KecamatanComponent', () => {
  let component: KecamatanComponent;
  let fixture: ComponentFixture<KecamatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KecamatanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KecamatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
