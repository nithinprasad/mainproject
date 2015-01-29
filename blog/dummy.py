from django.shortcuts import render
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.contrib.auth import authenticate, login , logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.template import RequestContext, loader
from blog.models import UserProfile, Post ,Friend
from django.shortcuts import render_to_response,render
import os
from blog.models import UserProfile
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

# Create your views here.
def index(request):
	
	return render(request, 'blog/index.html')

def ulogin(request):
    if(request.POST):
        name= request.POST['username']
        pwd= request.POST['password']
        user = authenticate(username=name, password=pwd)
        if user is not None:
    # the password verified for the user
            if user.is_active:
                print("User is valid, active and authenticated")
                a=User.objects.get(username=name)
                
                context = {'fname':a.first_name,'lname':a.last_name}
                
                print request.user.username
                print request.user.user_id

                return HttpResponseRedirect('/home/')
            else:
                print("The password is valid, but the account has been disabled!")
        else:
    # the authentication system was unable to verify the username and password
            print("The username and password were incorrect.")
            context = {'error': "The username and password were incorrect."}
            return render(request, 'blog/index.html', context)
    else:
    	return HttpResponseRedirect('/')
            
def register(request):
    context = RequestContext(request)
    registered = False
    error=0
    if request.method == 'POST':
       
        username=request.POST['username']
        password1 = request.POST['password']
        cpassword1 = request.POST['cpassword']
        firstname= request.POST['firstname']
        lastname=request.POST['lastname']
        email=request.POST['email']
        phone=request.POST['phonenumber']
        dob=request.POST['dob']
        
        profile=request.POST['img']
        
        if password1 == cpassword1:
        	user=User.objects.filter(username=username).count()
        	if user==0:
         		temp=User.objects.create_user(username=username,password=password1,first_name=firstname,last_name=lastname,email=email)
        		
        		temp.save()
        		y=User.objects.get(username=username)
        		p=y.id
        		
        		
        		temp1=UserProfile(phone_number=phone,user_id=p,dob=dob,picture=profile)

        		
        		
        		temp1.save()
        		
        		context={'sucess':"USer add sucessfully please login to continue"}
        		return render(request,'blog/index.html',context)
        	else:
        		error="username exists"
        		context={'error':error}
        		return render(request,'blog/index.html',context)
           
        else:
            error="Passwords do not match."
            context={'error':error}
            return render(request,'blog/index.html',context)
    else:
    	return HttpResponseRedirect('/')

   
    
@login_required
def user_logout(request):
	
	logout(request)
	return HttpResponseRedirect('/')
@login_required
def profile(request,profile_id):
	context=RequestContext(request)
	entries=request.user.profile
	return render_to_response('blog/profile.html',{'profiles' : entries }, context)

def home(request):
	return HttpResponse(request.user.user_id)
	
def error404(request):
    return HttpResponseNotFound(render_to_string('404.html'))
	
	

