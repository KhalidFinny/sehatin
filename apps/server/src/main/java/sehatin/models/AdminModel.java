package sehatin.models;

import jakarta.persistence.*;
import java.time.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "admin")
public class AdminModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_admin", nullable = false, updatable = false)
    private int idAdmin;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pengguna", referencedColumnName = "id_pengguna", nullable = false, unique = true)
    private UsersModel idUser;

    @Column(name = "nama_lengkap")
    private String fullName;

    @Column(name = "nip", unique = true)
    private String employeeIdNumber;

    @Column(name = "jabatan")
    private String position;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public int getIdAdmin() {
        return idAdmin;
    }

    public void setIdAdmin(int idAdmin) {
        this.idAdmin = idAdmin;
    }

    public UsersModel getIdUser() {
        return idUser;
    }

    public void setIdUser(UsersModel idUser) {
        this.idUser = idUser;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmployeeIdNumber() {
        return employeeIdNumber;
    }

    public void setEmployeeIdNumber(String employeeIdNumber) {
        this.employeeIdNumber = employeeIdNumber;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
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