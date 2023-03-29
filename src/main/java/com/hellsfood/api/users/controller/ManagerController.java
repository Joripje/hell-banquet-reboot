package com.hellsfood.api.users.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FilenameUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hellsfood.api.users.dto.ExcelizedUserRegisterResultDto;
import com.hellsfood.api.users.service.ManagerService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(tags = "매니저용 회원관리 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/managers")
public class ManagerController {
	private final ManagerService managerService;

	@PostMapping("/register/all")
	@ApiOperation(value = "일괄 회원가입 처리", notes = "엑셀 파일로 저장된 회원 정보를 기반으로 순차적으로 회원 가입을 진행한다.")
	public ResponseEntity registerUsers(
		@RequestParam("file") @ApiParam(value = "일괄 회원가입 요청 정보 xlsx 파일", required = true) MultipartFile file,
		HttpServletRequest request) {

		String extension = FilenameUtils.getExtension(file.getOriginalFilename());

		if (!extension.contains("xls")) {
			return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body("지원되는 엑셀 파일 확장자가 아닙니다.");
		}

		Workbook workbook = null;

		try {
			if (extension.equals("xlsx")) {
				workbook = new XSSFWorkbook(file.getInputStream());
			} else if (extension.equals("xls")) {
				workbook = new HSSFWorkbook(file.getInputStream());
			}
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("엑셀 파일을 읽는 중 오류가 발생하였습니다.");
		}
		String accessToken = null;
		try {
			accessToken = request.getHeader("Authorization").substring(7);
		} catch (NullPointerException e) {
			// accessToken을 null 상태로 둠으로써 groupID 정보가 추가되지 않도록 합니다.
			// 따라서 이 블럭에서 처리할 코드는 없습니다.
		}
		List<ExcelizedUserRegisterResultDto> resultList = managerService.registerUsers(workbook, accessToken);
		if (resultList != null) {
			return ResponseEntity.ok(resultList);
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("가입 처리중 오류가 발생했습니다.");
		}
	}

	@PostMapping("/convert")
	@ApiOperation(value = "일괄 회원가입 결과 리스트를 xlsx 파일 변환", notes = "웹 페이지상에 보여지고 있는 일괄 회원가입 결과 리스트를 엑셀파일(xlsx)로 변환해준다.")
	public ResponseEntity listToExcel(
		@RequestBody @ApiParam(value = "변환 요청 정보", required = true) List<ExcelizedUserRegisterResultDto> list,
		HttpServletResponse response) {
		if (managerService.listToExcel(list, response)) {
			return ResponseEntity.ok("리스트 변환에 성공하였습니다.");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리스트 변환 중 오류가 발생했습니다.");
		}
	}
}
