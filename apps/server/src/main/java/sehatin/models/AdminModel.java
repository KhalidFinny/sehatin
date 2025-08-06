package sehatin.models;

import jakarta.persistence.*;
import java.time.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "admin")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
}