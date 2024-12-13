package com.readnest.service.Impl;

import com.readnest.mapper.userMapper;
import com.readnest.pojo.User;
import com.readnest.service.loginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class login implements loginService {

    @Autowired
    private userMapper userMapper;

    /**
     * user login
     * @param email
     * @param password
     * @return
     */
    @Override
    public User login(String email, String password) {
        return userMapper.findUser(email,password);
    }

    /**
     * user create a new account
     *
     * @param user
     */
    @Override
    public void registration(User user) {
        userMapper.createUser(user);
    }

    /**
     * find a user by username
     * @param username
     * @return
     */
    @Override
    public User findByUsername(String username) {
        return userMapper.findByusername(username);
    }
}
