package com.hellsfood.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hellsfood.client.leftover.Leftover;
import com.hellsfood.client.leftover.LeftoverServiceClient;
import com.hellsfood.client.menu.MenuServiceClient;
import com.hellsfood.domain.image.JanbanCode;
import com.hellsfood.domain.janban.JanbanFeature;
import com.hellsfood.domain.janban.Janbani;
import com.hellsfood.domain.janban.JanbaniRepository;
import com.hellsfood.dto.JanbaniRequestDto;
import com.hellsfood.dto.JanbaniUpdateRequestDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class JanbaniService {

	private final JanbaniRepository janbaniRepository;
	private final LeftoverServiceClient leftoverServiceClient;
	private final MenuServiceClient menuServiceClient;

	@Scheduled(cron = "0 0 14 * * ?", zone = "Asia/Seoul")
	public void createJanbanAll() {
		LocalDate currentTime = ZonedDateTime.of(LocalDateTime.now(), ZoneId.of("Asia/Seoul")).toLocalDate();
		String date = currentTime.toString();
		List<Leftover> leftovers = leftoverServiceClient.getLeftoversByDate(date);

		int count = 0;

		for (Leftover leftover : leftovers) {
			String course = leftover.getCourse() == 1 ? "A" : "B";
			String courseType = menuServiceClient.getFeatureOfMenu("manager", date, course);
			createJanban(new JanbaniRequestDto(leftover.getUserId(), courseType));
			count++;
		}
		log.info(count + " Janban objects were created at " + LocalDateTime.now());
	}

	public Janbani createJanban(JanbaniRequestDto dto) {
		String userId = dto.getUserId();
		String feature = dto.getFeature();

		Janbani janbani = janbaniRepository.findByUserId(userId)
			.orElse(Janbani.builder()
				.userId(userId)
				.feature(feature)
				.janbanCode(null)
				.build());

		JanbanFeature janbanFeature = JanbanFeature.fromValue(feature);
		JanbanCode janbanCode = janbanFeature.getJanbanCode();
		janbani.update(janbanFeature, janbanCode);
		return janbaniRepository.save(janbani);
	}

	@Transactional
	public Janbani updateJanbanCode(JanbaniUpdateRequestDto requestDto) {
		Janbani janbani = janbaniRepository.findByUserId(requestDto.getUserId())
			.orElseThrow(() -> new IllegalArgumentException("해당하는 잔반이가 없습니다."));

		String propName = requestDto.getPropName();
		JanbanCode janbanCode = JanbanCode.findByPropNameAndJanbanFeature(propName, janbani.getFeature().toString());
		janbani.updateJanbanCode(janbanCode);
		janbaniRepository.save(janbani);
		return janbani;
	}

	public String getJanban(String userId) {
		Janbani janbani = janbaniRepository.findByUserId(userId)
			.orElseThrow(() -> new IllegalArgumentException("해당하는 잔반이가 없습니다."));
		return janbani.getJanbanCode().name();
	}

	public Boolean hasJanbanInDate(String userId, String date) {
		Optional<Janbani> optionalJanbani = janbaniRepository.findByUserId(userId);

		if (optionalJanbani.isEmpty()) {
			return false;
		}

		Janbani janbani = optionalJanbani.get();
		LocalDate updateDate = janbani.getUpdatedAt().toLocalDate();

		return updateDate.isEqual(parseDate(date));
	}

	private LocalDate parseDate(String dateStr) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		return LocalDate.parse(dateStr, formatter);
	}

}