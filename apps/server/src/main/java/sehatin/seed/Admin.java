package sehatin.seed;

import java.time.Instant;
import java.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import sehatin.models.AdminModels;
import sehatin.repositories.AdminRepositories;

@Component
public class Admin {
    private final AdminRepositories adminRepositories;
    private static final Logger logger = LoggerFactory.getLogger(Admin.class);

    public Admin(AdminRepositories adminRepositories) {
        this.adminRepositories = adminRepositories;
    }

    public void seed() {
        try {
            if (!adminRepositories.existsById(1)) {
                AdminModels admin = new AdminModels();
                admin.setIdUser(1);
                admin.setFullName("Administrator");
                admin.setEmployeeIdNumber("12345678901234567890");
                admin.setPosition("Eselon IV");
                admin.setCreatedAt(Instant.now());
                admin.setUpdatedAt(LocalDateTime.now());

                adminRepositories.save(admin);

                logger.info("Admin seeded successfully.");
            } else {
                logger.warn("Admin already seeded.");
            }
        } catch (Exception e) {
            logger.error("Error seeding admin: {}", e.getMessage());
        }
    }
}