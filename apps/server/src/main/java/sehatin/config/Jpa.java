package sehatin.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Konfigurasi untuk mengaktifkan fitur JPA Auditing di aplikasi.
 *
 * <p>
 * Dengan anotasi {@code @EnableJpaAuditing}, Spring Data JPA akan secara otomatis
 * mengisi field auditing seperti {@code @CreatedDate}, {@code @LastModifiedDate},
 * {@code @CreatedBy}, dan {@code @LastModifiedBy} pada entitas yang sesuai.
 * </p>
 *
 * <p>
 * Pastikan kamu sudah menambahkan anotasi seperti {@code @EntityListeners(AuditingEntityListener.class)}
 * di entitas yang membutuhkan, dan menggunakan anotasi field auditing yang sesuai.
 * </p>
 *
 * <p>
 * Kelas ini harus ada agar auditing berfungsi di seluruh aplikasi.
 * </p>
 */
@Configuration
@EnableJpaAuditing
public class Jpa {}