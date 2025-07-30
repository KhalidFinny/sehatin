package sehatin.repositories;

import java.lang.Integer;
import org.springframework.data.jpa.repository.JpaRepository;
import sehatin.models.ResidentModels;

public interface ResidentRepositories extends JpaRepository<ResidentModels, Integer> {}