from django.urls import path
from.views import ArticleListView, ArticDetailView

urlpatterns = [
    path('', ArticleListView.as_view()),
    path('<pk>/', ArticDetailView.as_view()),
]