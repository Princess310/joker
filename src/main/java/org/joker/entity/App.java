package org.joker.entity;

/**
 * Created by Prionce on 2016/10/28 0028.
 * Record the app list
 */
public class App extends BaseEntity<Long> {
    private  String name;
    private String path;
    private String photoUrl;
    private String title;
    private String describe;
    private String describeUser;

    public App(String name, String path, String photoUrl, String title, String describe, String describeUser) {
        this.name = name;
        this.path = path;
        this.photoUrl = photoUrl;
        this.title = title;
        this.describe = describe;
        this.describeUser = describeUser;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public String getDescribeUser() {
        return describeUser;
    }

    public void setDescribeUser(String describeUser) {
        this.describeUser = describeUser;
    }
}
