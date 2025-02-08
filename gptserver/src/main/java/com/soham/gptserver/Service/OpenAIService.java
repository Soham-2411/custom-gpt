package com.soham.gptserver.Service;


import java.util.*;
import com.soham.gptserver.Models.ChatMessage;
import com.soham.gptserver.Models.OpenAIRequest;
import com.soham.gptserver.Models.OpenAIResponse;
import com.soham.gptserver.Repository.ChatRepository;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
public class OpenAIService {
    private final Dotenv dotenv = Dotenv.load();
    @Value("${openai.api.url}")
    private String apiUrl;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private RestTemplate restTemplate;

   public String getGptResponse(String prompt, String context){
       String fullPrompt = context + "\nUser: " + prompt + "\nAssistant:";
       OpenAIRequest request = new OpenAIRequest(
               "gpt-4o",
            fullPrompt
       );
       System.out.println("processed a response: " +  prompt);
       OpenAIResponse response = restTemplate.postForObject(apiUrl, request, OpenAIResponse.class);
       System.out.println("processed a response");
       System.out.println(response.getChoices().getFirst().getMessage().getContent());
       return response.getChoices().getFirst().getMessage().getContent();

   }


   public List<ChatMessage> getChatHistory(){
      return chatRepository.findAll();
   }

   public ChatMessage saveMessage(ChatMessage chatMessage){
       return chatRepository.save(chatMessage);
   }


}
