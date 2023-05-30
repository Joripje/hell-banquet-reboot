package com.hellsfood.api;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hellsfood.domain.Menu;
import com.hellsfood.dto.ExcelizedMenuRegisterRequestDto;
import com.hellsfood.dto.ExcelizedMenuRegisterResultDto;
import com.hellsfood.dto.MenuSaveRequestDto;
import com.hellsfood.service.MenuService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/menus")
public class MenuController {

	private final MenuService menuService;

	@ApiOperation(value = "식단 목록 조회 - 단순 Crud 테스트를 위한 API")
	@GetMapping
	public ResponseEntity<List<Menu>> getAllMenus() {
		return ResponseEntity.ok(menuService.getAllMenus());
	}

	@ApiOperation(value = "식단 상세 조회 - find by id")
	@GetMapping("/{id}")
	public ResponseEntity<Menu> getOneMenuById(@PathVariable Long id) {
		return ResponseEntity.ok(menuService.findMenuById(id));
	}

	@ApiOperation(value = "식단 상세 조회 - {date}에 작성한 식단 리스트")
	@GetMapping("/date")
	public ResponseEntity<List<Menu>> getMenusByManagerIdAndDate(@RequestParam String managerId,
		@RequestParam String date) {
		return ResponseEntity.ok(menuService.getMenusByManagerIdAndDate(managerId, date));
	}

	@ApiOperation(value = "식단 상세 조회 - {date}에 작성한 코스 {type}에 해당하는 식단")
	@GetMapping("/type")
	public ResponseEntity<Menu> getMenuByManagerIdAndDateAndType(
		@RequestParam("managerId") String managerId, @RequestParam String date, @RequestParam String type) {
		return ResponseEntity.ok(menuService.getMenusByManagerIdAndDateAndType(managerId, date, type));
	}

	@ApiOperation(value = "식단 생성")
	@PostMapping
	public ResponseEntity<Menu> createMenu(@RequestBody MenuSaveRequestDto menu) {
		return ResponseEntity.ok(menuService.createMenu(menu));
	}

	@ApiOperation(value = "식단 삭제")
	@DeleteMapping("/{id}")
	public void removeMenu(@PathVariable Long id) {
		menuService.deleteMenu(id);
	}

	@ApiOperation(value = "식단 특성 반환")
	@GetMapping("/feature")
	public String getFeatureOfMenu(@RequestParam String managerId, @RequestParam String date, @RequestParam String type) {
		return menuService.getFeatureOfMenu(managerId, date, type);
	}

	@PostMapping("/all")
	@ApiOperation(value = "일괄 식단 등록 처리", notes = "엑셀 파일로 저장된 메뉴 정보를 기반으로 일괄 식단 등록")
	public ResponseEntity<List<ExcelizedMenuRegisterResultDto>> createAllMenusUsingFile(
		@RequestParam("file") @ApiParam(value = "일괄 식단 요청 정보 xlsx 파일", required = true) MultipartFile file) {

		String contentType = file.getContentType();

		if (Objects.isNull(contentType) || (!contentType.equals("application/vnd.ms-excel") && !contentType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))) {
			return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(null);
		}

		try (Workbook workbook = WorkbookFactory.create(file.getInputStream())) {
			List<ExcelizedMenuRegisterResultDto> resultList = menuService.createAllMenus(workbook);
			return ResponseEntity.ok().body(resultList);
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PostMapping("/convert")
	@ApiOperation(value = "일괄 식단 등록 결과 리스트를 xlsx 파일 변환", notes = "웹 페이지상에 보여지고 있는 일괄 식단 등록 결과 리스트를 엑셀파일(xlsx)로 변환해준다.")
	public ResponseEntity<String> listToExcel(
		@RequestBody @ApiParam(value = "변환 요청 정보", required = true) List<ExcelizedMenuRegisterRequestDto> list,
		HttpServletResponse response) {
		try {
			menuService.listToExcel(list, response);
			return ResponseEntity.ok("리스트 변환에 성공하였습니다.");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리스트 변환 중 오류가 발생했습니다.");
		}
	}

}
