import { ComponentFixture, TestBed } from "@angular/core/testing";
import { getAllDistricts, getAllVillages } from "indonesia-nodejs";
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

  it("should get all the district names in malang", async () => {
    const malangDistricts = (await getAllDistricts()).filter((district) => district.city_code === 3507);
    const districtNames = malangDistricts.map((district) => district.name);
    console.log("Kecamatan di Kabupaten Malang:");
    console.table(districtNames);
    expect(districtNames.length).toBeGreaterThan(0);
  });

  it("should get all the village names in malang", async () => {
    const malangVillages = (await getAllVillages()).filter((village) => village.district_code.toString().startsWith("3507"));
    const villageNames = malangVillages.map((village) => village.name);
    console.log("Kelurahan di Kabupaten Malang:");
    console.table(villageNames);
    expect(villageNames.length).toBeGreaterThan(0);
  });
});