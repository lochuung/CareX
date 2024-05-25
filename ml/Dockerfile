# backend/Dockerfile

FROM python:3.10.8

RUN apt-get update

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 5050

CMD ["uvicorn","main:app","--host","0.0.0.0","--port","5050","--reload"]

# uvicorn main:app --host 0.0.0.0 --port 5050 --reload