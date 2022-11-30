FROM node:16
RUN mkdir -p /projects/guessSong
COPY . /projects/guessSong
WORKDIR /projects/guessSong
ENV TZ=Asia/Taipei
RUN npm i pm2 -g
RUN npm i
RUN apt-get -y update && apt-get -y upgrade && apt-get install -y --no-install-recommends ffmpeg
EXPOSE 3000
CMD ["pm2-runtime", "bin/www"]