# Widget de Reseñas de Facebook

Este widget muestra las reseñas de una página de Facebook usando el SDK de Facebook. Para desarrollo local, se usa **ngrok** para exponer la aplicación a través de HTTPS.

## Requisitos

- Una aplicación en [Facebook for Developers](https://developers.facebook.com/).
- [ngrok](https://ngrok.com/) instalado.

## Configuración

1. **Clona este repositorio**:
   ```bash
   git clone https://github.com/MarcoMescuaMicha/Widget-de-Elfsight-Rewiews-de-Facebook.git
   cd Widget-de-Elfsight-Rewiews-de-Facebook
   Configura tu App ID:
2. **Configura tu App ID**:
Abre index.html y reemplaza TU_APP_ID con el App ID de tu aplicación.

3. **Inicia un servidor local**:

Usa Live Server o cualquier servidor local (por ejemplo, http-server).

4. **Expón tu servidor con ngrok**:

ngrok http 5500
Usa la URL HTTPS generada por ngrok (por ejemplo, https://abc123.ngrok.io).

5. **Configura el dominio en Facebook**:

Ve a Facebook for Developers.
En "Configuración" > "Dominios de la aplicación", agrega el dominio de ngrok (por ejemplo, abc123.ngrok.io).

## USO

-Accede a la URL de ngrok (por ejemplo, https://abc123.ngrok.io).
-Inicia sesión con Facebook para ver las reseñas.

## LINK DE PRUEBA 
https://98f0-38-172-129-97.ngrok-free.app
http://localhost:5500 


