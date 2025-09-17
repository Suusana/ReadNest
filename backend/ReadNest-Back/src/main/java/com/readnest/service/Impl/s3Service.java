package com.readnest.service.Impl;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.net.URL;
import java.util.UUID;

@Service
public class s3Service {

    private static final S3Client s3Client;
    private static final String BUCKET_ACCESSKEYID = "AKIAZOZQGAVQCT2TQM54";
    private static final String BUCKET_SECRETKEYID = "bKn6cW/LtWGJu3UjdKRKu3wl/upDziDilL/lr5rk";
    private static final String BUCKET_NAME = "readnest";
    private static final String REGION = "ap-southeast-2";

    static {
        String accessKeyId = BUCKET_ACCESSKEYID;
        String secretKeyId = BUCKET_SECRETKEYID;
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKeyId, secretKeyId);
        s3Client = S3Client.builder()
                .region(Region.of(REGION))
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .build();
    }

    public String uploadImageToS3(MultipartFile file) throws Exception {
        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
        InputStream inputStream = file.getInputStream();

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("The file is not an image.");
        }

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(BUCKET_NAME)
                .key(fileName)
                .contentType(contentType)
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, file.getSize()));
        URL fileUrl = s3Client.utilities().getUrl(builder -> builder.bucket(BUCKET_NAME).key(fileName));

        return fileUrl.toString();
    }
}
