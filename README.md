# README
A scaffold for a fullstack web application with the following technologies.
* remix
* tailwind
* chakra-ui
* prisma
* biome
* zod
* vitest
* sass


# Article
The outcome of <https://zenn.dev/tmtk75/scraps/aa82ab594e4c24>

# Dockernize
```
docker build -t my-app .
```
```
my_ip=${your_ipaddr}
docker run \
    -e DATABASE_URL=postgres://admin:abc123@${my_ip}/example \
    -e AWS_ENDPOINT_URL=http://${my_ip}:4566 \
    -e AWS_ACCESS_KEY_ID=fake \
    -e AWS_SECRET_ACCESS_KEY=fake \
    -p 3000:3000 my-app
```
```
docker compose -f compose.yml -f compose.my-app.yml up
```
