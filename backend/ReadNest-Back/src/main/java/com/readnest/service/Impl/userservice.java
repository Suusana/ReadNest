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

        List<Book> bookList = usermapper.fetchUsers();

        Page<Book> p = (Page<Book>)bookList;
        Pages APage = new Pages(p.getTotal(),p.getResult());
        return APage;
    }
}
