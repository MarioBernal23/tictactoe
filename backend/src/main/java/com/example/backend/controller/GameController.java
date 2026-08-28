package com.example.backend.controller;

import com.example.backend.dto.CreateGameRequest;
import com.example.backend.dto.MakeMoveRequest;
import com.example.backend.entity.Game;
import com.example.backend.entity.Player;
import com.example.backend.service.GameService;
import com.example.backend.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;
    private final PlayerService playerService;

    @PostMapping
    public ResponseEntity<Game> createGame(@RequestBody CreateGameRequest createGameRequest) {
        Player player1 = playerService.getPlayerById(createGameRequest.getPlayer1Id());
        Player player2 = playerService.getPlayerById(createGameRequest.getPlayer2Id());

        Game game = gameService.createGame(player1, player2);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(game);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable Long id) {
        Game game = gameService.getGameById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(game);
    }

    @PostMapping("/{id}/moves")
    public ResponseEntity<Game> makeMove(@PathVariable Long id, @RequestBody MakeMoveRequest makeMoveRequest) {
        Game game = gameService.makeMove(id, makeMoveRequest.getPosition());
        return ResponseEntity.status(HttpStatus.OK)
                .body(game);
    }
}
