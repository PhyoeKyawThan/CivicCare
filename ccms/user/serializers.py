from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__' 


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) 

    class Meta:
        model = User
        fields = ['username', 'full_name', 'phone', 'role', 'email', 'date_of_birth', 'avatar', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')  
        avatar = validated_data.pop('avatar', None)
        user = User(**validated_data)              
        user.set_password(password)
        if avatar:
            user.avatar = avatar
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(self.context.get('request'),username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        data['user'] = user
        return data