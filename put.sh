docker rm guessSong -f
docker rmi guesssong
docker build -t guesssong /projects/guessSong
docker run -v /projects/guessSong/src:/projects/guessSong/src -v /192.168.10.90:/192.168.10.90 -d -p 3001:3000 -e TZ=Asia/Taipei --name guessSong --restart always guesssong