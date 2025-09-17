package com.readnest.mapper;

import com.readnest.pojo.Record;
import com.readnest.pojo.User;
import com.readnest.pojo.userRecord;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Mapper
public interface recordMapper {
    @Select("select * from borrow_record")
    List<Record> fetchRecords();

    List<Record> searchRecords(String status, String searchItem, Date startDate, Date endDate);

    @Select("select * from borrow_record where record_id = #{recordId}")
    Record getRecordById(String recordId);

    @Select("select * from borrow_record where username = #{username} and book_name = #{bookName}")
    Record getByUsernameTitle(String username, String bookName);

    @Update("update borrow_record set return_date = #{currentDate},status = 1")
    void returnBook(String bookName, LocalDate currentDate);

    @Insert("insert into borrow_record (username,book_name,borrow_date,due_date,status) " +
            "values (#{username},#{bookName},#{currentDate},#{dueDate},0)")
    void borrowBook(String username, String bookName, LocalDate currentDate, LocalDate dueDate);

    @Select("select status from borrow_record where username = #{username} and book_name = #{bookName} " +
            "and (status = 0 OR status = 2) limit 1")
    Integer getBookStatusByUsernameBookname(String bookName, String username);

    @Select("select * from borrow_record where username = #{username}")
    List<Record> getRecordsByUsername(String username);

    List<userRecord> getUserRecords(String username);
}
