package com.readnest.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Record {
    private Integer recordId;
    private String username;
    private String bookName;
    private Date borrowDate;
    private Date dueDate;
    private Date returnDate;
    private Integer status;
}
