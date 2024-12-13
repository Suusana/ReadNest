package com.readnest.service.Impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.readnest.mapper.categoriesMapper;
import com.readnest.pojo.Category;
import com.readnest.pojo.Pages;
import com.readnest.service.categoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class categoiesService implements categoriesService {

    @Autowired
    private categoriesMapper mapper;

    /**
     * fetch all categories
     * @return
     */
    @Override
    public Pages fetchCategories(Integer page, Integer pageSize) {
        PageHelper.startPage(page, pageSize);

        List<Category> categoriesList = mapper.fetchCategories();

        Page<Category> p = (Page<Category>)categoriesList;
        Pages APage = new Pages(p.getTotal(),p.getResult());

        return APage;
    }

    /**
     * delete categories
     * @param categoryIds
     */
    @Override
    public void delete(List<Integer> categoryIds) {
        mapper.deleteCategory(categoryIds);
    }

    @Override
    public void addcategory(Category category) {
        mapper.add(category);
    }

    @Override
    public Category findLastById() {
        return mapper.findLastById();
    }

    @Override
    public void editCategory(Category category) {
        mapper.editCategory(category);
    }

    @Override
    public Category findById(Category category) {
        return mapper.findById(category);
    }

}
