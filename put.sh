docker rm guessSong -f
docker rmi guesssong
docker build -t guesssong /projects/guessSong
docker run -d -p 3001:3000 -e TZ=Asia/Taipei --name guessSong --restart always guesssong