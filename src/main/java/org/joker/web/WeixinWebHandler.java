package org.joker.web;

import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.param.annotation.WebUser;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.joker.dao.UserDao;
import org.joker.entity.User;
import org.joker.perf.annotation.ToMonitor;

@Singleton
@ToMonitor
public class WeixinWebHandler {

    @Inject
    private UserDao userDao;

    @Inject
    private WebResponseBuilder webResponseBuilder;


    @WebGet("/wx")
    public WebResponse getUserList(@WebUser User user, @WebParam("echostr") String echostr){
        System.out.println("echostr");
        System.out.println(echostr);

        return webResponseBuilder.success(echostr);
    }
}
