package com.readnest.service;

import com.readnest.pojo.Detail;
import com.readnest.pojo.Pages;
import com.readnest.pojo.Record;
import com.readnest.pojo.userRecord;

import java.util.Date;
import java.util.List;

public interface RecordService {
    Pages fetchRecords(Integer page, Integer pageSize);

    Pages searchRecords(Integer page, Integer pageSize, String status, String searchItem, Date startDate, Date endDate);

    Detail getRecordById(String recordId);

    List<userRecord> getRecordsByUsername(String username);
}
