package com.readnest.mapper;

import com.readnest.pojo.Book;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface bookMapper {
    /**
     * find books tag by book's Id
     * @param bookId
     * @return
     */
    @Select("select c.category FROM categories c " +
            "join book_categories bc ON c.category_id = bc.category_id " +
            "where bc.book_id = #{bookId}")
    List<String> findTagsByBookId(Integer bookId);

    /**
     * find the books
     *
     * @return
     */
    @Select("select * from book")
    List<Book> findBooks();

    @Select("SELECT * FROM book WHERE title LIKE CONCAT('%', #{searchItem}, '%') " +
            "OR author LIKE CONCAT('%', #{searchItem}, '%') " +
            "OR description LIKE CONCAT('%', #{searchItem}, '%')"+
            "OR quantity LIKE CONCAT('%', #{searchItem}, '%')")

    List<Book> searchbook(String searchItem);

    /**
     * delete books by their ids
     * @param ids
     */
    void deleteByIds(List<Integer> ids);

    @Select("select category from categories")
    List<String> getAllTags();


    @Insert("insert into book (title,author,description,quantity) " +
            "values (#{title},#{author},#{description},#{quantity})")
    void addABook(String title, String author, String description, Integer quantity);

    @Update("update book set cover = #{url} order by book_id desc limit 1")
    void addUrlToBook(String url);

    /**
     * find the last one book
     * @return
     */
    @Select("select * from book order by book_id desc limit 1")
    Book findLast();

    @Select("select * from book where title = #{title}")
    Book findByTitle(String title);

    /**
     * edit a book by id
     * @param id
     * @param title
     * @param author
     * @param description
     * @param quantity
     */
    @Update("update book set title=#{title},author=#{author},description=#{description},quantity=#{quantity} where book_id = #{id}")
    void editThisBook(Integer id, String title, String author, String description, Integer quantity);

    /**
     * update url by books id
     * @param url
     * @param id
     */
    @Update("update book set cover = #{url} where book_id = #{id}")
    void updateUrlById(String url,Integer id);

    /**
     * find a book by its id
     * @param id
     * @return
     */
    @Select("select * from book where book_id = #{id}")
    Book findBookById(Integer id);

    @Select("select * from book where book_id != #{id} and title = #{title}")
    Book findByBookIdAndTitle(Integer id, String title);

    @Select("select * from book order by rand() limit 5")
    List<Book> fetchRandomBooks();

    @Update("update book set quantity = quantity+1 where title = #{bookName}")
    void addQuantity(String bookName);

    @Update("update book set quantity = quantity-1 where title = #{bookName}")
    void reduceQuantity(String bookName);

    @Select("select cover from book where book_id = #{id}")
    String getUrlById(String id);

    @Select("select * from book where author like concat('%',#{keyword},'%') or title like concat('%',#{keyword},'%')")
    List<Book> getByKeyword(String keyword);
}
