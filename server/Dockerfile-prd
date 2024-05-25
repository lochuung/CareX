FROM maven:3.8.3-openjdk-17-slim AS build

RUN mkdir /project

COPY . /project

WORKDIR /project

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-alpine

RUN mkdir /app

RUN addgroup -g 1001 -S tiemche

RUN adduser -S huuloc -u 1001

COPY --from=build /project/target/*.jar /app/carex.jar

WORKDIR /app

RUN chown -R huuloc:tiemche /app

CMD java $JAVA_OPTS -jar carex.jar