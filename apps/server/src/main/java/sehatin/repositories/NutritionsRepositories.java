package sehatin.repositories;

import java.lang.Integer;
import org.springframework.data.jpa.repository.JpaRepository;
import sehatin.models.NutritionsModel;

public interface NutritionsRepositories extends JpaRepository<NutritionsModel, Integer> {}