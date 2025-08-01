package sehatin.models;

import jakarta.persistence.*;
import sehatin.enums.Gender;
import sehatin.enums.HealthGoal;

import java.time.*;
import java.util.List;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "penduduk")
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

    public int getIdResident() {
        return idResident;
    }

    public void setIdResident(int idResident) {
        this.idResident = idResident;
    }

    public UsersModel getIdUser() {
        return idUser;
    }

    public void setIdUser(UsersModel idUser) {
        this.idUser = idUser;
    }

    public String getNationalIdNumber() {
        return nationalIdNumber;
    }

    public void setNationalIdNumber(String nationalIdNumber) {
        this.nationalIdNumber = nationalIdNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public HealthGoal getHealthGoal() {
        return healthGoal;
    }

    public void setHealthGoal(HealthGoal healthGoal) {
        this.healthGoal = healthGoal;
    }

    public String getPhysicalActivityLevel() {
        return physicalActivityLevel;
    }

    public void setPhysicalActivityLevel(String physicalActivityLevel) {
        this.physicalActivityLevel = physicalActivityLevel;
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