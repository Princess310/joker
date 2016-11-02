package org.joker.web;

import com.britesnow.snow.web.param.annotation.WebUser;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.joker.dao.TagDao;
import org.joker.entity.Tag;
import org.joker.entity.User;
import org.joker.perf.annotation.ToMonitor;

import java.util.List;

@Singleton
@ToMonitor
public class TagWebHandler {

    @Inject
    private TagDao tagDao;

    @Inject
    private WebResponseBuilder webResponseBuilder;

    @WebGet("/getTagList")
    public WebResponse getBlogList(@WebUser User user){
        List<Tag> tags = tagDao.getTagList();

        return webResponseBuilder.success(tags);
    }
}
