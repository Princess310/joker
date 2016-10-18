package org.joker.web;

import com.britesnow.snow.web.param.annotation.WebUser;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.joker.dao.UserDao;
import org.joker.entity.User;
import org.joker.perf.annotation.ToMonitor;

import java.util.List;

/**
 * Created by jeremychone on 12/27/13.
 */
@Singleton
@ToMonitor
public class UserWebHandler {

    @Inject
    private UserDao userDao;

	@Inject
	private WebResponseBuilder webResponseBuilder;


    @WebGet("/das-list-user")
    public WebResponse listUser(@WebUser User user){
        List<User> users = userDao.list(user,null,0,100,"name");
        return webResponseBuilder.success(users);
    }

}
