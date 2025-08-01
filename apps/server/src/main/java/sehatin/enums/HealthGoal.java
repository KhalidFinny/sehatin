package sehatin.enums;

public enum HealthGoal {
    MENURUNKAN_BERAT_BADAN("Menurunkan Berat Badan"),
    MENJAGA_KESEHATAN_JANTUNG("Menjaga Kesehatan Jantung"),
    MENINGKATKAN_MASSA_OTOT("Meningkatkan Massa Otot");

    private final String healthGoal;

    HealthGoal(String healthGoal) {
        this.healthGoal = healthGoal;
    }

    public String getHealthGoal() {
        return healthGoal;
    }
}