package sehatin.models;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import jakarta.persistence.*;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "nutrisi")
public class NutritionsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_nutrisi", nullable = false, updatable = false)
    private int idNutrition;

    @Column(name = "metode_pengolahan")
    private String processingMethod;

    @Column(name = "kalori", nullable = true)
    private float calories;

    @Column(name = "protein", nullable = true)
    private float protein;

    @Column(name = "karbohidrat", nullable = true)
    private float carbohydrate;

    @Column(name = "lemak", nullable = true)
    private float fat;

    @Column(name = "vitamin", nullable = true)
    private float vitamin;

    @Column(name = "mineral", nullable = true)
    private float mineral;

    public int getIdNutrition() {
        return idNutrition;
    }

    public void setIdNutrition(int idNutrition) {
        this.idNutrition = idNutrition;
    }

    public String getProcessingMethod() {
        return processingMethod;
    }

    public void setProcessingMethod(String processingMethod) {
        this.processingMethod = processingMethod;
    }

    public float getCalories() {
        return calories;
    }

    public void setCalories(float calories) {
        this.calories = calories;
    }

    public float getProtein() {
        return protein;
    }

    public void setProtein(float protein) {
        this.protein = protein;
    }

    public float getCarbohydrate() {
        return carbohydrate;
    }

    public void setCarbohydrate(float carbohydrate) {
        this.carbohydrate = carbohydrate;
    }

    public float getFat() {
        return fat;
    }

    public void setFat(float fat) {
        this.fat = fat;
    }

    public float getVitamin() {
        return vitamin;
    }

    public void setVitamin(float vitamin) {
        this.vitamin = vitamin;
    }

    public float getMineral() {
        return mineral;
    }

    public void setMineral(float mineral) {
        this.mineral = mineral;
    }
}