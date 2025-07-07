import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DasborAdmin } from "./dasbor.component";

describe("Dasbor Admin", () => {
  let component: DasborAdmin;
  let fixture: ComponentFixture<DasborAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasborAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(DasborAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});