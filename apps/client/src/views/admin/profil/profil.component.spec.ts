import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Profil } from "./profil.component";

describe("Profil Admin", () => {
  let component: Profil;
  let fixture: ComponentFixture<Profil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profil],
    }).compileComponents();

    fixture = TestBed.createComponent(Profil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});