from django.db import models

class Game(models.Model):
    title = models.CharField(max_length = 100)
    description = models.TextField(blank = True)
    slug = models.SlugField(unique = True)
    url = models.CharField(max_length = 200, help_text = "link to the game")
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.title
