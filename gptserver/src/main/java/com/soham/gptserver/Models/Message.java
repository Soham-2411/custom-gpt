package com.soham.gptserver.Models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Message{
    private String role;
    private String content;
}
