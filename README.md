# AhaarSetu Introductions

- 1. Creating .dockerignore
- 2. creating Dockerfile
- 3. creating docker-compose.yml
- 4. docker build -t  name .
- 5. docker run -p 3000:3000 name  ( this would start the server And you can explore your site)


---

## 📦 1. **Docker Installation & Basics**

### ✅ Check Docker version

```bash
docker -v
docker version
```

### ✅ Check Docker system status

```bash
docker info
```

---

## 🛠️ 2. **Working with Images**

### ✅ Build an image from a Dockerfile

```bash
docker build -t your-app-name .
```

### ✅ List all local images

```bash
docker images
```

### ✅ Remove an image

```bash
docker rmi image_name_or_id
```

### ✅ Pull an image from Docker Hub

```bash
docker pull node:18
```

---

## 🚢 3. **Working with Containers**

### ✅ Run a container

```bash
docker run -d -p 3000:3000 your-app-name
```

### ✅ Run a container with an interactive shell

```bash
docker run -it node bash
```

### ✅ Stop a container

```bash
docker stop container_id_or_name
```

### ✅ Start a stopped container

```bash
docker start container_id_or_name
```

### ✅ Remove a container

```bash
docker rm container_id_or_name
```

### ✅ View running containers

```bash
docker ps
```

### ✅ View all containers (including stopped ones)

```bash
docker ps -a
```

---

## 🔍 4. **Debugging and Logs**

### ✅ View container logs

```bash
docker logs container_id_or_name
```

### ✅ Attach terminal to a running container

```bash
docker attach container_id
```

### ✅ Execute a command inside a container

```bash
docker exec -it container_id bash
```

---

## 📁 5. **Volumes and Data Persistence**

### ✅ Create a volume

```bash
docker volume create my-volume
```

### ✅ Use a volume with a container

```bash
docker run -v my-volume:/app/data my-image
```

### ✅ List volumes

```bash
docker volume ls
```

### ✅ Remove a volume

```bash
docker volume rm my-volume
```

---

## 🌐 6. **Networks**

### ✅ Create a custom network

```bash
docker network create my-network
```

### ✅ Connect a container to a network

```bash
docker network connect my-network container_name
```

### ✅ List networks

```bash
docker network ls
```

---

## 🧱 7. **Docker Compose**

> Used for defining and running multi-container Docker apps.

### ✅ Run services defined in `docker-compose.yml`

```bash
docker-compose up
```

### ✅ Run and rebuild containers

```bash
docker-compose up --build
```

### ✅ Stop all services

```bash
docker-compose down
```

---

## 🧼 8. **Cleanup Commands**

### ✅ Remove all stopped containers

```bash
docker container prune
```

### ✅ Remove unused images

```bash
docker image prune
```

### ✅ Remove unused volumes

```bash
docker volume prune
```

### ✅ Remove everything not used

```bash
docker system prune -a
```

---

## 📦 9. **Tagging and Pushing to Docker Hub**

### ✅ Tag an image

```bash
docker tag local-image-name username/image-name:tag
```

### ✅ Login to Docker Hub

```bash
docker login
```

### ✅ Push image to Docker Hub

```bash
docker push username/image-name:tag
```

---

## 📚 10. **Dockerfile Features You Should Explore**

| Feature            | Example                                   |
| ------------------ | ----------------------------------------- |
| Multi-stage builds | Reduce image size (like `builder` stage)  |
| ENV                | `ENV NODE_ENV=production`                 |
| ARG                | Build-time variable: `ARG PORT=3000`      |
| COPY vs ADD        | Use `COPY` unless you need `ADD` features |
| HEALTHCHECK        | Monitor container health                  |

---

## 🚀 Advanced Exploration Ideas

* ✅ Use **bind mounts** for hot-reload in dev:

  ```bash
  docker run -v $(pwd):/app -p 3000:3000 your-app-name
  ```

* ✅ Learn about **Docker Swarm** for orchestration

* ✅ Use **Docker Compose with `.env` files**

* ✅ Set up **CI/CD with GitHub Actions** + Docker

---



FOr Nginx 

Make a file nginx/default.conf
and then change in the docker-compose.yml
and then use `docker-compose up --build`
how this will work entering into the localhost this will directly enter into the `:3000` port 

in this `port:80` mapped to the `port:3000` internally and handled by the `nginx` itself!!!!

