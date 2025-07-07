import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TentangKami } from "./tentang-kami.component";

describe("TentangKami", () => {
  let component: TentangKami;
  let fixture: ComponentFixture<TentangKami>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TentangKami],
    }).compileComponents();

    fixture = TestBed.createComponent(TentangKami);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
