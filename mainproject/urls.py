from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'mainproject.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'blog.views.index', name='index'),
    url(r'^ulogin/', 'blog.views.ulogin', name='ulogin'),
    url(r'^register/', 'blog.views.register', name='register'),
    url(r'^logout/', 'blog.views.user_logout', name='logout'),
    url(r'^home/(?P<profile_id>.+)$','blog.views.home', name='home'),
    url(r'^profile/(?P<profile_id>.+)$','blog.views.profile', name='profile'),
    url(r'^post/','blog.views.post', name='post'),
    url(r'^friend_request/','blog.views.friend_request', name='friend_request'),
    url(r'^client_side/','blog.views.client_side', name='client_side'),

    
    
)
handler404 = "blog.views.error404"