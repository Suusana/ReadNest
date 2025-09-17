package com.readnest.service.Impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.readnest.mapper.bookCateMapper;
import com.readnest.mapper.bookMapper;
import com.readnest.mapper.categoriesMapper;
import com.readnest.mapper.recordMapper;
import com.readnest.pojo.Book;
import com.readnest.pojo.BooksPage;
import com.readnest.pojo.Pages;
import com.readnest.pojo.Record;
import com.readnest.service.bookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class bookservice implements bookService {
    @Autowired
    private bookMapper bookmapper;

    @Autowired
    private bookCateMapper bookcatemapper;

    @Autowired
    private categoriesMapper categoriesmapper;

    @Autowired
    private recordMapper recordmapper;

    /**
     * fetch all books
     * @param page
     * @param pageSize
     * @return
     */
    @Override
    public BooksPage fetchBooks(Integer page, Integer pageSize) {

        PageHelper.startPage(page, pageSize);

        List<Book> bookList = bookmapper.findBooks();

        List<String[]> tags = new ArrayList<>();

        for (Book book : bookList) {
            List<String> tagList = bookmapper.findTagsByBookId(book.getBookId());
            String[] tagArray = tagList.toArray(new String[0]);
            tags.add(tagArray);
        }
        Page<Book> p = (Page<Book>)bookList;

        BooksPage APage = new BooksPage(p.getTotal(),p.getResult(),tags);

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

    @Override
    public List<String> getAllTags() {
        return bookmapper.getAllTags();
    }

    @Override
    public void addABook(String title, String author, String description, Integer quantity) {
        bookmapper.addABook(title,author,description,quantity);
    }

    @Override
    public void addUrlToBook(String url) {
        bookmapper.addUrlToBook(url);
    }

    @Override
    public Book findLast() {
        return bookmapper.findLast();
    }

    @Override
    public Book findByTitle(String title) {
        return bookmapper.findByTitle(title);
    }

    @Override
    public void editThisBook(Integer id, String title, String author, String description, Integer quantity) {
        bookmapper.editThisBook(id,title,author,description,quantity);
    }

    @Override
    public void updateUrlById(String url, Integer id) {
        bookmapper.updateUrlById(url,id);
    }

    @Override
    public Book findBookById(Integer id) {
        return bookmapper.findBookById(id);
    }

    /**
     * find all the book that title is xxx but id != xxx
     * @param id
     * @param title
     * @return
     */
    @Override
    public Book findByBookIdAndTitle(Integer id, String title) {
        return bookmapper.findByBookIdAndTitle(id,title);
    }

    @Override
    public List<Book> fetchRandomBooks() {
        return bookmapper.fetchRandomBooks();
    }

    @Override
    public List<String> getTagsById(Integer bookId) {
        List<Integer> ids = bookcatemapper.getTagsIdsById(bookId);
        return categoriesmapper.findTagsByIds(ids);
    }

    @Override
    public Record getByUsernameTitle(String username, String bookName) {
        Record record = recordmapper.getByUsernameTitle(username,bookName);
        return record;
    }

    @Override
    public void ReturnBook(String bookName, LocalDate currentDate) {
        recordmapper.returnBook(bookName, currentDate);
        bookmapper.addQuantity(bookName);
    }

    @Override
    public void BorrowBook(String username, String bookName, LocalDate currentDate, LocalDate dueDate) {
        recordmapper.borrowBook(username,bookName,currentDate,dueDate);
        bookmapper.reduceQuantity(bookName);
    }

    @Override
    public Integer getBookStatusByUsernameBookname(String bookName, String username) {
        return recordmapper.getBookStatusByUsernameBookname(bookName,username);
    }

    @Override
    public String getUrlById(String id) {
        return bookmapper.getUrlById(id);
    }

    @Override
    public List<Book> getByKeyword(String keyword) {
        return bookmapper.getByKeyword(keyword);
    }


}
