FROM ubuntu

WORKDIR /usr/src/app

COPY requirements.txt .

RUN apt -y update
RUN apt -y upgrade
RUN apt -y install python3 python3-pip

RUN useradd -ms /bin/bash server

RUN chown -R server:server /usr/src/app

USER server

RUN pip install --break-system-packages --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python3", "./src/server.py" ]