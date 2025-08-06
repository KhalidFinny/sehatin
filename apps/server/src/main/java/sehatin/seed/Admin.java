package sehatin.seed;

import java.time.Instant;
import java.time.LocalDateTime;
import lombok.extern.slf4j.*;
import org.springframework.stereotype.Component;
import sehatin.models.AdminModel;
import sehatin.models.UsersModel;
import sehatin.repositories.AdminRepositories;
import sehatin.repositories.UsersRepositories;

@Component
@Slf4j
public class Admin {
    private final AdminRepositories adminRepositories;
    private final UsersRepositories usersRepositories;

    public Admin(AdminRepositories adminRepositories, UsersRepositories usersRepositories) {
        this.adminRepositories = adminRepositories;
        this.usersRepositories = usersRepositories;
    }

    public void seed() {
        try {
            if (!adminRepositories.existsById(1)) {
                AdminModel admin = new AdminModel();
                UsersModel usersModel = usersRepositories.findById(1).orElse(null);

                admin.setIdUser(usersModel);
                admin.setFullName("Administrator");
                admin.setEmployeeIdNumber("12345678901234567890");
                admin.setPosition("Eselon IV");
                admin.setCreatedAt(Instant.now());
                admin.setUpdatedAt(LocalDateTime.now());

                adminRepositories.save(admin);

                log.info("Admin seeded successfully.");
            } else {
                log.warn("Admin already seeded.");
            }
        } catch (Exception e) {
            log.error("Error seeding admin: {}", e.getMessage());
        }
    }
}