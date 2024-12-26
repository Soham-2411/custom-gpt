package com.soham.gptserver.Models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class OpenAIRequest {
    private String model;
    private List<Message> messages;

    public OpenAIRequest(String model, String prompt){
        this.model = model;
        messages = new ArrayList<>();
        messages.add(new Message("user", prompt));
    }
}
