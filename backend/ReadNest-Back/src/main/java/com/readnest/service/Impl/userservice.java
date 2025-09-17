package com.readnest.service.Impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.readnest.mapper.userMapper;
import com.readnest.pojo.Book;
import com.readnest.pojo.Pages;
import com.readnest.pojo.User;
import com.readnest.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class userservice implements userService {
    @Autowired
    private userMapper usermapper;
    @Override
    public Pages fetchUser(Integer page, Integer pageSize) {
        PageHelper.startPage(page, pageSize);

        List<User> bookList = usermapper.fetchUsers();

        Page<User> p = (Page<User>)bookList;
        Pages APage = new Pages(p.getTotal(),p.getResult());
        return APage;
    }

    @Override
    public String getUrlById(String userId) {
        return usermapper.getUrlById(userId);
    }

    @Override
    public void updateAvatar(String userId, String url) {
        usermapper.updateAvatar(userId,url);
    }

    @Override
    public void updatePassword(String userId, String password) {
        usermapper.updatePassword(userId,password);
    }
}
