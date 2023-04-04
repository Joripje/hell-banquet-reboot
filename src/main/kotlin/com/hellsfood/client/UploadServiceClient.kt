package com.hellsfood.client

import com.hellsfood.common.JanbaniDto
import com.hellsfood.common.JanbaniUpdateRequestDto
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