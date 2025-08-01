package sehatin.enums;

public enum Roles {
    ADMIN("ROLE_ADMIN"),
    PENGGUNA("ROLE_PENGGUNA");

    private final String roleName;

    Roles(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleName() {
        return roleName;
    }
}