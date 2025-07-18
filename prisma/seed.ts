import { PrismaClient } from "generated/prisma";
import { randomBytes, createCipheriv, createDecipheriv } from "crypto";

class Seeder {
  private prisma = new PrismaClient();
  private readonly ENCRYPTION_KEY = Buffer.from(process.env["ENCRYPTION_KEY"] || "12345678901234567890123456789012");
  private readonly IV = randomBytes(16);

  public async run() {
    try {
      await this.prisma.pengguna.createMany({
        data: [
          {
            id_pengguna: "1",
            nama_lengkap: "Administrator",
            surel: "admin@sehatin.com",
            kata_sandi: this.encrypt("admin123"),
            peran: "admin",
          },
          {
            id_pengguna: "2",
            nama_lengkap: "User",
            surel: "user@sehatin.com",
            kata_sandi: this.encrypt("user123"),
            peran: "user",
          },
        ],
      });

      console.log("Seed berhasil!");
    } catch (error) {
      console.error(`Gagal melakukan seed: ${error}`);
      process.exit(1);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  encrypt(text: string): string {
    const cipher = createCipheriv("aes-256-cbc", this.ENCRYPTION_KEY, this.IV);
    const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
    return `${this.IV.toString("hex")}:${encrypted.toString("hex")}`;
  }

  decrypt(data: string): string {
    const [ivHex, encryptedHex] = data.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const decipher = createDecipheriv("aes-256-cbc", this.ENCRYPTION_KEY, iv);
    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
  }
}

new Seeder().run();