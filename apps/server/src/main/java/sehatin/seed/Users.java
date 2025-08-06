package sehatin.seed;

import java.lang.Exception;
import java.time.*;
import java.util.Arrays;
import lombok.extern.slf4j.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import sehatin.enums.Roles;
import sehatin.models.UsersModel;
import sehatin.repositories.UsersRepositories;

@Component
@Slf4j
public class Users {
    private final PasswordEncoder passwordEncoder;
    private final UsersRepositories usersRepositories;

    public Users(PasswordEncoder passwordEncoder, UsersRepositories usersRepositories) {
        this.passwordEncoder = passwordEncoder;
        this.usersRepositories = usersRepositories;
    }

    public void seed() {
        try {
            if (usersRepositories.findAllById(Arrays.asList(1, 2)).isEmpty()) {
                UsersModel admin = new UsersModel();
                admin.setEmail("admin@sehatin.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(Roles.ADMIN);
                admin.setCreatedAt(Instant.now());
                admin.setUpdatedAt(LocalDateTime.now());

                UsersModel user = new UsersModel();
                user.setEmail("user@sehatin.com");
                user.setPassword(passwordEncoder.encode("user123"));
                user.setRole(Roles.PENGGUNA);
                user.setCreatedAt(Instant.now());
                user.setUpdatedAt(LocalDateTime.now());

                usersRepositories.save(admin);
                usersRepositories.save(user);

                log.info("Users seeded successfully.");
            } else {
                log.warn("Users already seeded.");
            }
        } catch (Exception e) {
            log.error("Error seeding users: {}", e.getMessage(), e);
        }
    }
}