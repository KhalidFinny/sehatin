package sehatin.repositories;

import java.lang.Integer;
import org.springframework.data.jpa.repository.JpaRepository;
import sehatin.models.FoodConsumptionModel;

public interface FoodConsumptionRepositories extends JpaRepository<FoodConsumptionModel, Integer> {}