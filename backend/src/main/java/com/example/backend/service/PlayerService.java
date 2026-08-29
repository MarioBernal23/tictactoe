package com.example.backend.service;

import com.example.backend.entity.Player;
import com.example.backend.exception.PlayerNotFoundException;
import com.example.backend.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PlayerService {

    private final PlayerRepository playerRepository;


    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    public Player getPlayerById(Long id) {
        return playerRepository.findById(id)
                .orElseThrow( () -> new PlayerNotFoundException("Player not found"));
    }

    public Player login(String username, String password) {
        Player player = playerRepository.findByUsername(username)
                .orElseThrow(() -> new PlayerNotFoundException("Invalid username or password"));

        if (!player.getPassword().equals(password)) {
            throw new PlayerNotFoundException("Invalid username or password");
        }

        return player;
    }
}
