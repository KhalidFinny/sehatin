package sehatin.controllers.Auth;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import sehatin.models.UsersModel;
import sehatin.repositories.UsersRepositories;

@RestController
@RequestMapping("/lupa-kata-sandi")
@CrossOrigin(origins = "http://localhost:4200")
public class ForgotPasswordController {
    @Autowired
    private UsersRepositories usersRepositories;

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping
    public String forgotPassword(@RequestBody UsersModel usersModel) {
        try {
            Optional<UsersModel> optionalUser = usersRepositories.findByEmail(usersModel.getEmail());

            if (optionalUser.isEmpty()) {
                return "Surel tidak ditemukan.";
            }

            UsersModel users = optionalUser.get();
            String token = UUID.randomUUID().toString();
            users.setResetPasswordToken(token);
            usersRepositories.save(users);

            String resetLink = "http://localhost:4200/reset-kata-sandi?token=" + token;
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(users.getEmail());
            mailMessage.setSubject("Permintaan Reset Kata Sandi");
            mailMessage.setText("Halo, klik tautan berikut untuk mengatur ulang kata sandi Anda:\n" + resetLink);
            mailSender.send(mailMessage);

            return "[LUPA KATA SANDI] Silakan cek surel Anda untuk mengganti kata sandi Anda.";
        } catch (Exception e) {
            System.err.println("[LUPA KATA SANDI] Terjadi kesalahan saat lupa kata sandi Anda: " + e.getMessage());
            throw e;
        }
    }
}