package com.readnest.controller;

import com.readnest.pojo.Category;
import com.readnest.pojo.Pages;
import com.readnest.pojo.Result;

import com.readnest.service.Impl.bookCateService;

import com.readnest.service.categoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class categoriesController {
    @Autowired
    private categoriesService service;

    @Autowired
    private bookCateService bookcateservice;

    @GetMapping("/categoriesData")
    public Result fetchCategories(@RequestParam(defaultValue = "1") Integer page,
                                  @RequestParam(defaultValue = "5") Integer pageSize) {
        Pages allCategories = service.fetchCategories(page,pageSize);
        return Result.success(allCategories);
    }

    @DeleteMapping("/deleteCategory/{categoryIds}")
    public Result deleteCategory(@PathVariable List<Integer> categoryIds) {
        service.delete(categoryIds);
        bookcateservice.DeleteByTagIds(categoryIds);
        return Result.success();
    }

    @PutMapping("/addCategory")
    public Result addCategory(@RequestBody Category data) {
        Category category = service.findByCategory(data.getCategory());
        if (category != null) {
            return Result.error("Category already exist");
        }
        service.addcategory(data);
        Category newOne = service.findLastById();
        return Result.success(newOne);
    }

    @PutMapping("/editCategory")
    public Result editCategory(@RequestBody Category category) {
        service.editCategory(category);
        Category updatedOne = service.findById(category);
        return Result.success(updatedOne);
    }
}
