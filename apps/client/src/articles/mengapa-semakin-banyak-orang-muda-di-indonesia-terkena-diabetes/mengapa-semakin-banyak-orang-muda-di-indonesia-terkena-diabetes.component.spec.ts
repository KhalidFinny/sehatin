import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MengapaSemakinBanyakOrangMudaDiIndonesiaTerkenaDiabetes } from "./mengapa-semakin-banyak-orang-muda-di-indonesia-terkena-diabetes.component";

describe("Mengapa Semakin Banyak Orang Muda Di Indonesia Terkena Diabetes", () => {
  let component: MengapaSemakinBanyakOrangMudaDiIndonesiaTerkenaDiabetes;
  let fixture: ComponentFixture<MengapaSemakinBanyakOrangMudaDiIndonesiaTerkenaDiabetes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MengapaSemakinBanyakOrangMudaDiIndonesiaTerkenaDiabetes],
    }).compileComponents();

    fixture = TestBed.createComponent(MengapaSemakinBanyakOrangMudaDiIndonesiaTerkenaDiabetes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});