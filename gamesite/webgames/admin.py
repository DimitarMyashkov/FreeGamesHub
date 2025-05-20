from django.contrib import admin
from .models import Game

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'created_at')
    prepopulated_fields = {'slug': ('title',)}

# admin.site.register(Game)