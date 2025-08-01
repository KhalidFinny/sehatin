package sehatin.config;

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import sehatin.utils.CustomAuthSuccessHandler;

/**
 * Konfigurasi keamanan aplikasi menggunakan Spring Security.
 *
 * <p>
 * Kelas ini mengatur aturan otorisasi HTTP, halaman login khusus,
 * pengaturan logout, CSRF, dan encoder password. Anotasi {@code @EnableWebSecurity}
 * mengaktifkan integrasi dengan keamanan berbasis servlet Spring Security.
 * </p>
 *
 * <h3>Fitur yang dikonfigurasi:</h3>
 * <ul>
 *   <li><b>Login:</b> menggunakan halaman kustom di endpoint {@code /masuk}, 
 *       dengan parameter nama pengguna {@code surel} dan kata sandi {@code kata_sandi}</li>
 *   <li><b>Logout:</b> endpoint {@code /keluar}, akan menghapus sesi dan cookie</li>
 *   <li><b>Public endpoints:</b> mengizinkan akses tanpa autentikasi ke 
 *       {@code /masuk}, {@code /daftar}, {@code /lupa-kata-sandi}, dan {@code /reset-kata-sandi}</li>
 *   <li><b>CSRF:</b> dinonaktifkan</li>
 *   <li><b>Password encoder:</b> menggunakan BCrypt</li>
 * </ul>
 *
 * <p>
 * Kelas ini juga menggunakan {@link CustomAuthSuccessHandler} untuk menangani logika kustom setelah login berhasil.
 * </p>
 */
@Configuration
@EnableWebSecurity
public class Security {
    /**
     * Mendaftarkan filter keamanan utama untuk mengatur alur autentikasi pengguna.
     *
     * @param httpSecurity objek konfigurasi keamanan dari Spring
     * @return konfigurasi filter keamanan yang sudah dibangun
     * @throws Exception jika terjadi kesalahan saat konfigurasi
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
            .authorizeHttpRequests(auth -> auth.requestMatchers("/masuk", "/daftar", "/lupa-kata-sandi", "/reset-kata-sandi").permitAll().anyRequest().authenticated())
            .formLogin(httpForm -> httpForm.loginPage("/masuk").successHandler(new CustomAuthSuccessHandler()).failureUrl("/masuk").usernameParameter("surel").passwordParameter("kata_sandi").permitAll())
            .logout(httpLogout -> httpLogout.logoutUrl("/keluar").logoutSuccessUrl("/masuk").invalidateHttpSession(true).deleteCookies("JSESSIONID").permitAll())
            .csrf(csrf -> csrf.disable())
            .build();
    }

    /**
     * Bean untuk encoder password menggunakan algoritma BCrypt.
     *
     * <p>
     * Digunakan untuk menyimpan dan memverifikasi kata sandi pengguna secara aman.
     * </p>
     *
     * @return instance {@link PasswordEncoder} menggunakan BCrypt
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}