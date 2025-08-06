package sehatin.seed;

import java.time.Instant;
import java.time.LocalDateTime;
import lombok.extern.slf4j.*;
import org.springframework.stereotype.Component;
import sehatin.enums.*;
import sehatin.models.*;
import sehatin.repositories.*;

@Component
@Slf4j
public class Resident {
    private final ResidentRepositories residentRepositories;
    private final UsersRepositories usersRepositories;

    public Resident(ResidentRepositories residentRepositories, UsersRepositories usersRepositories) {
        this.residentRepositories = residentRepositories;
        this.usersRepositories = usersRepositories;
    }

    public void seed() {
        try {
            if (!residentRepositories.existsById(1)) {
                ResidentModel resident = new ResidentModel();
                UsersModel usersModel = usersRepositories.findById(2).orElse(null);

                resident.setIdUser(usersModel);
                resident.setNationalIdNumber("1234567890123456");
                resident.setFullName("Rafi Abiyyu Airlangga");
                resident.setAge(20);
                resident.setGender(Gender.LAKI_LAKI);
                resident.setHeight(175);
                resident.setWeight(70);
                resident.setPhysicalActivityLevel("Aktif Sedang (kerja fisik ringan)");
                resident.setHealthGoal(HealthGoal.MENINGKATKAN_MASSA_OTOT);
                resident.setCreatedAt(Instant.now());
                resident.setUpdatedAt(LocalDateTime.now());

                residentRepositories.save(resident);

                log.info("Resident seeded successfully.");
            } else {
                log.warn("Resident already seeded.");
            }
        } catch (Exception e) {
            log.error("Error seeding resident: {}", e.getMessage());
        }
    }
}