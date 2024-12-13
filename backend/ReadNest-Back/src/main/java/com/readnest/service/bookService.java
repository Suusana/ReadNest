package com.readnest.service;

import com.readnest.pojo.Book;
import com.readnest.pojo.Pages;

import java.util.List;

public interface bookService {
    Pages fetchBooks(Integer page, Integer pageSize);


    Pages searchBooks(Integer page, Integer pageSize, String searchItem);


    void deleteByIds(List<Integer> chosenBooks);
}
