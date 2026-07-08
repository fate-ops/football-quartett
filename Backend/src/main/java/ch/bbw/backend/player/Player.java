package ch.bbw.backend.player;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "player")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String club;

    @Column(nullable = false)
    private String nation;

    @Column(nullable = false)
    private String position;

    @Column(nullable = false)
    private int pace;

    @Column(nullable = false)
    private int shooting;

    @Column(nullable = false)
    private int passing;

    @Column(nullable = false)
    private int dribbling;

    @Column(nullable = false)
    private int defending;

    @Column(nullable = false)
    private int physical;

    @Column(nullable = false)
    private int overall;
}