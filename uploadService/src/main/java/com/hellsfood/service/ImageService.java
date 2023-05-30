package com.hellsfood.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hellsfood.domain.image.Image;
import com.hellsfood.domain.image.ImageRepository;
import com.hellsfood.domain.image.JanbanCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {

	private final ImageRepository imageRepository;
	private final S3Service s3Service;

	public void uploadImage(MultipartFile file, String janbanCode) throws IOException {
		String filePath = s3Service.uploadFileToS3(file);

		Image image = Image.builder()
			.filePath(filePath)
			.janbanCode(JanbanCode.valueOf(janbanCode))
			.build();
		imageRepository.save(image);
	}

	public String getImageS3PathById(Long id) {
		Image image = imageRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("해당하는 잔반이가 없습니다."));
		return "https://leftover-bucket.s3.ap-northeast-2.amazonaws.com/" + image.getFilePath();
	}

	public String getImageS3PathByJanbanCode(String code) {
		JanbanCode janbanCode = JanbanCode.valueOf(code);
		Image image = imageRepository.findOneByJanbanCode(janbanCode);
		return "https://leftover-bucket.s3.ap-northeast-2.amazonaws.com/" + image.getFilePath();
	}

}
