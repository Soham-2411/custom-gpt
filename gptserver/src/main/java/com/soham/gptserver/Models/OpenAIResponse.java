package com.soham.gptserver.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpenAIResponse {
    private List<Choice> choices;

    @Data
    @AllArgsConstructor
    public static class Choice{
        private int index;
        private Message message;

    }
    @Data
    @AllArgsConstructor
    public static class Message{
        private String role;
        private String content;
    }
}
