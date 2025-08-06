package sehatin.models;

import jakarta.persistence.*;
import java.time.*;
import java.util.List;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import sehatin.enums.Gender;
import sehatin.enums.HealthGoal;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "penduduk")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResidentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_penduduk", nullable = false, updatable = false)
    private int idResident;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pengguna", referencedColumnName = "id_pengguna", nullable = false, unique = true)
    private UsersModel idUser;

    @Column(name = "nik", unique = true)
    private String nationalIdNumber;

    @Column(name = "nama_lengkap", nullable = false)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(name = "jenis_kelamin")
    private Gender gender;

    @Column(name = "usia")
    private int age;

    @Column(name = "berat_badan")
    private int weight;

    @Column(name = "tinggi_badan")
    private int height;

    @Enumerated(EnumType.STRING)
    @Column(name = "tujuan_kesehatan")
    private HealthGoal healthGoal;

    @Column(name = "tingkat_aktivitas_fisik")
    private String physicalActivityLevel;

    @CreatedBy
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "idResident", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<FoodConsumptionModel> foodConsumptions;
}