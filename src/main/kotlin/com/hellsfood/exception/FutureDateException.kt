package com.hellsfood.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.BAD_REQUEST)
class FutureDateException(message: String, val errorCode: String = "FUTURE_DATE") : RuntimeException(message)
