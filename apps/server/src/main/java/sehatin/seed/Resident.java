package sehatin.seed;

import java.time.Instant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import sehatin.models.ResidentModels;
import sehatin.repositories.ResidentRepositories;

@Component
public class Resident {
    private final ResidentRepositories residentRepositories;
    private static final Logger logger = LoggerFactory.getLogger(Resident.class);

    public Resident(ResidentRepositories residentRepositories) {
        this.residentRepositories = residentRepositories;
    }

    public void seed() {
        try {
            if (!residentRepositories.existsById(1)) {
                ResidentModels resident = new ResidentModels();
                resident.setIdUser(2);
                resident.setNationalIdNumber("1234567890123456");
                resident.setFullName("Rafi Abiyyu Airlangga");
                resident.setAge(20);
                resident.setGender("Laki-laki");
                resident.setHeight(175);
                resident.setWeight(70);
                resident.setPhysicalActivityLevel("Aktif Sedang (kerja fisik ringan)");
                resident.setHealthGoal("Meningkatkan Massa Otot");
                resident.setCreatedAt(Instant.now());
                resident.setUpdatedAt();

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