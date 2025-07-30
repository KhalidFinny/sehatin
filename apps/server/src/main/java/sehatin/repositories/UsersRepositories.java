package sehatin.repositories;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

import sehatin.models.UsersModel;

public interface UsersRepositories extends JpaRepository<UsersModel, UUID> {}