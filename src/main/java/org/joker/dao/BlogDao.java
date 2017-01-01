package org.joker.dao;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.j8ql.Record;
import org.j8ql.Runner;
import org.j8ql.query.Condition;
import org.j8ql.query.Query;
import org.joker.entity.Blog;
import org.joker.entity.BlogTag;
import org.joker.entity.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Singleton
public class BlogDao extends BaseDao<Blog,Long> {
    @Inject
    private BlogTagDao blogTagDao;

    public List<Blog> getBlogList (User user, String keyword, Long tagId, int page, int pageSize, String... orderBy){
        StringBuilder sql = new StringBuilder();
        List params = new ArrayList();
        String condition = "";

        sql.append("select blog.* from blog");

        if(!keyword.trim().equals("")){
            condition += " where blog.title like ?";
            params.add("%" + keyword + "%");
        }

        if(tagId != 0){
            Condition tagCondition = Query.and("tagId", tagId);
            List<BlogTag> blogTagList = blogTagDao.list(user, tagCondition, 0, 100);
            if(blogTagList.size() > 0){
                String filter = blogTagList.stream().map(bt -> {
                    return bt.getBlogId().toString();
                }).collect(Collectors.joining(","));

                if(condition != ""){
                    condition += " and blog.id in (" + filter + ")";
                }else {
                    condition += " where blog.id in (" + filter + ")";
                }
            }else {
                return  new ArrayList<>();
            }
        }

        sql.append(condition);
        sql.append(" order by id desc offset ? limit ?");
        params.add(page * pageSize);
        params.add(pageSize);

        try (Runner runner = daoHelper.openRunner()) {
            return runner.list(Blog.class, sql.toString(), params.toArray());
        }
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