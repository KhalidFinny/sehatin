package sehatin.models;

import jakarta.persistence.*;
import java.time.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import sehatin.enums.Roles;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "pengguna")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pengguna", nullable = false, updatable = false)
    private int idUser;

    @Column(name = "surel", unique = true)
    private String email;

    @Column(name = "kata_sandi")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "peran")
    private Roles role;

    @Column(name = "token_reset_kata_sandi")
    private String resetPasswordToken;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}