package com.example.backend.service;

import com.example.backend.entity.Game;
import com.example.backend.entity.Player;
import com.example.backend.entity.Status;
import com.example.backend.exception.GameNotFoundException;
import com.example.backend.repository.GameRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class GameServiceTest {

    @Mock
    private GameRepository gameRepository;

    @InjectMocks
    private GameService gameService;

    @Test
    void shouldCreateGame() {
        Player player1 = new Player();
        Player player2 = new Player();

        when(gameRepository.save(any(Game.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Game game = gameService.createGame(player1,player2);

        assertNotNull(game);
        assertNotNull(game.getBoard());
        assertEquals(Status.IN_PROGRESS, game.getStatus());
        assertNull(game.getWinner());

        assertEquals(player1, game.getPlayer1());
        assertEquals(player2, game.getPlayer2());

        assertNotNull(game.getCurrentPlayer());

        assertTrue(
                (game.getPlayer1Symbol() == 'X' && game.getPlayer2Symbol() == 'O') ||
                        (game.getPlayer1Symbol() == 'O' && game.getPlayer2Symbol() == 'X')
        );

        verify(gameRepository).save(any(Game.class));
    }

    @Test
    void shouldGetGameById() {
        Player player1 = new Player();
        Player player2 = new Player();

        when(gameRepository.save(any(Game.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Game game = gameService.createGame(player1, player2);
        game.setId(1L);

        when(gameRepository.findById(game.getId()))
                .thenReturn(Optional.of(game));

        Game result = gameService.getGameById(game.getId());

        assertEquals(game, result);
    }

    @Test
    void shouldThrowGameNotFoundException() {
        when(gameRepository.findById(1L))
                .thenReturn(Optional.empty());

        GameNotFoundException exception = assertThrows(
                GameNotFoundException.class,
                () -> gameService.getGameById(1L)
        );
    }
}
