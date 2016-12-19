package org.joker.service;

import java.io.IOException;
import java.util.Random;
import com.github.scribejava.apis.GitHubApi;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import com.google.inject.Singleton;

@Singleton
public class GithubService {
    private static final String NETWORK_NAME = "GitHub";
    private static final String PROTECTED_RESOURCE_URL = "https://api.github.com/user";
    private final String clientId = "913e1b01909e741758de";
    private final String clientSecret = "a792a015a63b50fbda7914adabf1134d52459fc4";
    private final String secretState = "secret" + new Random().nextInt(999_999);
    private final OAuth20Service service = new ServiceBuilder()
            .apiKey(clientId)
            .apiSecret(clientSecret)
            .state(secretState)
            .callback("http://localhost:8080/github_callback")
            .build(GitHubApi.instance());
    private final String authorizationUrl = service.getAuthorizationUrl();

    public String getAuthURL(){
        return authorizationUrl;
    }

    public Response getToken(String code){
        OAuth2AccessToken accessToken = null;
        try {
            accessToken = service.getAccessToken(code);
        } catch (IOException e) {
            e.printStackTrace();
        }

        OAuthRequest request = new OAuthRequest(Verb.GET, PROTECTED_RESOURCE_URL, service.getConfig());
        if(accessToken != null){
            service.signRequest(accessToken, request);
        }

        return request.send();
    }
}
