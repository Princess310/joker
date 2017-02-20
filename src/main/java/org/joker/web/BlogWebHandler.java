package org.joker.web;

import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.param.annotation.WebUser;
import com.britesnow.snow.web.rest.annotation.WebDelete;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.britesnow.snow.web.rest.annotation.WebPost;
import com.britesnow.snow.web.rest.annotation.WebPut;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.j8ql.Record;
import org.joker.dao.BlogDao;
import org.joker.dao.TagDao;
import org.joker.entity.Blog;
import org.joker.entity.Tag;
import org.joker.entity.User;
import org.joker.perf.annotation.ToMonitor;

import java.util.HashMap;
import java.util.List;

@Singleton
@ToMonitor
public class BlogWebHandler {

    @Inject
    private BlogDao blogDao;

    @Inject
    private TagDao tagDao;

    @Inject
    private WebResponseBuilder webResponseBuilder;

    @WebGet("/getBlogList")
    public WebResponse getBlogList(@WebUser User user, @WebParam("keyword") String keyword, @WebParam("tagId") Long tagId, @WebParam("page") Integer page, @WebParam("pageSize") Integer pageSize){
        List<Record> blogs = blogDao.getBlogList(user, keyword, tagId, page, pageSize);
        List<Record> bc = blogDao.getBlogList(user, "", 0L, 0, 1000);

        return webResponseBuilder.success(new WebResponse.ListResult(blogs, page, (int) Math.ceil(bc.size() / pageSize), bc.size()));
    }

    @WebGet("/getBlogDetail")
    public WebResponse getBlogDetail(@WebUser User user, @WebParam("id") Long id){
        Blog blog = blogDao.get(user ,id).orElse(null);
        Tag tag = tagDao.getTagByBlog(user, id);

        // update view count
        Long viewCount = blog.getViewCount();
        viewCount++;
        blog.setViewCount(viewCount);
        blogDao.update(user, blog, blog.getId());


        HashMap result = new HashMap();
        result.put("blog", blog);
        result.put("tag", tag);

        return webResponseBuilder.success(result);
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
