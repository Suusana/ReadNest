package com.readnest.controller;

import com.readnest.pojo.*;
import com.readnest.pojo.Record;
import com.readnest.service.Impl.bookCateService;
import com.readnest.service.Impl.s3Service;
import com.readnest.service.bookService;
import com.readnest.service.categoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class bookController {

    @Autowired
    private bookService bookservice;

    @Autowired
    private s3Service s3service;

    @Autowired
    private categoriesService categoriesservice;

    @Autowired
    private bookCateService bookcateservice;

    /**
     * get all the books
     * @param page
     * @param pageSize
     * @return
     */
    @GetMapping("/booksData")
    public Result fetchBooksData(@RequestParam(defaultValue = "1") Integer page,
                                 @RequestParam(defaultValue = "5") Integer pageSize) {
        BooksPage allBooks = bookservice.fetchBooks(page, pageSize);
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
        Pages searchBooks = bookservice.searchBooks(page, pageSize, SearchItem);

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
        List<Integer> TagsIds = bookcateservice.getTagsIdsByIds(ids); // get all the tags that need to delete 1 in total books
        categoriesservice.deleteTotalBooksByTagIds(TagsIds);
        bookservice.deleteByIds(ids);
        return Result.success();
    }

    /**
     * fetch all the category tags
     * @return
     */
    @GetMapping("/fetchTags")
    public Result getAllTags(){
        List<String> tags = bookservice.getAllTags();
        return Result.success(tags);
    }

    @PutMapping("/addBook")
    public Result addBook(@RequestParam("file") MultipartFile file,
                          @RequestParam("title") String title,
                          @RequestParam("author") String author,
                          @RequestParam("description") String description,
                          @RequestParam("quantity") String quantity,
                          @RequestParam("tags") List<String> tags) throws Exception {
        bookservice.addABook(title,author,description,Integer.parseInt(quantity)); //add data to book
        String url = s3service.uploadImageToS3(file);
        bookservice.addUrlToBook(url);//add url to book
        List<Integer> ids = categoriesservice.findIdByTags(tags);//find all the categories id by tags name
        Book newBook = bookservice.findLast(); //find the latest one book
        bookcateservice.addBookTags(ids,newBook.getBookId()); //insert into book_categories
        categoriesservice.addTotalBook(ids); //add 1 to total books in categories

        return Result.success(newBook);
    }

    @PostMapping("/editBook")
    public Result editBook(@RequestParam("id") String id,
                           @RequestParam("title") String title,
                           @RequestParam("author") String author,
                           @RequestParam("description") String description,
                           @RequestParam("quantity") String quantity,
                           @RequestParam(value = "file",required = false) MultipartFile file,
                           @RequestParam("tags") List<String> tags) throws Exception {
        Integer ID = Integer.parseInt(id);
        Book book = bookservice.findByBookIdAndTitle(ID, title);
        if (book != null) {
            return Result.error("This book already exists");
        }
        bookservice.editThisBook(ID,title,author,description,Integer.parseInt(quantity)); //update data to a book修改书
        List<Integer> ids = categoriesservice.findIdByTags(tags); //get all the categories id by tags name 获取所有tagid
        //get all the tags id that need to be delete in the bookcategories table 获取要删除的id
        List<Integer> DeleteIds = bookcateservice.getTagsIdsById(ID);
        //delete all the tags that need to be delete 删除要删除的id
        bookcateservice.DeleteByBookId(ID);
        //update categories table total books 删除totalbook带deleteid的-1
        categoriesservice.deleteTotalBooksByTagIds(DeleteIds);
        // insert new tags
        bookcateservice.addBookTags(ids,ID);
        categoriesservice.addTotalBook(ids);
        //return updated one
        if (file != null && !file.isEmpty()) {
            // cover page uploaded,get the originame
            String url = s3service.uploadImageToS3(file);
            bookservice.updateUrlById(url,ID);
            Book updateBook = bookservice.findBookById(ID);
            return Result.success(updateBook);
        }
        Book updateBook = bookservice.findBookById(ID);
        return Result.success(updateBook);
    }

    @GetMapping("/recommendBook")
    public Result recommendBook(){
        List<Book> books = bookservice.fetchRandomBooks();
        return Result.success(books);
    }

    @GetMapping("/getTagsById")
    public Result getTagsById(@RequestParam Integer bookId){
        List<String> Tags = bookservice.getTagsById(bookId);
        return Result.success(Tags);
    }

    @GetMapping("/isborrow")
    public Result isborrow(@RequestParam String username,@RequestParam String bookName){
        Record record = bookservice.getByUsernameTitle(username,bookName);
        return Result.success(record);
    }

    @GetMapping("/borrowBook")
    public Result borrowBook(@RequestParam String bookName, @RequestParam String username) {
        LocalDate currentDate = LocalDate.now();
        Integer status = bookservice.getBookStatusByUsernameBookname(bookName, username);
        if (status == null) {
            // borrow book
            LocalDate dueDate = currentDate.plusDays(14);
            bookservice.BorrowBook(username, bookName, currentDate, dueDate);
            return Result.success("Borrow");
        }else {
            bookservice.ReturnBook(bookName, currentDate);
            return Result.success("Return");
        }

    }

    @GetMapping("/searchForBook")
    public Result searchForBook(@RequestParam String keyword){
        List<Book> books = bookservice.getByKeyword(keyword);
        return Result.success(books);
    }

}
