package com.readnest.service.Impl;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Configuration;

import java.io.InputStream;
import java.net.URL;
import java.util.UUID;
import java.net.URI;

@Service
public class s3Service {

    private static final S3Client s3Client;
    private static final String BUCKET_ACCESSKEYID = "";
    private static final String BUCKET_SECRETKEYID = "";
    private static final String BUCKET_NAME = "readnest";
    private static final String ACCOUNT_ID = "";
    private static final String PUBLIC_URL = "";

    static {

        String accessKeyId = BUCKET_ACCESSKEYID;
        String secretKeyId = BUCKET_SECRETKEYID;

        AwsBasicCredentials awsCreds =
                AwsBasicCredentials.create(
                        accessKeyId,
                        secretKeyId
                );

        S3Configuration s3Configuration =
                S3Configuration.builder()
                        .chunkedEncodingEnabled(false)
                        .build();

        s3Client = S3Client.builder()
                .endpointOverride(
                        URI.create(
                                "https://" + ACCOUNT_ID
                                        + ".r2.cloudflarestorage.com"
                        )
                )
                .region(Region.of("auto"))
                .credentialsProvider(
                        StaticCredentialsProvider.create(
                                awsCreds
                        )
                )
                .serviceConfiguration(
                        s3Configuration
                )
                .build();
    }

    public String uploadImageToS3(
            MultipartFile file
    ) throws Exception {

        String fileName =
                UUID.randomUUID().toString()
                        + "-"
                        + file.getOriginalFilename();

        InputStream inputStream =
                file.getInputStream();

        String contentType =
                file.getContentType();

        if (contentType == null
                || !contentType.startsWith("image/")) {

            throw new IllegalArgumentException(
                    "The file is not an image."
            );
        }

        PutObjectRequest putObjectRequest =
                PutObjectRequest.builder()
                        .bucket(BUCKET_NAME)
                        .key(fileName)
                        .contentType(contentType)
                        .build();

        s3Client.putObject(
                putObjectRequest,
                RequestBody.fromInputStream(
                        inputStream,
                        file.getSize()
                )
        );

        return PUBLIC_URL + "/" + fileName;
    }
}