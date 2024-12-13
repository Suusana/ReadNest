package com.readnest.controller;

import org.springframework.beans.factory.annotation.Value;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@RestController
@RequestMapping("/s3")
public class S3Controller {

    private static S3Client s3Client;
    @Value("${aws.accessKeyId}")
    private String accessKeyId;

    @Value("${aws.secretKeyId}")
    private String secretKeyId;

    @Value("${aws.bucketName}")
    private String bucketName;


    public void initializeS3Client() {
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKeyId, secretKeyId);
        s3Client = S3Client.builder()
                .region(Region.AP_SOUTHEAST_2)
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .build();
    }

    public static S3Client getS3Client() {
        return s3Client;
    }

//    static {
//        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKeyId, secretKeyId);
//        s3Client = S3Client.builder()
//                .region(Region.AP_SOUTHEAST_2)
//                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
//                .build();
//    }
}

