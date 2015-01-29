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
from Crypto.Cipher import AES
import base64
import Crypto
from django.utils import timezone

# Create your views here.
def index(request):
    if  request.user.is_active:

       return HttpResponseRedirect('/home/'+request.user.username)
    return render(request,"blog/index.html")
	
def client_side(request):
    return render(request,"blog/client.html")

    

def ulogin(request):
    if(request.POST):
        name= request.POST['username']
        pwd= request.POST['password']
        user = authenticate(username=name, password=pwd)
        if user is not None:
    # the password verified for the user
            if user.is_active:
                print("User is valid, active and authenticated")
                login(request,user)
                a=User.objects.get(username=name)
                print a.first_name,a.last_name
                context = {'fname':a.first_name,'lname':a.last_name}
               
                
                return HttpResponseRedirect('/home/'+name)
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
        print request.POST
        profile=request.POST['img']
        print request.POST
        if password1 == cpassword1:
        	user=User.objects.filter(username=username).count()
        	if user==0:
         		temp=User.objects.create_user(username=username,password=password1,first_name=firstname,last_name=lastname,email=email)
        		
        		temp.save()
        		y=User.objects.get(username=username)
        		p=y.id
        		
        		
        		temp1=UserProfile(phone_number=phone,user_id=p,dob=dob,picture=profile)

        		print temp1
        		
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
@login_required
def home(request,profile_id):
	primary=User.objects.get(username=profile_id).pk
	secondary=User.objects.get(username=profile_id)
	value=Post.objects.all().order_by('-pub_date')
	for each in value:
		(key,data)=demix(each.text).split("-RENJU-")
		each.text=decrypt_val(data,key)
	

    
	context={'value':value,'userinfo':User.objects.get(username=profile_id),'friend':User.objects.all()}
	

	return render(request,'blog/home.html',context)

@login_required
def post(request):
    post= request.POST['mypost']
    private_key=check(post[:8])
    public_key="!#*1$$#h"
    private_key=rearr(private_key)
    MASTER_KEY=mix(private_key,public_key)

    
    
    encrypt_post=encrypt_val(post,MASTER_KEY)
    db_post=mod_mix(encrypt_post,MASTER_KEY,ord(list(encrypt_post)[2])%5)
    
    
    
    stored_post=db_post
    temp= Post(user_id_id=request.user.id,text=stored_post)
    temp.save()
    context={'post':post,'private_key':private_key,'public_key':public_key,'MASTER_KEY':MASTER_KEY,'encrypt_post':encrypt_post,'user':request.user.username,'private_pattern':"52047163",'stored_post':stored_post}
    context['modvalue']=ord(list(encrypt_post)[2])%5
    
    return render(request,"blog/enc.html",context)
@login_required
def friend_request(request):
    if request.POST['request']=="ACCEPT":
        temp=Friend(user_id_id=request.user.id,friend_id=request.POST['friend'],status='TRUE')
        temp.save()
        return HttpResponseRedirect('/home/'+request.user.username)
    else:
        temp=Friend(user_id_id=request.user.id,friend_id=request.POST['friend'],status='CANCEL')
        temp.save()
        

    

###  encryption and decryption area ###


###MASTER_KEY="Some-long-base-key-to-use-as-encyrption-key"

def encrypt_val(clear_text,MASTER_KEY):
    enc_secret = AES.new(MASTER_KEY[:32])
    tag_string = (str(clear_text) +
                  (AES.block_size -
                   len(str(clear_text)) % AES.block_size) * "\0")
    cipher_text = base64.b64encode(enc_secret.encrypt(tag_string))

    return cipher_text
def decrypt_val(cipher_text,MASTER_KEY):
    dec_secret = AES.new(MASTER_KEY[:32])
    raw_decrypted = dec_secret.decrypt(base64.b64decode(cipher_text))
    clear_val = raw_decrypted.rstrip("\0")
    return clear_val




def check(key):
    x=len(key)
    
    if x<8:
        y=8-x
        
        str_arr="3$%###%!8"
        list_str=list(str_arr)
        for p in range(0,y):
            key=key+list_str[p]
        

    return key
    
def mix(private,public):

    list_private=list(private)
    list_public=list(public)
    key=list_public[4]+list_private[7]+list_private[5]+list_public[7]
    key=key+list_private[6]+list_private[4]+list_public[6]+list_private[0]
    key=key+list_public[0]+list_private[2]+list_public[1]+list_public[5]
    key=key+list_public[2]+list_private[3]+list_private[1]+list_public[3]
    return key

def rearr(key):
    list_key=list(key)
    key=list_key[5]+list_key[2]+list_key[0]+list_key[4]+list_key[7]+list_key[1]+list_key[6]+list_key[3]
    return key 

