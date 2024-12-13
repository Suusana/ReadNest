package com.readnest.controller;

import com.readnest.pojo.Pages;
import com.readnest.pojo.Result;
import com.readnest.service.bookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class bookController {

    @Autowired
    private bookService service;

    /**
     * get all the books
     * @param page
     * @param pageSize
     * @return
     */
    @GetMapping("/booksData")
    public Result fetchBooksData(@RequestParam(defaultValue = "1") Integer page,
                                 @RequestParam(defaultValue = "5") Integer pageSize) {
        Pages allBooks = service.fetchBooks(page, pageSize);

        return Result.success(allBooks);
    }

    /**
     * get searched items
     * @param page
     * @param pageSize
     * @param SearchItem
     * @return
     */
    @GetMapping("/search")
    public Result searchBooks(
            @RequestParam Integer page,
            @RequestParam Integer pageSize,
            @RequestParam String SearchItem) {
        Pages searchBooks = service.searchBooks(page, pageSize, SearchItem);

        if (searchBooks.getTotal() == 0) {
            return Result.success("There is no result");
        }
        return Result.success(searchBooks);
    }

    /**
     * delete books by thier ids
     * @param ids
     * @return
     */
    @DeleteMapping("/deleteBooks/{ids}")
    public Result Delete(@PathVariable List<Integer> ids) {
        service.deleteByIds(ids);
        return Result.success();
    }
}
