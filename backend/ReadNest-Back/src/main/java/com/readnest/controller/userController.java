package com.readnest.controller;

import com.readnest.pojo.Pages;
import com.readnest.pojo.Result;
import com.readnest.pojo.User;
import com.readnest.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class userController {
    @Autowired
    private userService service;

    @GetMapping("/usersData")
    public Result fetchUsers(@RequestParam(defaultValue = "1") Integer page,
                             @RequestParam(defaultValue = "5") Integer pageSize){
        Pages users = service.fetchUser(page, pageSize);
        System.out.println(users.toString());
        return Result.success(users);
    }
}
