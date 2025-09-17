package com.readnest.controller;

import com.readnest.pojo.*;
import com.readnest.pojo.Record;
import com.readnest.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api")
public class recordController {
    @Autowired
    private RecordService recordService;

    @GetMapping("/recordsData")
    public Result fetchRecords(@RequestParam(defaultValue = "1") Integer page,
                               @RequestParam(defaultValue = "5") Integer pageSize){
        Pages records = recordService.fetchRecords(page,pageSize);
        return Result.success(records);
    }

    @GetMapping("/searchRecords")
    public Result searchRecords(@RequestParam(defaultValue = "1") Integer page,
                                @RequestParam(defaultValue = "5") Integer pageSize,
                                @RequestParam String status,
                                @RequestParam String SearchItem,
                                @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate){
        Pages records = recordService.searchRecords(page,pageSize,status, SearchItem,startDate,endDate);
        return Result.success(records);
    }

    @GetMapping("/fetchRecord")
    public Result getDetail(@RequestParam String recordId ){
        Detail detail = recordService.getRecordById(recordId);
        return Result.success(detail);
    }

    @GetMapping("/fetchUserRecords")
    public Result fetchUserRecords(@RequestParam String username ){
        List<userRecord> details = recordService.getRecordsByUsername(username);
        return Result.success(details);
    }
}
