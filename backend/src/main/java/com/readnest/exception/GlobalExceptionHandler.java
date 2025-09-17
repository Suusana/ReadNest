package com.readnest.exception;

import com.readnest.pojo.Result;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public Result exception(Exception exception) {
        exception.printStackTrace();
        return Result.error(exception.getMessage());
    }
}
