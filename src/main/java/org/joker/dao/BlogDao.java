package org.joker.dao;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.j8ql.query.Condition;
import org.j8ql.query.Query;
import org.joker.entity.Blog;
import org.joker.entity.BlogTag;
import org.joker.entity.User;

import java.time.LocalDateTime;
import java.util.List;

@Singleton
public class BlogDao extends BaseDao<Blog,Long> {
    @Inject
    private BlogTagDao blogTagDao;

    public List<Blog> getBlogList (User user, String keyword, int page, int pageSize, String... orderBy){
        Condition condition = null;

        if(!keyword.trim().equals("")){
            condition = Query.or("title; ilike", "%" + keyword + "%");
        }

        return  daoHelper.list(listSelectBuilder(user,condition,page,pageSize,orderBy));
    }

    public Blog createBlog(User user, String title, String breif, Long tagId, Long picFileId, Long audioFileId, String content){
        Blog blog = new Blog(title, breif, content, user.getId(), picFileId, audioFileId, LocalDateTime.now(), LocalDateTime.now());
        Long id = create(null, blog);

        // BlogTag
        BlogTag blogTag = new BlogTag(id, tagId, LocalDateTime.now(), LocalDateTime.now());
        blogTagDao.create(user, blogTag);

        return get(null,id).get();
    }

    public void deleteBlogs(String blogIds){
        Condition condition = null;
        String[] ids = blogIds.trim().split(",");

        if(!blogIds.trim().equals("")){
            for(String id: ids){
                if(condition == null){
                    condition = Query.or("id", Long.parseLong(id));
                }else{
                    condition = condition.or("id", Long.parseLong(id));
                }
            }

            daoHelper.execute(Query.delete(entityClass).where(condition));
        }
    }

    public Blog updateBlog(User user, Long id, String title, String breif, String content, Long tagId, Long picFileId, Long audioFileId){
        Blog blog = daoHelper.first(Query.select(entityClass).where("id", id)).orElse(null);
        blog.setTitle(title);
        blog.setBreif(breif);
        blog.setContent(content);
        blog.setPicFileId(picFileId);
        blog.setAudioFileId(audioFileId);
        blog.setUtime(LocalDateTime.now());
        update(user, blog, id);

        Condition condition = Query.and("blogId",id );
        BlogTag blogTag = blogTagDao.daoHelper.first(Query.select(BlogTag.class).where(condition)).orElse(null);
        blogTag.setTagId(tagId);
        blogTag.setUtime(LocalDateTime.now());
        blogTagDao.update(user, blogTag, blogTag.getId());

        return blog;
    }
}