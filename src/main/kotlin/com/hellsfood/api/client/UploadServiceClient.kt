package com.hellsfood.api.client

import com.hellsfood.api.client.dto.JanbaniDto
import com.hellsfood.api.client.dto.JanbaniUpdateRequestDto
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@FeignClient(name = "uploadService", url = "j8a802.p.ssafy.io:8061/janban")
//@FeignClient(name = "uploadService", url = "localhost:8061/janban")
interface UploadServiceClient {

	@GetMapping("/hasJanbani")
	fun hasJanbani(@RequestParam userId: String, @RequestParam today: String): Boolean

	@PutMapping("/updateJanbani")
	fun updateJanbaniCode(@RequestBody requestDto: JanbaniUpdateRequestDto): ResponseEntity<JanbaniDto>

}