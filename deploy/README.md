# Despliegue del Back en Oracle Cloud Free Tier (Always Free)

> Sirve el **back completo** (Eureka, Config, Gateway, admin :8092, reporting :8093, 2 Postgres, Kafka) corriendo el mismo `docker compose` local. El front sigue en GitHub Pages.

## 1 · Crear la cuenta y la VM (una vez)

1. Creá cuenta en [oracle.com/cloud/free](https://signup.cloud.oracle.com) (te piden tarjeta, **no cobran**).
2. Consola → **Compute → Instances → Create instance**:
   - **Image:** Ubuntu 22.04 (o Oracle Linux 8) · **Shape:** *VM.Standard.A1.Flex* (Always Free, Ampere ARM, 4 OCPU / 24 GB).
   - **SSH:** subí tu clave pública.
3. En **Networking → VCN → Security List (Ingress)**, abrí los puertos:
   - `8080` (gateway), `8761` (Eureka UI), `8092`/`8093`, `8888`, `22` (SSH).
   - `5432`/`5433`/`9092` solo si necesitás acceder a las DB/Kafka desde afuera (para la demo no hace falta).

## 2 · Conectarse y preparar (una vez)

```bash
ssh ubuntu@<IP_PUBLICA>
sudo apt-get update && sudo apt-get install -y git
git clone https://github.com/2W2-114324-Carballo-Juarez-Mateo/TPI---Backoffice-Demo-.git
cd TPI---Backoffice-Demo-
bash deploy/setup-vm.sh     # instala Docker + Compose (pedirá cerrar sesión y volver a entrar)
```

## 3 · Deploy (cada vez que quieras actualizar)

```bash
cd ~/backoffice-demo          # o la carpeta del repo
bash deploy/deploy.sh         # git pull + build + up + health check
```

La primera vez buildea las 5 imágenes (descarga dependencias Maven): **10–20 min**. Las siguientes son rápidas. Los datos quedan en los volúmenes nombrados (persisten entre reinicios de la VM).

## 4 · Verificar

- Gateway: `http://<IP_PUBLICA>:8080/api/administration/health` → `{"status":"ok",...}`
- Eureka UI: `http://<IP_PUBLICA>:8761` (deberían verse ADMINISTRATION-SERVICE, REPORTING-SERVICE, GATEWAY-LOCAL).

## Notas

- **Kafka** se publica solo dentro de la red Docker (`kafka:9092`); para consumir desde tu máquina habría que exponer `9092` y configurar el listener con la IP pública.
- **Seguridad:** cambiá `DATABASE_PASSWORD` en `.compose/.env` (ese archivo NO se sube al repo). No abras `5432`/`5433` a Internet salvo que sea estrictamente necesario.
- La VM **Always Free** no se apaga automáticamente; para ahorrar recursos podés `docker compose stop` cuando no la uses.