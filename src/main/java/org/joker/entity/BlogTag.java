package org.joker.entity;

public class BlogTag {
    private Long blogId;
    private Long TagId;

    public Long getBlogId() {
        return blogId;
    }

    public void setBlogId(Long blogId) {
        this.blogId = blogId;
    }

    public Long getTagId() {
        return TagId;
    }

    public void setTagId(Long tagId) {
        TagId = tagId;
    }
}
