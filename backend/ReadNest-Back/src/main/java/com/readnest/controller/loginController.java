package com.readnest.controller;

import com.readnest.pojo.LoginResponse;
import com.readnest.pojo.Result;
import com.readnest.pojo.User;
import com.readnest.service.loginService;
import com.readnest.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class loginController {
    @Autowired
    private loginService loginservice;

    @PostMapping("/login")
    public Result login(@RequestBody User user) {
        User resUser = loginservice.login(user.getEmail(),user.getPassword());
        System.out.println(resUser.toString());
        if (resUser != null) {
            Map<String, Object> claims = new HashMap<>();
            claims.put("id", resUser.getUserId());
            claims.put("username", resUser.getUsername());
            claims.put("email", resUser.getEmail());
            String jwt = JwtUtil.generateJwt(claims);
            LoginResponse loginResponse = new LoginResponse(jwt, resUser);

            return Result.success(loginResponse);
        } else {
            return Result.error("Email or password incorrect");
        }
    }

    @PostMapping("/register")
    public Result register(@RequestBody User newUser) {
        String username = newUser.getUsername();
        User user = loginservice.findByUsername(username);
        if (user != null) {
            // username found, user has already exist, cannot register
            return Result.error("Username already exist");
        }
        // create account successfully
        loginservice.registration(newUser);

        //provide token to the registered user
        Result result = login(newUser);
        if (result.getCode() == 1) {
            return Result.success(result.getData());
        }
        return Result.error("Register failed");
    }
}
