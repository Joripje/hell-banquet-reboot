package com.hellsfood.client.menu;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "menuService", url = "j8a802.p.ssafy.io:8040/menus")
public interface MenuServiceClient {

	@GetMapping("/feature")
	String getFeatureOfMenu(@RequestParam String managerId, @RequestParam String date, @RequestParam String type);

}
