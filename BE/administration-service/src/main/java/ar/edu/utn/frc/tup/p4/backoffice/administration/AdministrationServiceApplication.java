package ar.edu.utn.frc.tup.p4.backoffice.administration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * Servicio de Administración y Configuración del Backoffice.
 * Dueño de la configuración global (PAR-01..24) y de la gestión de administradores y modelos LLM.
 */
@SpringBootApplication
@EnableDiscoveryClient
public class AdministrationServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdministrationServiceApplication.class, args);
    }
}