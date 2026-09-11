# Comandos útiles (BackOffice · Tema 12)

### 1. Compilar y correr tests (todo el multi-módulo)
```bash
mvn clean verify
```
- Compila `contracts`, infraestructura y los 2 servicios.
- Ejecuta los tests unitarios (reportes en `target/surefire-reports/`).

### 2. Revisar calidad (Checkstyle + PMD)
```bash
mvn verify -Dcheckstyle.failOnViolation=true
mvn pmd:pmd          # reporte en target/site/pmd.html
mvn pmd:cpd          # código duplicado en target/site/cpd.html
mvn javadoc:javadoc  # documentación en docs/java_doc
```

### 3. Levantar la infraestructura (BD, Kafka, Eureka, Config, Gateway local)
```bash
docker compose -f .compose/docker-compose.yml up -d
```

### 4. Correr un servicio en local (con perfil docker)
```bash
cd BE/administration-service
mvn spring-boot:run -Dspring-boot.run.profiles=docker
```

### 5. Verificar health
- Gateway local: http://localhost:8080/api/administration/health
- Eureka: http://localhost:8761
- Swagger (admin): http://localhost:8092/swagger-ui.html

### 6. Wrapper Maven (si no tenés Maven instalado)
```bash
mvn -N wrapper:wrapper
./mvnw clean verify
```