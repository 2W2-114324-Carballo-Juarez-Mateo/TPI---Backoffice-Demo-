package ar.edu.utn.frc.tup.p4.backoffice.reporting.api;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Endpoints de salud e información del servicio de reporting.
 */
@RestController
@RequestMapping("/api/reports")
public class HealthController {

    /**
     * Verificación de vida del servicio.
     *
     * @return estado ok
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "ok", "service", "reporting-service"));
    }
}