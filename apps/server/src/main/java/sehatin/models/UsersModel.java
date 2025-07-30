package sehatin.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "pengguna")
public class UsersModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_pengguna", nullable = false, updatable = false)
    private UUID id_user;

    @Column(name = "nama_lengkap")
    private String full_name;

    @Column(name = "surel", unique = true)
    private String email;

    @Column(name = "kata_sandi")
    private String password;

    @Column(name = "peran")
    private String role;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant created_at;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updated_at;

    public UUID getIdUser() {
        return id_user;
    }

    public void setIdUser(UUID id_user) {
        this.id_user = id_user;
    }

    public String getFullName() {
        return full_name;
    }

    public void setFullName(String full_name) {
        this.full_name = full_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Instant getCreatedAt() {
        return created_at;
    }

    public void setCreatedAt(Instant created_at) {
        this.created_at = created_at;
    }

    public LocalDateTime getUpdatedAt() {
        return updated_at;
    }
}