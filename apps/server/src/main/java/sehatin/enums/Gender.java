package sehatin.enums;

public enum Gender {
    LAKI_LAKI("Laki-laki"),
    PEREMPUAN("Perempuan");

    private final String gender;

    Gender(String gender) {
        this.gender = gender;
    }

    public String getGender() {
        return gender;
    }
}