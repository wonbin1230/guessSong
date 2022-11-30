ocker rm guessSong -f
docker rmi guessSong
docker build -t guessSong /projects/guessSong
docker run -d -p 3001:3000 -e TZ=Asia/Taipei --name guessSong --restart always guessSong