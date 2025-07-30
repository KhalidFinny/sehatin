import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Kontak } from "./kontak.component";

describe("Kontak", () => {
  let component: Kontak;
  let fixture: ComponentFixture<Kontak>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kontak],
    }).compileComponents();

    fixture = TestBed.createComponent(Kontak);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});