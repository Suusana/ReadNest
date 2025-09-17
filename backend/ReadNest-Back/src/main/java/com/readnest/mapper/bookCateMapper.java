package com.readnest.mapper;

import com.readnest.pojo.Book;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface bookCateMapper {

    void addBookTags(List<Integer> ids, Integer bookId);

    /**
     * select all the category_id by book_id
     * @param id
     * @return
     */
    @Select("SELECT category_id FROM book_categories WHERE book_id = #{id}")
    List<Integer> getTagsIdsById(Integer id);

    /**
     * delete all the tags id by book id
     @Select("select category_id from
     * @param id
     */
    @Delete("delete from book_categories where book_id = #{id}")
    void DeleteByBookId(Integer id);


    List<Integer> getTagsIdsByIds(List<Integer> ids);


    void DeleteByTagIds(List<Integer> ids);
}
