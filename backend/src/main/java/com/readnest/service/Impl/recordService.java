package com.readnest.service.Impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.readnest.mapper.*;
import com.readnest.pojo.*;
import com.readnest.pojo.Record;
import com.readnest.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class recordService implements RecordService {
    @Autowired
    private recordMapper mapper;

    @Autowired
    private userMapper usermapper;

    @Autowired
    private bookMapper bookmapper;

    @Autowired
    private bookCateMapper bookcatemapper;

    @Autowired
    private categoriesMapper categoriesmapper;

    @Override
    public Pages fetchRecords(Integer page, Integer pageSize) {
        PageHelper.startPage(page, pageSize);

        List<Record> recordList = mapper.fetchRecords();

        Page<Record> p = (Page<Record>)recordList;
        Pages APage = new Pages(p.getTotal(),p.getResult());

        return APage;
    }

    @Override
    public Pages searchRecords(Integer page, Integer pageSize, String status, String searchItem, Date startDate, Date endDate) {
        PageHelper.startPage(page, pageSize);

        List<Record> searchRecords = mapper.searchRecords(status,searchItem,startDate,endDate);

        Page<Record> p = (Page<Record>)searchRecords;
        Pages APage = new Pages(p.getTotal(),p.getResult());

        return APage;
    }

    @Override
    public Detail getRecordById(String recordId) {
        Record record = mapper.getRecordById(recordId);
        User user = usermapper.findByusername(record.getUsername());
        Book book = bookmapper.findByTitle(record.getBookName());
        List<Integer> ids = bookcatemapper.getTagsIdsById(book.getBookId());
        List<String> tags = categoriesmapper.findTagsByIds(ids);
        Detail detail = Detail.builder()
                        .recordId(record.getRecordId())
                        .username(record.getUsername())
                        .email(user.getEmail())
                        .avatar(user.getAvatar())
                        .bookName(record.getBookName())
                        .description(book.getDescription())
                        .author(book.getAuthor())
                        .cover(book.getCover())
                        .tags(tags)
                        .borrowDate(record.getBorrowDate())
                        .dueDate(record.getDueDate())
                        .returnDate(record.getReturnDate())
                        .status(record.getStatus())
                        .build();
        return detail;
    }

    @Override
    public List<userRecord> getRecordsByUsername(String username) {
        List<userRecord> records = mapper.getUserRecords(username);
        return records;
    }
}
