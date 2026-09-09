package ar.edu.utn.frc.tup.p4.backoffice.reporting;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * Servicio de Reporting y Analítica del Backoffice.
 * Read models tenant-scoped por course_id + RLS; ingesta de datos de otros temas.
 */
@SpringBootApplication
@EnableDiscoveryClient
public class ReportingServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReportingServiceApplication.class, args);
    }
}