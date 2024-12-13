package com.readnest.mapper;

import com.readnest.pojo.Book;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface bookMapper {
    /**
     * find the books
     *
     * @return
     */
    @Select("select * from book")
    public List<Book> findBooks();

    @Select("SELECT * FROM book WHERE title LIKE CONCAT('%', #{searchItem}, '%') " +
            "OR author LIKE CONCAT('%', #{searchItem}, '%') " +
//            "OR category LIKE CONCAT('%', #{searchItem}, '%') " +
            "OR description LIKE CONCAT('%', #{searchItem}, '%')"+
            "OR quantity LIKE CONCAT('%', #{searchItem}, '%')")

    List<Book> searchbook(String searchItem);

    /**
     * delete books by their ids
     * @param ids
     */
    void deleteByIds(List<Integer> ids);
}
