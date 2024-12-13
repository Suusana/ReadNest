package com.readnest.service;

import com.readnest.pojo.Category;
import com.readnest.pojo.Pages;

import java.util.List;

public interface categoriesService {
    /**
     * fetech all categories
     * @return
     */
    Pages fetchCategories(Integer page, Integer pageSize);

    void delete(List<Integer> categoryIds);

    void addcategory(Category category);

    Category findLastById();

    void editCategory(Category category);

    Category findById(Category category);
}