package com.soham.gptserver.Repository;

import com.soham.gptserver.Models.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<ChatMessage, Long> {
}
