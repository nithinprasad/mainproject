from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.utils import timezone

from django.utils import timezone


# Create your models here.



class UserProfile(models.Model):
    user = models.ForeignKey(User)   
    picture = models.ImageField(upload_to='profile_images/', blank=True,default='profile_images/new_user.png')
    dob = models.DateField(default=datetime.now())
    
    phone_number = models.CharField(max_length=15, blank=True)
    def create_user_profile(sender, instance, created, **kwargs):  
    	if created:  
       		profile, created = UserProfile.objects.get_or_create(user=instance)  

		post_save.connect(create_user_profile, sender=User) 

    
    def __unicode__(self):
    	return self.user.username
    User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])


class Post(models.Model):
    user_id = models.ForeignKey(User)
    pub_date = models.DateTimeField('date published',blank=True, default=timezone.now())
    text=models.CharField(max_length=200)
    def __unicode__(self):              # __unicode__ on Python 2
        return self.user_id.first_name+" "+self.user_id.last_name


class Friend(models.Model):
    user_id = models.ForeignKey(User)
    friend_id=models.CharField(max_length=20)
    status=models.CharField(max_length=20)
    def __str__(self):              # __unicode__ on Python 2
        return self.user_id.username
    