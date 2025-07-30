package sehatin.seed;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class Seeder {
    private final Users users;

    public Seeder(Users users) {
        this.users = users;
    }

    @PostConstruct
    public void run() {
        System.out.println("[Seeder] Running seed...");
        users.seed();
    }
}