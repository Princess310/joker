package org.joker.dao;

import com.google.inject.Singleton;
import org.j8ql.query.Query;
import org.joker.entity.Tag;

import java.time.LocalDateTime;
import java.util.List;

@Singleton
public class TagDao extends BaseDao<Tag,Long> {
    public List<Tag> getTagList (){
        List<Tag> list =  daoHelper.list(Query.select(Tag.class));
        return list;
    }

    public Tag createTag(String name, String color){
        Tag tag = new Tag();
        tag.setName(name);
        tag.setColor(color);
        tag.setCtime(LocalDateTime.now());
        tag.setUtime(LocalDateTime.now());
        // for User, we can create new ones without an existing User
        Long id = create(null, tag);

        return get(null,id).get();
    }
}