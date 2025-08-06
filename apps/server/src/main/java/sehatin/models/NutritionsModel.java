package sehatin.models;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "nutrisi")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
}