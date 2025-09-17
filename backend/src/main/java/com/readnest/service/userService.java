package com.readnest.service;

import com.readnest.pojo.Pages;
import com.readnest.pojo.User;

public interface userService {
    Pages fetchUser(Integer page, Integer pageSize);

    String getUrlById(String userId);

    void updateAvatar(String userId, String url);

    void updatePassword(String userId, String password);
}
