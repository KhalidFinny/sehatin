import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AnalitikPengguna } from "./analitik-pengguna.component";

describe("Analitik Pengguna", () => {
  let component: AnalitikPengguna;
  let fixture: ComponentFixture<AnalitikPengguna>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalitikPengguna],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalitikPengguna);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});