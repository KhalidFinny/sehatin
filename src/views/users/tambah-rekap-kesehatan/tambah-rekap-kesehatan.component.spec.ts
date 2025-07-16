import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TambahRekapKesehatan } from "./tambah-rekap-kesehatan.component";

describe("Tambah Rekap Kesehatan", () => {
  let component: TambahRekapKesehatan;
  let fixture: ComponentFixture<TambahRekapKesehatan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TambahRekapKesehatan],
    }).compileComponents();

    fixture = TestBed.createComponent(TambahRekapKesehatan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});