package com.hellsfood.client.leftover;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

// @FeignClient(name = "leftoverService", url = "localhost:8019/leftovers")
@FeignClient(name = "leftoverService", url = "j8a802.p.ssafy.io:8019/leftovers")
public interface LeftoverServiceClient {

	@GetMapping("/{date}")
	List<Leftover> getLeftoversByDate(@PathVariable String date);

}
