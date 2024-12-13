package com.readnest.mapper;


import com.readnest.pojo.Category;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface categoriesMapper {

    /**
     * fetch all the categories
     * @return
     */
    @Select("select * from categories")
    List<Category> fetchCategories();

    /**
     * delte categories by ids
     * @param categoryIds
     */
    void deleteCategory(List<Integer> categoryIds);

    @Insert("insert into categories (category,description) values (#{category},#{description})")
    void add(Category category);

    @Select("select * from categories order by category_id desc limit 1")
    Category findLastById();

    @Update("update categories set category = #{category},description=#{description}where category_id = #{categoryId}")
    void editCategory(Category category);

    @Select("select * from categories where category_id = #{categoryId}")
    Category findById(Category category);
}
