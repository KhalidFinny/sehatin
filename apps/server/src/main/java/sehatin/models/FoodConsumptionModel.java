package sehatin.models;

import jakarta.persistence.*;
import java.time.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "konsumsi_makanan")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodConsumptionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_konsumsi_makanan", nullable = false, updatable = false)
    private int idFoodConsumption;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_penduduk", referencedColumnName = "id_penduduk", nullable = false)
    private ResidentModel idResident;

    @Column(name = "nama_makanan", unique = true)
    private String foodName;

    @Column(name = "jumlah")
    private String amount;

    @Column(name = "frekuensi_konsumsi")
    private String consumptionFrequency;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}