def mod_mix(post,key,mod):
    
    list_post=list(post)
    list_key=list(key)
    data=""
    key_pointer=0
    data_pointer=0










    if mod==0:

        for x in range(0,len(post)+len(key)+1):
            
            

            if(x==2or x==4 or x==5 or x==6 or x==8 or x==10 or x==12 or x==14 or x==15 or x==16 or x==18 or x==20 or x==22 or x==24 or x==26 or x==28):
                data=data+list_key[key_pointer]
                key_pointer=key_pointer+1
            elif(x==3):
                data=data+str(mod)    
                
            else:
                data=data+list_post[data_pointer]
                data_pointer=data_pointer+1
    if mod==1:
                
        for x in range(0,len(post)+len(key)+1):
        
        

            if(x==1or x==5 or x==7 or x==9 or x==11 or x==13 or x==15 or x==17 or x==19 or x==21 or x==23 or x==25 or x==27 or x==29 or x==31 or x==33):
                data=data+list_key[key_pointer]
                key_pointer=key_pointer+1
            elif(x==3):
                data=data+str(mod)    
                
            else:
                data=data+list_post[data_pointer]
                data_pointer=data_pointer+1
    if mod==2:
                
        for x in range(0,len(post)+len(key)+1):
        
        

            if(x==1or x==2 or x==4 or x==5 or x==6 or x==7 or x==8 or x==9 or x==10 or x==11 or x==12 or x==13 or x==14 or x==15 or x==16 or x==17):
                data=data+list_key[key_pointer]
                key_pointer=key_pointer+1
            elif(x==3):
                data=data+str(mod)    
                
            else:
                data=data+list_post[data_pointer]
                data_pointer=data_pointer+1     

    if mod==3:
                
        for x in range(0,len(post)+len(key)+1):
        
        

            if(x==2 or x==5 or x==8 or x==11 or x==14 or x==17 or x==20 or x==23 or x==26 or x==29 or x==32 or x==35 or x==38 or x==41 or x==44 or x==47):
                data=data+list_key[key_pointer]
                key_pointer=key_pointer+1
            elif(x==3):
                data=data+str(mod)    
                
            else:
                data=data+list_post[data_pointer]
                data_pointer=data_pointer+1

    if mod==4:
                
        for x in range(0,len(post)+len(key)+1):
        
        

            if(x==2or x==4 or x==5 or x==6 or x==8 or x==10 or x==12 or x==14 or x==15 or x==16 or x==18 or x==20 or x==22 or x==24 or x==26 or x==28):
                data=data+list_key[key_pointer]
                key_pointer=key_pointer+1
            elif(x==3):
                data=data+str(mod)    
                
            else:
                data=data+list_post[data_pointer]
                data_pointer=data_pointer+1
    
    return data

def demix(value):
    list_value=list(value)
    data=""
    key=""
    
    if list_value[3]=='0':
    
        for x in range(0,len(value)):
            
            

            if(x==2 or x==4 or x==5 or x==6 or x==8 or x==10 or x==12 or x==14 or x==15 or x==16 or x==18 or x==20 or x==22 or x==24 or x==26 or x==28):
                key=key+list_value[x]
                
            elif(x==3):
                pass    
                
            else:
                data=data+list_value[x]

    if list_value[3]=='1':
    
        for x in range(0,len(value)):
            
            

            if(x==1 or x==5 or x==7 or x==9 or x==11 or x==13 or x==15 or x==17 or x==19 or x==21 or x==23 or x==25 or x==27 or x==29 or x==31 or x==33):
                key=key+list_value[x]
                
            elif(x==3):
                pass    
                
            else:
                data=data+list_value[x]

    if list_value[3]=='2':
    
        for x in range(0,len(value)):
            
            

            if(x==1 or x==2 or x==4 or x==5 or x==6 or x==7 or x==8 or x==9 or x==10 or x==11 or x==12 or x==13 or x==14 or x==15 or x==16 or x==17):
                key=key+list_value[x]
                
            elif(x==3):
                pass    
                
            else:
                data=data+list_value[x]

    if list_value[3]=='3':
    
        for x in range(0,len(value)):
            
            

            if(x==2 or x==5 or x==8 or x==11 or x==14 or x==17 or x==20 or x==23 or x==26 or x==29 or x==32 or x==35 or x==38 or x==41 or x==44 or x==47):
                key=key+list_value[x]
                
            elif(x==3):
                pass    
                
            else:
                data=data+list_value[x]

    if list_value[3]=='4':
    
        for x in range(0,len(value)):
            
            

            if(x==2or x==4 or x==5 or x==6 or x==8 or x==10 or x==12 or x==14 or x==15 or x==16 or x==18 or x==20 or x==22 or x==24 or x==26 or x==28):
                key=key+list_value[x]
                
            elif(x==3):
                pass    
                
            else:
                data=data+list_value[x]
            
   
    return key+"-RENJU-"+data
    ##for x in range(0,len(value):


###  encryption and decryption area ###
