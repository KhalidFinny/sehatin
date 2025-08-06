package sehatin.utils;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import sehatin.enums.Roles;
import java.io.IOException;
import org.springframework.security.core.*;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

/**
 * Handler kustom yang dijalankan setelah autentikasi berhasil.
 *
 * <p>
 * Kelas ini mengimplementasikan {@link AuthenticationSuccessHandler} untuk
 * menentukan URL tujuan pengguna berdasarkan peran (role) mereka setelah berhasil login.
 * </p>
 *
 * <p>
 * Role yang dikenali:
 * <ul>
 *   <li>{@link Roles#ADMIN} → akan diarahkan ke <code>/admin/dasbor</code></li>
 *   <li>{@link Roles#PENGGUNA} → akan diarahkan ke <code>/pengguna/dasbor</code></li>
 *   <li>Role lain atau tidak dikenali → akan diarahkan ke <code>/</code></li>
 * </ul>
 * </p>
 *
 * <p>
 * Kelas ini digunakan di dalam konfigurasi {@link sehatin.config.Security}
 * sebagai handler sukses login pada metode <code>formLogin().successHandler(...)</code>.
 * </p>
 *
 * @see AuthenticationSuccessHandler
 */
@Component
public class CustomAuthSuccessHandler implements AuthenticationSuccessHandler {
    /**
     * Menangani logika setelah autentikasi berhasil.
     *
     * <p>Metode ini akan menentukan URL tujuan berdasarkan peran pengguna
     * dan mengarahkan respons ke URL tersebut.</p>
     *
     * @param request objek HTTP request dari pengguna
     * @param response objek HTTP response yang akan dikirimkan ke pengguna
     * @param authentication informasi autentikasi pengguna yang berhasil login
     * @throws IOException jika terjadi kesalahan I/O saat redirect
     * @throws ServletException jika terjadi kesalahan servlet saat memproses
     */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String redirectUrl = determineTargetUrl(authentication);
        response.sendRedirect(redirectUrl);
    }

    /**
     * Menentukan URL tujuan berdasarkan role pengguna.
     *
     * @param authentication objek autentikasi yang berisi daftar otoritas (role) pengguna
     * @return URL tujuan berdasarkan role pengguna, atau <code>/</code> jika tidak dikenali
     */
    private String determineTargetUrl(Authentication authentication) {
        for (GrantedAuthority authority : authentication.getAuthorities()) {
            String role = authority.getAuthority();

            if (Roles.ADMIN.getRoleName().equals(role)) {
                return "/admin/dasbor";
            } else if (Roles.PENGGUNA.getRoleName().equals(role)) {
                return "/pengguna/dasbor";
            }
        }

        return "/";
    }
}