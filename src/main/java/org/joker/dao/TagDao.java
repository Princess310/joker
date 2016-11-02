package org.joker.dao;

import com.google.inject.Singleton;
import org.j8ql.query.Query;
import org.joker.entity.Tag;

import java.util.List;

@Singleton
public class TagDao extends BaseDao<Tag,Long> {
    public List<Tag> getTagList (){
        List<Tag> list =  daoHelper.list(Query.select(Tag.class));
        return list;
    }
}