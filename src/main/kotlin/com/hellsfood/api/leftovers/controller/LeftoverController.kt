package com.hellsfood.api.leftovers.controller

import com.hellsfood.api.leftovers.data.Leftover
import com.hellsfood.api.leftovers.data.Ranking
import com.hellsfood.api.leftovers.dto.DrawingGameRequestDto
import com.hellsfood.api.leftovers.dto.LeftoverRegisterRequestDto
import com.hellsfood.api.leftovers.service.LeftoverService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import lombok.RequiredArgsConstructor
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@Api(tags = ["잔반 정보 API"])
@RequiredArgsConstructor
@RestController
@RequestMapping("/leftovers")
class LeftoverController(
    private val leftoverService: LeftoverService,
) {
    @PostMapping("/register")
    @ApiOperation(value = "식사 기록", notes = "입력받은 음식양을 DB에 저장한다.")
    fun registerLeftover(
        @RequestBody @ApiParam(value = "식사 정보", required = true) requestDto: LeftoverRegisterRequestDto
    ): ResponseEntity<*> {
        val result: Boolean = leftoverService.registerLeftover(requestDto)
        return if (result) {
            ResponseEntity.ok("${requestDto.userId}님의 ${LocalDate.now()}일 식사정보가 기록되었습니다.")
        } else {
            ResponseEntity.badRequest().body("유효하지 않은 저장 요청 정보입니다.")
        }
    }

    @GetMapping("/force_update")
    @ApiOperation(value = "디버깅용 랭킹 테이블 강제 업데이트 요청 함수")
    fun forceUpdateRankingList() {
        leftoverService.refreshRankingTable()
    }

    @GetMapping("/ranking")
    @ApiOperation(value = "일일 랭킹", notes = "")
    fun getDailyRanking(
        @RequestParam("userId") @ApiParam(
            value = "내 랭킹 정보를 조회하고 싶은 사용자 ID. 없으면 그 사용자 ID에 대해서는 검색 안함.",
            required = false
        ) userId: String
    ): ResponseEntity<*> {
        val dailyRanking: List<Ranking> = leftoverService.getRankingList(userId)
        return ResponseEntity.ok(dailyRanking)
    }

    @GetMapping("/analysis")
    @ApiOperation(value = "시작 날짜와 끝 날짜를 기준으로 각각의 코스에 대한 잔반 통계 정보를 반환한다.")
    fun getAnalysisByDateRange(
        @RequestParam @ApiParam(value = "시작 날짜", required = true) startDate: String,
        @RequestParam @ApiParam(value = "종료 날짜", required = true) endDate: String
    ): ResponseEntity<*> {
        return ResponseEntity.ok(leftoverService.getAnalysisByDateRange(startDate, endDate))
    }

    @GetMapping("/detail")
    @ApiOperation(value = "잔반 데이터 상세 조회 - userId & Date")
    fun getLeftoverByUserIdAndDate(
        @RequestParam userId: String, @RequestParam date: String
    ): Leftover {
        return leftoverService.getLeftoverByUserIdAndDate(userId, date)
    }

    @GetMapping("/cookie/check")
    @ApiOperation(value = "쿠키 게임을 할 수 있는지 검사")
    fun isPlayableCookieGame(
        @RequestParam("userId") userId: String,
        @RequestParam today: String
    ): ResponseEntity<Boolean> {
        return ResponseEntity.ok(leftoverService.isPlayableCookieGame(userId, today))
    }

    @GetMapping("/drawing/check")
    @ApiOperation(value = "그림 그리기 게임을 할 수 있는지 검사")
    fun isPlayableDrawingGame(
        @RequestParam("userId") userId: String,
        @RequestParam today: String
    ): ResponseEntity<Boolean> {
        return ResponseEntity.ok(leftoverService.isPlayableDrawingGame(userId, today))
    }

    @PutMapping("/drawing")
    @ApiOperation(value = "게임 결과 반영")
    fun updatePropStatus(
        @RequestBody requestDto: DrawingGameRequestDto
    ): ResponseEntity<Leftover> {
        return ResponseEntity.ok(
            leftoverService.updatePropStatus(
                requestDto.userId,
                requestDto.today,
                requestDto.propName
            )
        )
    }

    @GetMapping("/{date}")
    @ApiOperation(value = "잔반이를 만들 수 있는 Leftover 객체를 반환함")
    fun getLeftoversByDate(
        @PathVariable date: String
    ): List<Leftover> {
        return leftoverService.getLeftoversByDate(date)
    }

}