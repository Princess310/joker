package org.joker.service;

import com.github.scribejava.apis.FacebookApi;
import com.github.scribejava.apis.LinkedInApi;
import com.github.scribejava.apis.LinkedInApi20;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.*;
import com.github.scribejava.core.oauth.OAuth10aService;
import com.github.scribejava.core.oauth.OAuth20Service;
import com.google.inject.Singleton;

import java.io.IOException;
import java.util.Random;

@Singleton
public class LinkedInService {
    private static final String NETWORK_NAME = "LinkedIn";
    private static final String PROTECTED_RESOURCE_URL = "https://api.linkedin.com/v1/people/~:(id,num-connections,firstName,lastName,picture-url)?format=json";
    private String clientId = "8690re242arz7x";
    private final String clientSecret = "pSIUzL2CdnHPv5Ah";
    private final String secretState = "secret" + new Random().nextInt(999_999);
    private final OAuth20Service service = new ServiceBuilder()
            .apiKey(clientId).apiSecret(clientSecret)
            .scope("r_basicprofile") // replace with desired scope
            .callback("http://localhost:8080/linkedin_callback")
            .state("some_params")
            .build(LinkedInApi20.instance());

    private final String authorizationUrl = service.getAuthorizationUrl();

    public String getAuthURL(){
        return authorizationUrl;
    }

    public Response getToken(String code){
        try {
            final OAuth2AccessToken accessToken = service.getAccessToken(code);

            final OAuthRequest request = new OAuthRequest(Verb.GET, PROTECTED_RESOURCE_URL,
                    service.getConfig());

            service.signRequest(accessToken, request);

            return request.send();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
