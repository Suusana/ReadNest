package com.readnest.mapper;


import com.readnest.pojo.Book;
import com.readnest.pojo.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface userMapper {
    /**
     * find the user who is logining in
     * @return
     */
    @Select("select user_id, username, name, email, password from user where email= #{email} and password = #{password}")
    User findUser(@Param("email") String email, @Param("password") String password);

    /**
     * create a new user by name, email and password
     * @param user
     * @return
     */
    @Insert("insert into user(username,name,email,password)values (#{username},#{name},#{email},#{password})")
    void createUser(User user);

    /**
     * find a user by username
     * @param username
     * @return
     */
    @Select("select user_id, username, name, email, password from user where username = #{username}")
    User findByusername(String username);

    @Select("select * from user where user_id != 1000")
    List<Book> fetchUsers();
}
