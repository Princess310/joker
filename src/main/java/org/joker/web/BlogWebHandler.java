package org.joker.web;

import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.param.annotation.WebUser;
import com.britesnow.snow.web.rest.annotation.WebDelete;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.britesnow.snow.web.rest.annotation.WebPost;
import com.britesnow.snow.web.rest.annotation.WebPut;
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
    public WebResponse getBlogList(@WebUser User user, @WebParam("keyword") String keyword){
        List<Blog> blogs = blogDao.getBlogList(user,keyword,0,100);

        return webResponseBuilder.success(blogs);
    }

    @WebPost("/createBlog")
    public WebResponse createBlog(@WebUser User user, @WebParam("title") String title, @WebParam("breif") String breif ,
                                  @WebParam("tagId") Long tagId, @WebParam("picFileId") Long picFileId, @WebParam("audioFileId") Long audioFileId,
                                  @WebParam("content") String content){
        Blog blog  = blogDao.createBlog(user, title, breif, tagId, picFileId, audioFileId, content);

        return webResponseBuilder.success(blog);
    }

    @WebDelete("/deleteBlogs")
    public WebResponse deleteBlogs(@WebParam("ids") String ids){
        blogDao.deleteBlogs(ids);
        return webResponseBuilder.success();
    }

    @WebPut("/updateBlog")
    public  WebResponse updateBlog(@WebUser User user, @WebParam("id") Long id, @WebParam("title") String title,
                                   @WebParam("breif") String breif, @WebParam("content") String content, @WebParam("tagId") Long tagId,
                                   @WebParam("picFileId") Long picFileId, @WebParam("audioFileId") Long audioFileId){
        Blog blog = blogDao.updateBlog(user, id, title, breif, content, tagId, picFileId, audioFileId);

        return webResponseBuilder.success(blog);
    }
}
