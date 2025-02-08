package com.soham.gptserver.Models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Data
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    private boolean isUser;
    @Column(columnDefinition = "TEXT")
    private String text;

    public ChatMessage(boolean isUser, String text){
        this.isUser = isUser;
        this.text = text;
    }

}
