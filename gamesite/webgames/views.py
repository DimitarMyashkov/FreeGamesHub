from django.shortcuts import render, get_object_or_404
from django.shortcuts import redirect
from .models import Game

def game_list(request):
    games = Game.objects.all()
    return render(request, 'games/game_list.html', {'games': games})

def game_detail(request, slug):
    game = get_object_or_404(Game, slug = slug)
    return render(request, 'games/game_detail.html', {'game': game})

def relic_quest_redirect(request):
    return redirect('/static/webgames/relic_quest/index.html')
