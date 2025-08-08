import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TekananDarahTinggiSeringTakTerasaTapiDiamDiamBerbahaya } from "./tekanan-darah-tinggi-sering-tak-terasa-tapi-diam-diam-berbahaya.component";

describe("Tekanan Darah Tinggi Sering Tak Terasa Tapi Diam-Diam Berbahaya", () => {
  let component: TekananDarahTinggiSeringTakTerasaTapiDiamDiamBerbahaya;
  let fixture: ComponentFixture<TekananDarahTinggiSeringTakTerasaTapiDiamDiamBerbahaya>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TekananDarahTinggiSeringTakTerasaTapiDiamDiamBerbahaya],
    }).compileComponents();

    fixture = TestBed.createComponent(TekananDarahTinggiSeringTakTerasaTapiDiamDiamBerbahaya);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});