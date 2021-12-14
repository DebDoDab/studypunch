from rest_framework import routers
from accounts.views import UserViewSet
from groups.views import GroupViewSet
from homework.views import HomeworkViewSet
from subjects.views import SubjectViewSet
from donehomework.views import DoneHomeworkViewSet
from columns.views import ColumnViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'users', viewset=UserViewSet)
router.register(r'groups', viewset=GroupViewSet)
router.register(r'homework', viewset=HomeworkViewSet)
router.register(r'subjects', viewset=SubjectViewSet)
router.register(r'donehomework', viewset=DoneHomeworkViewSet)
router.register(r'columns', viewset=ColumnViewSet)

urlpatterns = [
    path(r'', include(router.urls)),
    # path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    # path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]
