package sehatin.models;

import java.time.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import jakarta.persistence.*;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "konsumsi_makanan")
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

    public int getIdFoodConsumption() {
        return idFoodConsumption;
    }

    public void setIdFoodConsumption(int idFoodConsumption) {
        this.idFoodConsumption = idFoodConsumption;
    }

    public ResidentModel getIdResident() {
        return idResident;
    }

    public void setIdResident(ResidentModel idResident) {
        this.idResident = idResident;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getFrequency() {
        return consumptionFrequency;
    }

    public void setFrequency(String consumptionFrequency) {
        this.consumptionFrequency = consumptionFrequency;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}