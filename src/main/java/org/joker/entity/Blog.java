package org.joker.entity;

import java.time.LocalDateTime;

public class Blog extends BaseEntity<Long> {
    private String title;
    private String content;
    private String breif;
    private Long typeId;
    private Long picFileId;
    private Long audioFileId;
    private Long viewCount;
    private boolean isTop;
    private Long userId;
    private LocalDateTime ctime;
    private LocalDateTime utime;

    public Blog(){}

    public Blog(String title, String breif,  String content, Long userId, Long picFileId, Long audioFileId, LocalDateTime ctime, LocalDateTime utime) {
        this.title = title;
        this.breif = breif;
        this.content = content;
        this.userId = userId;
        this.picFileId = picFileId;
        this.audioFileId = audioFileId;
        this.ctime = ctime;
        this.utime = utime;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getTypeId() {
        return typeId;
    }

    public void setTypeId(Long typeId) {
        this.typeId = typeId;
    }

    public Long getViewCount() {
        return viewCount;
    }

    public void setViewCount(Long viewCount) {
        this.viewCount = viewCount;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public boolean isTop() {
        return isTop;
    }

    public void setTop(boolean top) {
        isTop = top;
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

    public String getBreif() {
        return breif;
    }

    public void setBreif(String breif) {
        this.breif = breif;
    }

    public Long getPicFileId() {
        return picFileId;
    }

    public void setPicFileId(Long picFileId) {
        this.picFileId = picFileId;
    }

    public Long getAudioFileId() {
        return audioFileId;
    }

    public void setAudioFileId(Long audioFileId) {
        this.audioFileId = audioFileId;
    }
}
