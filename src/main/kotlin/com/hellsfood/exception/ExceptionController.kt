package com.hellsfood.exception

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus

@ControllerAdvice
class ExceptionController {

    @ExceptionHandler(AlreadyCompletedException::class)
    fun handleAlreadyCompletedException(e: AlreadyCompletedException): ResponseEntity<String> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.message)
    }

    @ExceptionHandler(LeftoverNotFoundException::class)
    fun handleLeftoverNotFoundException(ex: LeftoverNotFoundException): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse("LEFTOVER_NOT_FOUND", ex.message)
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response)
    }

    @ExceptionHandler(FutureDateException::class)
    fun handleFutureDateException(ex: FutureDateException): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse("FUTURE_DATE", ex.message)
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response)
    }

    @ExceptionHandler(Exception::class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    fun handleInternalServerError(ex: Exception): ErrorResponse {
        return ErrorResponse("INTERNAL_SERVER_ERROR", ex.message ?: "Unexpected error occurred")
    }

    data class ErrorResponse(val code: String, val message: String?)
}
