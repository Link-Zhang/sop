package cn.sh.lz;

import ch.qos.logback.classic.LoggerContext;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.catalina.util.ServerInfo;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.hibernate.validator.HibernateValidator;
import org.springdoc.core.SpringDocConfigProperties;
import org.springframework.boot.SpringBootVersion;
import org.springframework.core.SpringVersion;
import org.postgresql.Driver;
import org.yaml.snakeyaml.Yaml;

import java.util.Properties;

public class Versions {
    public static void main(String[] args) throws Exception {
        Properties p = new Properties();
        System.out.println("Spring Boot: " + SpringBootVersion.getVersion());
        System.out.println("Commons Lang: "+StringUtils.class.getPackage().getImplementationVersion());
        System.out.println("Jackson: " + ObjectMapper.class.getPackage().getImplementationVersion());
        System.out.println("Java: " + System.getProperty("java.version"));
        System.out.println("Hibernate Validator: " + HibernateValidator.class.getPackage().getImplementationVersion());
        System.out.println("Log4j2: " + LogManager.class.getPackage().getImplementationVersion());
        p.load(LoggerContext.class.getResourceAsStream("/META-INF/maven/ch.qos.logback/logback-classic/pom.properties"));
        System.out.println("logback: " + p.getProperty("version"));
        System.out.println("Postgresql: " + Driver.class.getPackage().getImplementationVersion());
        p.load(Yaml.class.getResourceAsStream("/META-INF/maven/org.yaml/snakeyaml/pom.properties"));
        System.out.println("Snakeyaml: " + p.getProperty("version"));
        System.out.println("Spring Framework: " + SpringVersion.getVersion());
        System.out.println("Springdoc: " + SpringDocConfigProperties.class.getPackage().getImplementationVersion());
        System.out.println("Tomcat: " + ServerInfo.getServerNumber());
    }
}
