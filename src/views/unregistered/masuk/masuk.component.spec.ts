import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Masuk } from "./masuk.component";

describe("Masuk", () => {
  let component: Masuk;
  let fixture: ComponentFixture<Masuk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Masuk],
    }).compileComponents();

    fixture = TestBed.createComponent(Masuk);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});