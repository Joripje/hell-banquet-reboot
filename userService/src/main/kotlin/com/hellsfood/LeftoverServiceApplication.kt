package com.hellsfood

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.openfeign.EnableFeignClients

@EnableFeignClients
@SpringBootApplication
class LeftoverServiceApplication

fun main(args: Array<String>) {
    runApplication<LeftoverServiceApplication>(*args)
}
