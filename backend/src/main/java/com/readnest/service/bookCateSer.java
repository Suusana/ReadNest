package com.readnest.service;

import com.readnest.pojo.Book;

import java.util.List;

public interface bookCateSer {
    void addBookTags(List<Integer> ids, Integer bookId);

    List<Integer> getTagsIdsById(Integer id);

    void DeleteByBookId(Integer id);

    List<Integer> getTagsIdsByIds(List<Integer> ids);


    void DeleteByTagIds(List<Integer> categoryIds);
}
