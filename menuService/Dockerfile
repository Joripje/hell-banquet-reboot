FROM adoptopenjdk/openjdk11 AS builder
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootJAR

FROM adoptopenjdk/openjdk11
VOLUME /tmp
COPY --from=builder build/libs/hell-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8040
ENTRYPOINT ["java", "-jar", "/app.jar"]
