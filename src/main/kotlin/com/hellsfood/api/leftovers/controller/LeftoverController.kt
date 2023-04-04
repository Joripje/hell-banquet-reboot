package com.hellsfood.api.leftovers.controller

import com.hellsfood.api.leftovers.data.Leftover
import com.hellsfood.api.leftovers.data.Ranking
import com.hellsfood.api.leftovers.dto.LeftoverRegisterRequestDto
import com.hellsfood.api.leftovers.service.LeftoverService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import lombok.RequiredArgsConstructor
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
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
        if (result) {
            return ResponseEntity.ok("${requestDto.userId}님의 ${LocalDate.now()}일 식사정보가 기록되었습니다.")
        } else {
            return ResponseEntity.badRequest().body("유효하지 않은 저장 요청 정보입니다.")
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

    @GetMapping
    @ApiOperation(value = "잔반 데이터 상세 조회 - userId & Date")
    fun getLeftoverByUserIdAndDate(
        @RequestParam userId: String, @RequestParam date: String
    ): Leftover {
        return leftoverService.getLeftoverByUserIdAndDate(userId, date)
    }

    @GetMapping("/is_playable/cookie")
    @ApiOperation(value = "percentage와 playedGame 값을 검사하여 게임을 할 수 있는지를 체크한다.")
    fun isPlayableCookieGame(
        @RequestParam("userId") userId: String,
        @RequestParam today: String
    ): ResponseEntity<Boolean> {
        return ResponseEntity.ok(leftoverService.isPlayableCookieGame(userId, today))
    }

    @GetMapping("/is_playable/drawing")
    @ApiOperation(value = "percentage와 playedGame 값을 검사하여 게임을 할 수 있는지를 체크한다.")
    fun isPlayableDrawingGame(
        @RequestParam("userId") userId: String,
        @RequestParam today: String
    ): ResponseEntity<Boolean> {
        return ResponseEntity.ok(leftoverService.isPlayableDrawingGame(userId, today))
    }

    @PutMapping("/modify/{newStatus}")
    @ApiOperation(value = "percentage와 playedGame 값을 검사하여 게임을 할 수 있는지를 체크한다.")
    fun updatePropStatus(
        @RequestParam("userId") userId: String,
        @RequestParam today: String,
        @PathVariable newStatus: String
    ): ResponseEntity<Leftover> {
        return ResponseEntity.ok(leftoverService.updatePropStatus(userId, today, newStatus))
    }

}