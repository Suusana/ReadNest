package com.readnest.service;

import com.readnest.pojo.User;

public interface loginService {
    User login(String email, String password);

    void registration(User newUser);

    User findByUsername(String username);
}
