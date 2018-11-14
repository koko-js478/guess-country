FROM python:3.6

#   Update and install gdal
RUN apt-get -y update && apt-get -y upgrade && apt-get install -y libgdal-dev

#   Create app directory
RUN mkdir -p /usr/src/country_guessr

#   Add django source files to app directory
ADD . /usr/src/country_guessr

#   Specifiy default workspace for container
WORKDIR /usr/src/country_guessr

#   Install requirements including Django
RUN pip install --upgrade pip && pip install -r requirements.txt

#   Expose Django port
EXPOSE 80

#   Launch django
CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]
