package sehatin.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Url {
    @Value("${url.production}")
    private String urlForProduction;

    @Value("${url.development}")
    private String urlForDevelopment;

    @Value("${env.mode}")
    private String environmentMode;

    public String getActiveUrl() {
        return isProduction() ? urlForProduction : urlForDevelopment;
    }

    public boolean isProduction() {
        return "production".equalsIgnoreCase(environmentMode);
    }

    public boolean isDevelopment() {
        return "development".equalsIgnoreCase(environmentMode);
    }
}