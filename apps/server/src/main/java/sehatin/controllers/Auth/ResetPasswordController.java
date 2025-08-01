package sehatin.controllers.Auth;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sehatin.models.UsersModel;
import sehatin.repositories.UsersRepositories;

@RestController
@RequestMapping("/reset-kata-sandi")
@CrossOrigin(origins = "http://localhost:4200")
public class ResetPasswordController {
    @Autowired
    private UsersRepositories usersRepositories;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public String resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            Optional<UsersModel> optionalUser = usersRepositories.findByResetPasswordToken(request.getToken());

            if (optionalUser.isEmpty()) {
                return "Surel tidak ditemukan.";
            } else if (!request.getNewPassword().matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")) {
                return "Kata sandi harus terdiri dari minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, serta simbol.";
            }

            UsersModel users = optionalUser.get();
            users.setPassword(passwordEncoder.encode(request.getNewPassword()));
            users.setResetPasswordToken(null);
            usersRepositories.save(users);

            return "[RESET KATA SANDI] Kata sandi Anda berhasil diatur ulang.";
        } catch (Exception e) {
            System.err.println("[RESET KATA SANDI] Terjadi kesalahan saat reset kata sandi Anda: " + e.getMessage());
            throw e;
        }
    }

    private static class ResetPasswordRequest {
        private String token;
        private String newPassword;

        public String getToken() {
            return token != null ? token : "";
        };

        public String getNewPassword() {
            return newPassword != null ? newPassword : "";
        };
    }
}