#Deriving the latest base image
FROM python:latest


#Labels as key value pair
# LABEL Maintainer="roushan.me17"


# Any working directory can be chosen as per choice like '/' or '/home' etc
# i have chosen /usr/app/src
WORKDIR /usr/app/src

COPY requirements.txt ./

RUN pip install --no-cache-dir --upgrade pip \
  && pip install --no-cache-dir -r requirements.txt
# RUN pip install -r requirements.txt 

#to COPY the remote file at working directory in container
COPY python.py ./
COPY model.pth ./

# Now the structure looks like this '/usr/app/src/test.py'
EXPOSE 8000


#CMD instruction should be used to run the software
#contained by your image, along with any arguments.

CMD [ "python", "./python.py"]











# # Dockerfile
# FROM python:3.10.4-slim-buster
# RUN pip install --upgrade pip

# RUN useradd -m myuser
# USER myuser
# WORKDIR /home/myuser

# COPY --chown=myuser:myuser requirements.txt requirements.txt
# COPY --chown=myuser:myuser python.py flaskapp.py
# RUN pip install --user -r requirements.txt

# ENV PATH="/home/myuser/.local/bin:${PATH}"
# ENV FLASK_APP=python
# ENV FLASK_RUN_PORT=8080
# ENV FLASK_RUN_HOST=0.0.0.0

# CMD ["flask", "run"]