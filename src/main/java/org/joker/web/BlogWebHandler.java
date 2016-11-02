package org.joker.web;

import com.britesnow.snow.web.param.annotation.WebUser;
import com.britesnow.snow.web.rest.annotation.WebGet;
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
}
