package org.joker.web;

import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.param.annotation.WebUser;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.britesnow.snow.web.rest.annotation.WebPost;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.joker.dao.BlogDao;
import org.joker.entity.Blog;
import org.joker.entity.User;
import org.joker.perf.annotation.ToMonitor;

import java.util.List;

@Singleton
@ToMonitor
public class BlogWebHandler {

    @Inject
    private BlogDao blogDao;

    @Inject
    private WebResponseBuilder webResponseBuilder;

    @WebGet("/getBlogList")
    public WebResponse getBlogList(@WebUser User user){
        List<Blog> blogs = blogDao.getBlogList();

        return webResponseBuilder.success(blogs);
    }

    @WebPost("/createBlog")
    public WebResponse createBlog(@WebUser User user, @WebParam("title") String title, @WebParam("tagId") Long tagId, @WebParam("content") String content){
        Blog blog  = blogDao.createBlog(user, title, tagId, content);

        return webResponseBuilder.success(blog);
    }
}
