docker rm guessSong -f
docker rmi guesssong
docker build -t guesssong /projects/guessSong/put.sh
docker run -v /projects/guessSong:/projects/guessSong -d -p 3001:3000 -e TZ=Asia/Taipei --name guessSong --restart always guesssong