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
    @Select("select * from user where email= #{email} and password = #{password}")
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
    @Select("select * from user where username = #{username}")
    User findByusername(String username);

    /**
     * return the users
     * @return
     */
    @Select("select * from user where user_id != 1000")
    List<User> fetchUsers();

    @Select("select avatar from user where user_id = #{userId}")
    String getUrlById(String userId);

    @Update("update user set avatar = #{url} where user_id = #{userId}")
    void updateAvatar(String userId, String url);

    @Update("update user set password = #{password} where user_id = #{userId}")
    void updatePassword(String userId, String password);
}
