package com.hellsfood.config

import com.google.common.base.Predicate
import com.google.common.base.Predicates
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import springfox.documentation.builders.ApiInfoBuilder
import springfox.documentation.builders.PathSelectors
import springfox.documentation.builders.RequestHandlerSelectors
import springfox.documentation.service.*
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spi.service.contexts.SecurityContext
import springfox.documentation.spring.web.plugins.Docket
import springfox.documentation.swagger.web.UiConfiguration
import springfox.documentation.swagger.web.UiConfigurationBuilder
import springfox.documentation.swagger2.annotations.EnableSwagger2
import java.util.*

@Configuration
@EnableSwagger2
class SwaggerConfig {
    //  Swagger-UI 2.x 확인
    //	http://localhost:8019/swagger-ui.html
    private val version = "0.0.1-SNAPSHOT"
    private val title = "HellsFood 개인 잔반 정보 백엔드 API 테스트"
    private fun apiInfo(): ApiInfo {
        val descript = "HellsFood 개인 잔반 정보 백엔드 API 테스트 환경<br/>"
        // HellsFood 로고 들어가면 여기에 넣기
        // descript += "<img src=\"http://localhost:9999/vue/static/assets/img/logo.png\">";
        return ApiInfoBuilder()
            .title(title)
            .description(descript)
            .contact(Contact("HellsFood", "https://github.com/CPFrog", "kokk012@naver.com"))
            .license("CPFrog License")
            .licenseUrl("kokk012@naver.com")
            .version(version)
            .build()
    }

    @Bean
    fun allApi(): Docket {
        return getDocket("전체", Predicates.or(PathSelectors.regex("/*.*")))
    }

    fun getDocket(groupName: String?, predicate: Predicate<String?>?): Docket {
        return Docket(DocumentationType.SWAGGER_2)
            .groupName(groupName)
            .apiInfo(apiInfo())
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.hellsfood.api"))
            .paths(predicate)
            .apis(RequestHandlerSelectors.any())
            .build()
            .securityContexts(Arrays.asList(securityContext()))
            .securitySchemes(Arrays.asList(accessToken()))
    }

    // swagger ui 설정.
    @Bean
    fun uiConfig(): UiConfiguration {
        return UiConfigurationBuilder.builder().displayRequestDuration(true).validatorUrl("").build()
    }

    private fun accessToken(): ApiKey {
        return ApiKey("JWT", "Authorization", "header")
    }

    private fun securityContext(): SecurityContext {
        return SecurityContext
            .builder()
            .securityReferences(defaultAuth()).forPaths(PathSelectors.any()).build()
    }

    fun defaultAuth(): List<SecurityReference> {
        val authorizationScope = AuthorizationScope("global", "accessEverything")
        val authorizationScopes = arrayOfNulls<AuthorizationScope>(1)
        authorizationScopes[0] = authorizationScope
        return Arrays.asList(SecurityReference("JWT", authorizationScopes))
    }
}