package com.readnest.service;

import com.readnest.pojo.Book;
import com.readnest.pojo.BooksPage;
import com.readnest.pojo.Category;
import com.readnest.pojo.Pages;
import com.readnest.pojo.Record;

import java.time.LocalDate;
import java.util.List;

public interface bookService {
    BooksPage fetchBooks(Integer page, Integer pageSize);


    Pages searchBooks(Integer page, Integer pageSize, String searchItem);


    void deleteByIds(List<Integer> chosenBooks);

    List<String> getAllTags();

    void addABook(String title, String author, String description, Integer quantity);

    void addUrlToBook(String url);

    Book findLast();

    Book findByTitle(String title);

    void editThisBook(Integer id, String title, String author, String description, Integer quantity);


    void updateUrlById(String url, Integer id);

    Book findBookById(Integer id);

    Book findByBookIdAndTitle(Integer id, String title);

    List<Book> fetchRandomBooks();

    List<String> getTagsById(Integer bookId);

    Record getByUsernameTitle(String username, String bookName);

    void ReturnBook(String bookName, LocalDate currentDate);

    void BorrowBook(String username, String bookName, LocalDate currentDate, LocalDate dueDate);

    Integer getBookStatusByUsernameBookname(String bookName, String username);

    String getUrlById(String id);

    List<Book> getByKeyword(String keyword);
}
