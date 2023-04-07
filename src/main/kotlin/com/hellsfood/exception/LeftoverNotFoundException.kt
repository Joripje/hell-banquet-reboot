package com.hellsfood.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.NOT_FOUND)
class LeftoverNotFoundException(message: String, val errorCode: String = "LEFTOVER_NOT_FOUND") : RuntimeException(message)
