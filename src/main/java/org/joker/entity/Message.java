package org.joker.entity;

import java.time.LocalDateTime;

public class Message extends BaseEntity<Long> {
    private String username;
    private String email;
    private String content;
    private Long blogId;
    private Long userId;
    private Long pid;
    private LocalDateTime ctime;
    private LocalDateTime utime;


    public Message(Long blogId, String content, LocalDateTime ctime, LocalDateTime utime) {
        this.content = content;
        this.blogId = blogId;
        this.ctime = ctime;
        this.utime = utime;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getBlogId() {
        return blogId;
    }

    public void setBlogId(Long blogId) {
        this.blogId = blogId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public LocalDateTime getCtime() {
        return ctime;
    }

    public void setCtime(LocalDateTime ctime) {
        this.ctime = ctime;
    }

    public LocalDateTime getUtime() {
        return utime;
    }

    public void setUtime(LocalDateTime utime) {
        this.utime = utime;
    }
}
