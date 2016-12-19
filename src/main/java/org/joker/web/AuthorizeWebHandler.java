package org.joker.web;

import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.joker.perf.annotation.ToMonitor;
import org.joker.service.GithubService;
import org.joker.service.GoogleService;
import org.joker.service.LinkedInService;

import java.io.IOException;

@ToMonitor
@Singleton
public class AuthorizeWebHandler {

    @Inject
    GithubService githubService;

    @Inject
    GoogleService googleService;

    @Inject
    LinkedInService linkedInService;

    @WebGet("/authorize")
    public void authorize(@WebParam("type") String type, RequestContext rc) {
        String authUrl = null;

        switch (type) {
            case "github":
                authUrl = githubService.getAuthURL();
                break;
            case "google":
                authUrl = googleService.getAuthURL();
                break;
            case "linkedIn":
                authUrl = linkedInService.getAuthURL();
                break;
        }

        if(authUrl != null){
            try {
                rc.getRes().sendRedirect(authUrl);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
