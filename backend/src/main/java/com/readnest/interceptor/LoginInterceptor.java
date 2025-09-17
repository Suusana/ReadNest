package com.readnest.interceptor;

import com.readnest.pojo.Result;
import com.readnest.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import com.alibaba.fastjson.JSONObject;

@Component
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String url = request.getRequestURL().toString();

        if (url.contains("login")) {
            return true;
        }
        String jwt = request.getHeader("Authorization");

        if (!StringUtils.hasLength(jwt) || !jwt.startsWith("Bearer ")) {
            Result error = Result.error("You have not login 11");
            String notLogin = JSONObject.toJSONString(error);
            response.getWriter().write(notLogin);
            return false;
        }
        // the real token
        jwt = jwt.substring(7);
        try {
            JwtUtil.parseJWT(jwt);
        } catch (Exception e){
            e.printStackTrace();
            Result error = Result.error("Invalid or expired token.");
            String notLogin = JSONObject.toJSONString(error);
            response.getWriter().write(notLogin);
            return false;
        }
        return true;
    }
}



