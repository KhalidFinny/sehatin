package sehatin.seed;

import java.lang.Exception;
import java.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import sehatin.models.UsersModel;
import sehatin.repositories.UsersRepositories;
import sehatin.utils.Aes;

@Component
public class Users {
    private final UsersRepositories usersRepositories;
    private static final Logger logger = LoggerFactory.getLogger(Users.class);

    @Value("${encryption.key}")
    private String encryptionKey;

    public Users(UsersRepositories usersRepositories) {
        this.usersRepositories = usersRepositories;
    }

    public void seed() {
        try {
            if (usersRepositories.findAllById(Arrays.asList(1, 2)).isEmpty()) {
                UsersModel admin = new UsersModel();
                admin.setEmail("admin@sehatin.com");
                admin.setPassword(Aes.encrypt(encryptionKey, "admin123"));
                admin.setRole("admin");

                UsersModel user = new UsersModel();
                user.setEmail("user@sehatin.com");
                user.setPassword(Aes.encrypt(encryptionKey, "user123"));
                user.setRole("user");

                usersRepositories.save(admin);
                usersRepositories.save(user);

                logger.info("Users seeded successfully.");
            } else {
                logger.warn("Users already seeded.");
            }
        } catch (Exception e) {
            logger.error("Error seeding users: {}", e.getMessage(), e);
        }
    }
}