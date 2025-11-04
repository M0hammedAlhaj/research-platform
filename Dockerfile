# Build stage
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy Maven wrapper files first
COPY mvnw .
COPY .mvn .mvn

# Copy pom.xml and download dependencies (cache layer)
COPY pom.xml .
RUN ./mvnw dependency:go-offline -B || true

# Copy the source code
COPY src ./src

# Build the project
RUN ./mvnw clean package -DskipTests

# Run stage (lighter image)
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
