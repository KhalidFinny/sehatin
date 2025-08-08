import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DetailArtikel } from "./detail-artikel.component";

describe("Detail Artikel", () => {
  let component: DetailArtikel;
  let fixture: ComponentFixture<DetailArtikel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailArtikel],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailArtikel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});