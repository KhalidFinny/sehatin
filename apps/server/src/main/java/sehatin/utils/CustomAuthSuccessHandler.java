package sehatin.utils;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import sehatin.enums.Roles;
import java.io.IOException;
import org.springframework.security.core.*;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String redirectUrl = determineTargetUrl(authentication);
        response.sendRedirect(redirectUrl);
    }

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