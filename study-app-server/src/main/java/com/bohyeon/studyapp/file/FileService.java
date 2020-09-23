package com.bohyeon.studyapp.file;

import org.springframework.stereotype.Service;

@Service
public class FileService {
    ImageRepository imageRepository;

    public FileService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image getImageByName(String name) {
        return imageRepository.findByName(name).orElseThrow();
    }

    public Long addImage (Image image) {
        return imageRepository.addImage(image);
    }

    public Image getImageById(Long id) {
        return imageRepository.findById(id).orElseThrow();
    }
}
