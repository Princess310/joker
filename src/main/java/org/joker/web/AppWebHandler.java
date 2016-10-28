package org.joker.web;

import com.britesnow.snow.web.rest.annotation.WebGet;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.joker.entity.App;
import org.joker.perf.annotation.ToMonitor;

import java.util.ArrayList;
import java.util.List;

@Singleton
@ToMonitor
public class AppWebHandler {

    @Inject
    private WebResponseBuilder webResponseBuilder;

    @WebGet("/getAppList")
    public WebResponse listUser(){
        // TODO: add the data to the database later
        App blog = new App("Blog", "/app/blog", "images/blog-index-bg.jpg", "生活点滴", "这里，属于我，也属于你", "博客er");
        App chat = new App("Chat", "/app/chat", "images/chat-index-bg.png", "畅所欲言", "聊一聊，那些年！", "畅聊");
        App gallery = new App("Gallery", "/app/gallery", "images/gallery-index-bg.png", "梦幻奇境", "动一动，画一画~", "神笔");
        App game = new App("Game", "/app/game", "images/game-index-bg.png", "游戏人生", "Game is not all", "电竞er");
        App media = new App("Media", "/app/media", "images/media-index-bg.jpg", "媒体时代", "动次打次", "Boxer");

        List<App> list = new ArrayList<>();
        list.add(blog);
        list.add(chat);
        list.add(gallery);
        list.add(game);
        list.add(media);
        return webResponseBuilder.success(list);
    }
}
