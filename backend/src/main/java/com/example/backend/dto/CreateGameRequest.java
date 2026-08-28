package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateGameRequest {
    private Long player1Id;
    private Long player2Id;
}
