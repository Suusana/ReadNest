package com.readnest.service.Impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.readnest.mapper.bookMapper;
import com.readnest.pojo.Book;
import com.readnest.pojo.Pages;
import com.readnest.service.bookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class bookservice implements bookService {
    @Autowired
    private bookMapper bookmapper;

    /**
     * fetch all books
     * @param page
     * @param pageSize
     * @return
     */
    @Override
    public Pages fetchBooks(Integer page, Integer pageSize) {

        PageHelper.startPage(page, pageSize);

        List<Book> bookList = bookmapper.findBooks();

        Page<Book> p = (Page<Book>)bookList;
        Pages APage = new Pages(p.getTotal(),p.getResult());

        return APage;
    }

    /**
     * fetch searched books
     * @param page
     * @param pageSize
     * @param SearchItem
     * @return
     */
    @Override
    public Pages searchBooks(Integer page, Integer pageSize, String SearchItem) {
        PageHelper.startPage(page, pageSize);

        List<Book> bookList = bookmapper.searchbook(SearchItem);
        Page<Book> p = (Page<Book>)bookList;

        Pages APage = new Pages(p.getTotal(),p.getResult());
        return APage;
    }

    /**
     * delete books by their ids
     * @param ids
     */
    @Override
    public void deleteByIds(List<Integer> ids) {
        bookmapper.deleteByIds(ids);
    }
}
