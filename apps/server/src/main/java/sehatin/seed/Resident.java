package sehatin.seed;

import java.time.Instant;
import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import sehatin.enums.Gender;
import sehatin.enums.HealthGoal;
import sehatin.models.ResidentModel;
import sehatin.models.UsersModel;
import sehatin.repositories.ResidentRepositories;
import sehatin.repositories.UsersRepositories;

@Component
public class Resident {
    private final ResidentRepositories residentRepositories;
    private final UsersRepositories usersRepositories;
    private static final Logger logger = LoggerFactory.getLogger(Resident.class);

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

                logger.info("Resident seeded successfully.");
            } else {
                logger.warn("Resident already seeded.");
            }
        } catch (Exception e) {
            logger.error("Error seeding resident: {}", e.getMessage());
        }
    }
}