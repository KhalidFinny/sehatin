package sehatin.controllers.Auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sehatin.enums.Roles;
import sehatin.models.UsersModel;
import sehatin.repositories.UsersRepositories;

@RestController
@RequestMapping("/daftar")
@CrossOrigin(origins = "http://localhost:4200/daftar")
public class RegisterController {
    @Autowired
    private UsersRepositories usersRepositories;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public String register(@RequestBody UsersModel usersModel) {
        try {
            if (usersRepositories.findByEmail(usersModel.getEmail()).isPresent()) {
                return "Surel sudah digunakan, silakan gunakan surel lain.";
            }

            usersModel.setPassword(passwordEncoder.encode(usersModel.getPassword()));
            usersModel.setRole(Roles.PENGGUNA);
            usersRepositories.save(usersModel);
            return "Akun Anda berhasil didaftarkan!";
        } catch (Exception e) {
            System.err.println("Terjadi kesalahan saat mendaftar akun Anda: " + e.getMessage());
            throw e;
        }
    }
}