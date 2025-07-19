import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DetailAnalitikKecamatan } from "./detail-analitik-kecamatan.component";

describe("Detail Analitik Kecamatan", () => {
  let component: DetailAnalitikKecamatan;
  let fixture: ComponentFixture<DetailAnalitikKecamatan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAnalitikKecamatan],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailAnalitikKecamatan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});