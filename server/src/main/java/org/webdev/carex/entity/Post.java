package org.webdev.carex.entity;

import jakarta.persistence.*;
import lombok.*;
import org.webdev.carex.entity.common.BaseEntity;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "posts")
public class Post extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    private User author;

    private String content;

    private String imageUrl;

    // many posts can have many users likes
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "posts_likes", joinColumns =
    @JoinColumn(name = "post_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id",
                    referencedColumnName = "id")
    )
    private List<User> likes;
}
