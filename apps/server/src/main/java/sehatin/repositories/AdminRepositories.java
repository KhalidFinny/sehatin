package sehatin.repositories;

import java.lang.Integer;
import org.springframework.data.jpa.repository.JpaRepository;
import sehatin.models.AdminModels;

public interface AdminRepositories extends JpaRepository<AdminModels, Integer> {}