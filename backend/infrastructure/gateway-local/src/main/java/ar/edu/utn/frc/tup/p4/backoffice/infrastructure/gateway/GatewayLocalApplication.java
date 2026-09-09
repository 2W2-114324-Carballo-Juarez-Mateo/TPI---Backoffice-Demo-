package ar.edu.utn.frc.tup.p4.backoffice.infrastructure.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * Gateway local que SIMULA el API Gateway de plataforma (T01).
 * En integración real, el tráfico pasa por el gateway de T01.
 */
@SpringBootApplication
@EnableDiscoveryClient
public class GatewayLocalApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayLocalApplication.class, args);
    }
}