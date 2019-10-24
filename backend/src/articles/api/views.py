from rest_framework.generics import \
    (ListAPIView,
     CreateAPIView,
     RetrieveAPIView,
     UpdateAPIView
     )

from articles.models import Article
from .serializers import ArticleSerializer


class ArticleListView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class ArticDetailView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
