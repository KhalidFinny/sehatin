package sehatin.repositories;

import java.lang.Integer;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import sehatin.models.UsersModel;

public interface UsersRepositories extends JpaRepository<UsersModel, Integer> {
    Optional<UsersModel> findByEmail(String email);
    Optional<UsersModel> findByResetPasswordToken(String token);
}