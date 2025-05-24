from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404
from django.shortcuts import redirect
from .models import Game
from .models import GameProgress

@login_required
def game_list(request):
    games = Game.objects.all()
    return render(request, 'games/game_list.html', {'games': games})

def game_detail(request, slug):
    game = get_object_or_404(Game, slug = slug)
    is_completed = False
    if request.user.is_authenticated:
        is_completed = GameProgress.objects.filter(user = request.user, game = game, is_completed = True).exists()

    return render(request, 'games/game_detail.html', {
        'game': game,
        'is_completed': is_completed
    })

def relic_quest_redirect(request):
    return redirect('/static/webgames/relic_quest/index.html')

def mark_completed(request, slug):
    game = get_object_or_404(Game, slug = slug)
    if request.user.is_authenticated:
        progress, created = GameProgress.objects.get_or_create(user = request.user, game = game)
        progress.is_completed = True
        progress.save()
    return redirect('game_detail', slug = slug)
