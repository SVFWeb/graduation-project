package com.example.projectsystem.commons;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/*
* 封装返回结果公共类
* */
public class Results implements Serializable {
    /*状态码*/
    private Integer code;
    private String message;
    /*是否成功标记*/
    private Boolean success;
    /*响应数据*/
    private Map<String, Object> data = new HashMap<>();

    public Results() {
    }

    public Results(Integer code, String message, Boolean success, Map<String, Object> data) {
        this.code = code;
        this.message = message;
        this.success = success;
        this.data = data;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public static Results success() {
        Results mess = new Results();
        mess.setCode(200);
        mess.setMessage("响应成功");
        mess.setSuccess(true);
        return mess;
    }

    public static Results fail() {
        Results mess = new Results();
        mess.setCode(500);
        mess.setMessage("响应失败");
        mess.setSuccess(false);
        return mess;
    }

    public Results data(String key, Object value) {
        this.data.put(key, value);
        return this;
    }

    public Results code(Integer code) {
        this.setCode(code);
        return this;
    }

    public Results message(String message) {
        this.setMessage(message);
        return this;
    }
}
