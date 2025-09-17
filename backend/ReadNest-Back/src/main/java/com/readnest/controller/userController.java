package com.readnest.controller;

import com.readnest.pojo.Book;
import com.readnest.pojo.Pages;
import com.readnest.pojo.Result;
import com.readnest.service.Impl.s3Service;
import com.readnest.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class userController {
    @Autowired
    private userService service;

    @Autowired
    private s3Service s3service;

    @GetMapping("/usersData")
    public Result fetchUsers(@RequestParam(defaultValue = "1") Integer page,
                             @RequestParam(defaultValue = "5") Integer pageSize){
        Pages users = service.fetchUser(page, pageSize);
        return Result.success(users);
    }

    @PostMapping("/uploadAvatar")
    public Result uploadAvatar(@RequestParam("avatar") MultipartFile file,
                               @RequestParam("userId") String userId) throws Exception {
        String url = s3service.uploadImageToS3(file);
        service.updateAvatar(userId,url);
        return Result.success(url);
    }

    @PostMapping("/changePsw")
    public Result changePsw(@RequestBody Map<String, String> payload){
        String password = payload.get("password");
        String userId = payload.get("userId");
        service.updatePassword(userId,password);
        return Result.success();
    }
}
