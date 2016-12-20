package org.joker.web;

import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.param.annotation.WebUser;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.britesnow.snow.web.rest.annotation.WebPost;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.j8ql.Record;
import org.joker.dao.MessageDao;
import org.joker.entity.Message;
import org.joker.entity.User;
import org.joker.perf.annotation.ToMonitor;

import java.util.List;

@Singleton
@ToMonitor
public class MessageWebHandler {
    @Inject
    MessageDao messageDao;

    @Inject
    private WebResponseBuilder webResponseBuilder;

    @WebPost("/createMessage")
    public WebResponse createMessage(@WebUser User user, @WebParam("blogId") Long blogId, @WebParam("content") String content){
        Message message = messageDao.createMessage(user, blogId, content);

        return webResponseBuilder.success(message);
    }

    @WebGet("/getMessageList")
    public WebResponse getMessageList(@WebUser User user, @WebParam("blogId") Long blogId){
        List<Record> result = messageDao.getMessageList(user, blogId, 0, 100);

        return webResponseBuilder.success(result);
    }
}
