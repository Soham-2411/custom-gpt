package com.soham.gptserver.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import com.soham.gptserver.Service.OpenAIService;
@RestController
@RequestMapping("/api")
public class ChatController {

    @Autowired
    OpenAIService openAIService;

    @PostMapping("/chat")
    public ResponseEntity<String> processGptResponse(@RequestBody Map<String, String> request){
        String prompt = request.get("prompt");
        if (prompt == null || prompt.isEmpty()) {
            return ResponseEntity.badRequest().body("Prompt cannot be null or empty.");
        }
        try {
            String gptResponse = openAIService.getGptResponse(prompt);
            return ResponseEntity.ok(gptResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred: " + e.getMessage());
        }
    }
}
