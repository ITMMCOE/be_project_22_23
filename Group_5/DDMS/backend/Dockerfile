FROM node:16

 
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    pip3 install --upgrade pip && apt-get install -y python3-venv  && apt-get install -y tesseract-ocr

 
WORKDIR /app

 
COPY package*.json ./

 
RUN npm i

 
COPY ./computationalUnit /app/computationalUnit

 
RUN python3 -m venv venv && \
    . venv/bin/activate

 
RUN pip3 install -r /app/computationalUnit/requirements.txt

 
COPY . .

 
EXPOSE 5000

 
ENV NODE_ENV=production

 
CMD [ "npm", "start" ]

