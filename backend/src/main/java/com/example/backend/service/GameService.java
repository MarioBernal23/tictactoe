package com.example.backend.service;

import com.example.backend.entity.Board;
import com.example.backend.entity.Game;
import com.example.backend.entity.Player;
import com.example.backend.entity.Status;
import com.example.backend.exception.CellAlreadyOccupiedException;
import com.example.backend.exception.GameAlreadyFinishedException;
import com.example.backend.exception.GameNotFoundException;
import com.example.backend.exception.InvalidPositionException;
import com.example.backend.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;

@RequiredArgsConstructor
@Service
public class GameService {

    private final GameRepository gameRepository;

    public Game createGame(Player player1, Player player2) {
        Game game = new Game();
        game.setBoard(new Board());
        game.setPlayer1(player1);
        game.setPlayer2(player2);

        Random random = new Random();

        if (random.nextBoolean()) {
            game.setCurrentPlayer(player1);
            game.setPlayer1Symbol('X');
            game.setPlayer2Symbol('O');
        } else {
            game.setCurrentPlayer(player2);
            game.setPlayer1Symbol('O');
            game.setPlayer2Symbol('X');
        }

        game.setWinner(null);
        game.setStatus(Status.IN_PROGRESS);
        return gameRepository.save(game);
    }

    public Game getGameById(Long id) {
        return gameRepository.findById(id)
                .orElseThrow( () -> new GameNotFoundException("Game not found"));
    }

    public Game makeMove(Long gameId, int position) {
        Game game = getGameById(gameId);

        if (game.getStatus() != Status.IN_PROGRESS) {
            throw new GameAlreadyFinishedException("Game is already finished");
        }

        if (position > 8 || position < 0) {
            throw new InvalidPositionException("Position is out of the board");
        }

        Character[] cells = game.getBoard().getCells();

        if (cells[position] != null) {
            throw new CellAlreadyOccupiedException("Cell is already occupied");
        }

        cells[position] = getCurrentPlayerSymbol(game);

        if (hasWinner(cells)) {
            game.setWinner(game.getCurrentPlayer());
            game.setStatus(Status.FINISHED);

            return gameRepository.save(game);
        }

        if (isBoardFull(cells)) {
            game.setStatus(Status.DRAW);
            return gameRepository.save(game);
        }

        if (game.getCurrentPlayer().equals(game.getPlayer1())) {
            game.setCurrentPlayer(game.getPlayer2());
        } else {
            game.setCurrentPlayer(game.getPlayer1());
        }

        return gameRepository.save(game);
    }

    private char getCurrentPlayerSymbol(Game game) {
        if (game.getCurrentPlayer().equals(game.getPlayer1())) {
            return game.getPlayer1Symbol();
        } else {
            return game.getPlayer2Symbol();
        }
    }

    private boolean hasWinner(Character[] cells) {
        int[][] winningCombinations = {
                {0, 1, 2},
                {3, 4, 5},
                {6, 7, 8},
                {0, 3, 6},
                {1, 4, 7},
                {2, 5, 8},
                {0, 4, 8},
                {2, 4, 6}
        };

        for (int[] combination : winningCombinations) {

            if (cells[combination[0]] != null
                    && cells[combination[0]] == cells[combination[1]]
                    && cells[combination[1]] == cells[combination[2]]) {
                return true;
            }
        }
        return false;
    }

    private boolean isBoardFull(Character[] cells) {
        for (Character cell : cells) {
            if (cell == null) {
                return false;
            }
        }
        return true;
    }
}