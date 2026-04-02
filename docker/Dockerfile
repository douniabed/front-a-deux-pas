# Production image using pre-built artifacts from CI pipeline

# Uses a lightweight Nginx Alpine image to serve the application
FROM nginx:alpine

# Create a non-root user
RUN adduser -D -h /home/app -u 1000 app
WORKDIR /home/app

# Copies the pre-built files from CI pipeline to the app home
COPY --chown=app:app dist/front/browser /home/app

# Copies the custom Nginx configuration file to app home
COPY --chown=app:app docker/nginx.conf /home/nginx.conf

USER app

# Indicates that the container will listen on port 1080
EXPOSE 1080

# Runs Nginx
CMD ["nginx", "-c", "/home/nginx.conf", "-p", "/home/app"]
