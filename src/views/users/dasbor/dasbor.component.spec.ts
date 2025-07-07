import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DasborPengguna } from "./dasbor.component";

describe("Dasbor Pengguna", () => {
  let component: DasborPengguna;
  let fixture: ComponentFixture<DasborPengguna>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasborPengguna],
    }).compileComponents();

    fixture = TestBed.createComponent(DasborPengguna);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});