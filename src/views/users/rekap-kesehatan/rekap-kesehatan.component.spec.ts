import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RekapKesehatan } from "./rekap-kesehatan.component";

describe("RekapKesehatan", () => {
  let component: RekapKesehatan;
  let fixture: ComponentFixture<RekapKesehatan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RekapKesehatan],
    }).compileComponents();

    fixture = TestBed.createComponent(RekapKesehatan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});