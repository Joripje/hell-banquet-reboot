package com.function.menu.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.function.menu.domain.Menu;
import com.function.menu.dto.MenuSaveRequestDto;
import com.function.menu.service.MenuService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/meals")
public class MenuController {

	private final MenuService menuService;

	@ApiOperation("모든 식단 리스트 조회")
	@GetMapping("")
	public List<Menu> getAllMeals() {
		return menuService.getAllMenus();
	}

	@ApiOperation(value = "{id}에 해당하는 식단 단건 조회")
	@GetMapping("/{id}")
	public Menu getMealById(@PathVariable Long id) {
		return menuService.findMenuById(id);
	}

	@ApiOperation(
		value = "조건별 식단 리스트 조회",
		notes = "{managerId}에 해당하는 영양사가 작성한 식단 리스트를 조회한다."
	)
	@GetMapping("/manager/{managerId}")
	public List<Menu> getMealByManagerId(@PathVariable String managerId) {
		return menuService.findMenuByManagerId(managerId);
	}

	@ApiOperation(
		value = "조건별 식단 리스트 조회",
		notes = "{managerId}에 해당하는 영양사가 {date}에 작성한 식단 리스트를 조회한다."
	)
	@GetMapping("/detail/{managerId}")
	public List<Menu> getMealByManagerIdAndDate(@PathVariable String managerId,
		@RequestParam("date") String date) {
		return menuService.getMenusByManagerIdAndDate(managerId, date);
	}

	@ApiOperation(
		value = "조건별 식단 리스트 조회",
		notes = "{managerId}에 해당하는 영양사가 {date}에 작성한 식단 리스트 중 {type}에 해당하는 식단를 조회한다."
	)
	@GetMapping("/detail/type/{managerId}")
	public Menu getMealByManagerIdAndDateAndType(@PathVariable String managerId,
		@RequestParam("date") String date,
		@RequestParam("type") String type) {
		return menuService.getMenusByManagerIdAndDateAndType(managerId, date, type);
	}

	@ApiOperation("식단 생성")
	@PostMapping("")
	public Menu createMeal(@RequestBody MenuSaveRequestDto menu) {
		return menuService.save(menu);
	}

	@ApiOperation("{id}에 해당하는 식단 삭제")
	@DeleteMapping("/{id}")
	public void deleteMenu(@PathVariable Long id) {
		menuService.deleteMenu(id);
	}

}
