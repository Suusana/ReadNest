package com.readnest.pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Detail {
    private Integer recordId;
    private String username;
    private String email;
    private String avatar;
    private String bookName;
    private String description;
    private String author;
    private String cover;
    private List<String> tags;
    private Date borrowDate;
    private Date dueDate;
    private Date returnDate;
    private Integer status;
}
