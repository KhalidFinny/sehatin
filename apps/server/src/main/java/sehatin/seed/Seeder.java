package sehatin.seed;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.*;
import org.springframework.stereotype.Component;

@Component
@Slf4j
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
        log.info("[Seeder] Running seed...");
        users.seed();
        admin.seed();
        resident.seed();
    }
}