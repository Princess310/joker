package org.joker.dao;

import com.google.inject.Inject;
import com.google.inject.Singleton;
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

    public List<Blog> getBlogList (){
        List<Blog> list =  daoHelper.list(Query.select(Blog.class));
        return list;
    }

    public Blog createBlog(User user, String title, Long tagId, String content){
        Blog blog = new Blog(title, content, user.getId(), LocalDateTime.now(), LocalDateTime.now());
        Long id = create(null, blog);

        // BlogTag
        BlogTag blogTag = new BlogTag(id, tagId, LocalDateTime.now(), LocalDateTime.now());
        blogTagDao.create(user, blogTag);

        return get(null,id).get();
    }
}