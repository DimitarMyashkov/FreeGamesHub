from django.db import models
from django.contrib.auth.models import User

class Game(models.Model):
    title = models.CharField(max_length = 100)
    description = models.TextField(blank = True)
    slug = models.SlugField(unique = True)
    url = models.CharField(max_length = 200, help_text = "link to the game")
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.title

class GameProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'game')

    def __str__(self):
        return f"{self.user.username} - {self.game.title} - {'Completed' if self.is_completed else ''}"