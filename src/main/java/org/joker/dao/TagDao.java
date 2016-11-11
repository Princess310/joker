package org.joker.dao;

import com.google.inject.Singleton;
import org.j8ql.query.Condition;
import org.j8ql.query.Query;
import org.joker.entity.Tag;
import org.joker.entity.User;

import java.time.LocalDateTime;
import java.util.List;

@Singleton
public class TagDao extends BaseDao<Tag,Long> {

    public List<Tag> getTagList (User user, String keyword, int page, int pageSize, String... orderBy){
        Condition condition = null;

        if(!keyword.trim().equals("")){
            condition = Query.or("name; ilike", "%" + keyword + "%");
        }

        return  daoHelper.list(listSelectBuilder(user,condition,page,pageSize,orderBy));
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

    public void deleteTags(String tagIds){
        Condition condition = null;
        String[] ids = tagIds.trim().split(",");

        if(!tagIds.trim().equals("")){
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

    public Tag updateTag(User user, Long id, String name, String color){
        Tag tag = daoHelper.first(Query.select(entityClass).where("id", id)).orElse(null);

        tag.setName(name);
        tag.setColor(color);
        tag.setUtime(LocalDateTime.now());

        update(user, tag, id);
        return tag;
    }
}