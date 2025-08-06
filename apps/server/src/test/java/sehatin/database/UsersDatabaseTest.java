package sehatin.database;

import lombok.extern.slf4j.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.*;
import org.springframework.context.annotation.*;
import sehatin.config.Jpa;
import sehatin.enums.Roles;
import sehatin.models.UsersModel;
import sehatin.repositories.UsersRepositories;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Import(Jpa.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Slf4j
class UsersDatabaseTest {
    @Autowired
    private UsersRepositories usersRepositories;

    @Test
    void auditingShouldSetCreatedAndUpdatedDate() {
        UsersModel usersModel = UsersModel.builder().email("a6iyyu@sehatin.com").password("admin123").role(Roles.ADMIN).build();
        UsersModel savedUsers = usersRepositories.save(usersModel);

        assertThat(savedUsers.getCreatedAt()).isNotNull();
        assertThat(savedUsers.getUpdatedAt()).isNotNull();

        log.info("Created At: " + savedUsers.getCreatedAt());
        log.info("Updated At: " + savedUsers.getUpdatedAt());
    }
}