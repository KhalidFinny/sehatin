import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SkriningPtm } from "./skrining-ptm.component";

describe("Skrining PTM", () => {
  let component: SkriningPtm;
  let fixture: ComponentFixture<SkriningPtm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkriningPtm],
    }).compileComponents();

    fixture = TestBed.createComponent(SkriningPtm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});