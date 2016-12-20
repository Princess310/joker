package org.joker.dao;

import com.google.common.base.Strings;
import com.google.inject.Singleton;
import org.j8ql.Record;
import org.j8ql.Runner;
import org.j8ql.query.Condition;
import org.j8ql.query.Query;
import org.joker.entity.Message;
import org.joker.entity.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Singleton
public class MessageDao extends BaseDao<Message,Long> {

    public Message createMessage(User user, Long blogId, String content){
        Message message = new Message(blogId, content, LocalDateTime.now(), LocalDateTime.now());

        if(user != null && !Strings.isNullOrEmpty(user.getUsername())){
            message.setUserId(user.getId());
        }

        Long id = create (user, message);

        return (id > 0 ? message : null);
    }

    public List<Record> getMessageList(User user, Long blogId, int page, int pageSize, String... orderBy){
        List params = new ArrayList();

        String sql = "select * from message m left join \"user\" u on u.id = m.\"userId\" where m.\"blogId\" = ?  offset ? limit ?";
        params.add(blogId);
        params.add(page * pageSize);
        params.add(pageSize);;


        try (Runner runner = daoHelper.openRunner()) {
            System.out.printf("----");

            return runner.list(Record.class, sql.toString(), params.toArray());
        }
    }
}
