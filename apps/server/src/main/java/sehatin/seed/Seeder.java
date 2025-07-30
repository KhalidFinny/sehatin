package sehatin.seed;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class Seeder {
    private final Admin admin;
    private final Resident resident;
    private final Users users;

    public Seeder(Admin admin, Resident resident, Users users) {
        this.admin = admin;
        this.resident = resident;
        this.users = users;
    }

    @PostConstruct
    public void run() {
        System.out.println("[Seeder] Running seed...");
        users.seed();
        admin.seed();
        resident.seed();
    }
}