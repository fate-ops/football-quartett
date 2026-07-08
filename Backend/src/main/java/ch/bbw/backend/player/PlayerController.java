package ch.bbw.backend.player;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PlayerController {

    private final PlayerRepository playerRepository;

    @GetMapping
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Player getPlayerById(@PathVariable Long id) {
        return playerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Player not found with id: " + id));
    }

    @PostMapping
    public Player createPlayer(@RequestBody Player player) {
        return playerRepository.save(player);
    }

    @PutMapping("/{id}")
    public Player updatePlayer(@PathVariable Long id, @RequestBody Player updatedPlayer) {
        Player player = playerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Player not found with id: " + id));

        player.setName(updatedPlayer.getName());
        player.setClub(updatedPlayer.getClub());
        player.setNation(updatedPlayer.getNation());
        player.setPosition(updatedPlayer.getPosition());
        player.setPace(updatedPlayer.getPace());
        player.setShooting(updatedPlayer.getShooting());
        player.setPassing(updatedPlayer.getPassing());
        player.setDribbling(updatedPlayer.getDribbling());
        player.setDefending(updatedPlayer.getDefending());
        player.setPhysical(updatedPlayer.getPhysical());
        player.setOverall(updatedPlayer.getOverall());

        return playerRepository.save(player);
    }

    @DeleteMapping("/{id}")
    public void deletePlayer(@PathVariable Long id) {
        playerRepository.deleteById(id);
    }
}