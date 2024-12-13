package com.readnest.controller;

import com.readnest.pojo.Category;
import com.readnest.pojo.Pages;
import com.readnest.pojo.Result;

import com.readnest.service.Impl.categoiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class categoriesController {
    @Autowired
    private categoiesService service;

    @GetMapping("/categoriesData")
    public Result fetchCategories(@RequestParam(defaultValue = "1") Integer page,
                                  @RequestParam(defaultValue = "5") Integer pageSize) {
        Pages allCategories = service.fetchCategories(page,pageSize);
        return Result.success(allCategories);
    }

    @DeleteMapping("/deleteCategory/{categoryIds}")
    public Result deleteCategory(@PathVariable List<Integer> categoryIds) {
        service.delete(categoryIds);
        return Result.success();
    }

    @PutMapping("/addCategory")
    public Result addCategory(@RequestBody Category category) {
        service.addcategory(category);
        Category newOne = service.findLastById();
        return Result.success(newOne);
    }

    @PutMapping("/editCategory")
    public Result editCategory(@RequestBody Category category) {
        System.out.println("要改的数据："+category.toString());
        service.editCategory(category);
        Category updatedOne = service.findById(category);
        return Result.success(updatedOne);
    }
}
