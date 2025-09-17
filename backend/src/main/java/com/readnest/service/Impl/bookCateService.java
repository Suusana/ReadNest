package com.readnest.service.Impl;

import com.readnest.mapper.bookCateMapper;
import com.readnest.pojo.Book;
import com.readnest.service.bookCateSer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class bookCateService implements bookCateSer {
    @Autowired
    private bookCateMapper bookCateMapper;

    @Override
    public void addBookTags(List<Integer> ids, Integer bookId) {
        bookCateMapper.addBookTags(ids,bookId);
    }

    @Override
    public List<Integer> getTagsIdsById(Integer id) {
        return bookCateMapper.getTagsIdsById(id);
    }

    @Override
    public void DeleteByBookId(Integer id) {
        bookCateMapper.DeleteByBookId(id);
    }

    @Override
    public List<Integer> getTagsIdsByIds(List<Integer> ids) {
        return bookCateMapper.getTagsIdsByIds(ids);
    }

    @Override
    public void DeleteByTagIds(List<Integer> ids) {
        bookCateMapper.DeleteByTagIds(ids);
    }


}
