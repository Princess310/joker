package org.joker.dao;

import com.google.inject.Singleton;
import org.j8ql.query.Query;
import org.joker.entity.Blog;

import java.util.List;

@Singleton
public class BlogDao extends BaseDao<Blog,Long> {
    public List<Blog> getBlogList (){
        List<Blog> list =  daoHelper.list(Query.select(Blog.class));
        return list;
    }
}