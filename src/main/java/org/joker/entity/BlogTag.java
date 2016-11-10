package org.joker.entity;

import java.time.LocalDateTime;

public class BlogTag  extends BaseEntity<Long> {
    private Long blogId;
    private Long tagId;
    private LocalDateTime ctime;
    private LocalDateTime utime;

    public BlogTag() {
    }

    public BlogTag(Long blogId, Long tagId, LocalDateTime ctime, LocalDateTime utime) {
        this.blogId = blogId;
        this.tagId = tagId;
        this.ctime = ctime;
        this.utime = utime;
    }

    public Long getBlogId() {
        return blogId;
    }

    public void setBlogId(Long blogId) {
        this.blogId = blogId;
    }

    public Long getTagId() {
        return tagId;
    }

    public void setTagId(Long tagId) {
        this.tagId = tagId;
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

    public String toString(){
        return "blogId: " + this.getBlogId() + ", tagId: " + this.getTagId();
    }
}
