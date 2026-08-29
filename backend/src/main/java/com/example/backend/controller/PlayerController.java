package com.example.backend.controller;

import com.example.backend.dto.LoginRequest;
import com.example.backend.entity.Player;
import com.example.backend.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    @PostMapping
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) {
        Player createdPlayer = playerService.createPlayer(player);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(createdPlayer);
    }

    @PostMapping("/login")
    public ResponseEntity<Player> login(@RequestBody LoginRequest loginRequest) {

        Player player = playerService.login(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        );

        return ResponseEntity.ok(player);
    }
}
