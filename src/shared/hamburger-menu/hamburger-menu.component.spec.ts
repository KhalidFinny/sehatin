import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HamburgerMenu } from "./hamburger-menu.component";

describe("Hamburger Menu", () => {
  let component: HamburgerMenu;
  let fixture: ComponentFixture<HamburgerMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamburgerMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(HamburgerMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});