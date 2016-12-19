package org.joker.service;

import com.github.scribejava.apis.GoogleApi20;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import com.google.inject.Singleton;

import java.io.IOException;
import java.util.HashMap;
import java.util.Random;

@Singleton
public class GoogleService {
    private static final String NETWORK_NAME = "G+";
    private static final String PROTECTED_RESOURCE_URL = "https://www.googleapis.com/plus/v1/people/me";
    private final String clientId = "562136326887-5a5rfdv7bnostsrj2hhdpae90j9h6v73.apps.googleusercontent.com";
    private final String clientSecret = "m5lCXFqxThSleFfGq8EkOlrv";
    private final String secretState = "secret" + new Random().nextInt(999_999);
    private final OAuth20Service service = new ServiceBuilder()
            .apiKey(clientId)
            .apiSecret(clientSecret)
            .scope("profile") // replace with desired scope
            .state(secretState)
            .callback("http://localhost:8080/google_callback")
            .build(GoogleApi20.instance());
    //pass access_type=offline to get refresh token
    //https://developers.google.com/identity/protocols/OAuth2WebServer#preparing-to-start-the-oauth-20-flow
    private HashMap<String, String> additionalParams =
            new HashMap<String, String>() {
                {
                    put("access_type", "offline");
                    put("prompt", "consent");
                }
            };
    private final String authorizationUrl = service.getAuthorizationUrl(additionalParams);

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
