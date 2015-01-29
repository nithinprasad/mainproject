from django.contrib import admin
from blog.models import UserProfile, Post ,Friend
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from blog.models import UserProfile

# ...

# Register your models here.
admin.site.register(Post)
admin.site.register(Friend)
admin.site.register(UserProfile)
class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'profile'

# Define a new User admin
class UserAdmin(UserAdmin):
    inlines = (UserProfileInline, )

# Re-register UserAdmin

