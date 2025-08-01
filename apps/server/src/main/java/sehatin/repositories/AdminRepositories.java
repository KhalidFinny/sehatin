package sehatin.repositories;

import java.lang.Integer;
import org.springframework.data.jpa.repository.JpaRepository;
import sehatin.models.AdminModel;

public interface AdminRepositories extends JpaRepository<AdminModel, Integer> {}