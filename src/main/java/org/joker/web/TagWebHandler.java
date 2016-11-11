package org.joker.web;

import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.param.annotation.WebUser;
import com.britesnow.snow.web.rest.annotation.WebDelete;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.britesnow.snow.web.rest.annotation.WebPost;
import com.britesnow.snow.web.rest.annotation.WebPut;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.joker.dao.TagDao;
import org.joker.entity.Tag;
import org.joker.entity.User;
import org.joker.perf.annotation.ToMonitor;

import java.util.List;

@Singleton
@ToMonitor
public class TagWebHandler {

    @Inject
    private TagDao tagDao;

    @Inject
    private WebResponseBuilder webResponseBuilder;

    @WebGet("/getTagList")
    public WebResponse getBlogList(@WebUser User user, @WebParam("keyword") String keyword){
        List<Tag> tags = tagDao.getTagList(user,keyword,0,100);

        return webResponseBuilder.success(tags);
    }

    @WebPost("/createTag")
    public WebResponse createTag(@WebParam("name") String name, @WebParam("color") String color){
        Tag tag = tagDao.createTag(name, color);
        return webResponseBuilder.success(tag);
    }

    @WebDelete("/deleteTags")
    public WebResponse deleteTags(@WebParam("ids") String ids){
        tagDao.deleteTags(ids);
        return webResponseBuilder.success();
    }

    @WebPut("/updateTag")
    public WebResponse updateUser(@WebUser User user, @WebParam("id") Long id, @WebParam("name" ) String name, @WebParam("color") String color){
        Tag tag = tagDao.updateTag(user, id, name ,color);
        return webResponseBuilder.success(tag);
    }
}
