from flask import Blueprint, request, session
from werkzeug.security import generate_password_hash, check_password_hash
from .models import db, User
from flask_login import login_user, logout_user

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return {'error': 'Username and password are required'}, 400
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return {'error': 'Username already exists'}, 400
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return {'message': 'User registered successfully'}, 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password_hash, password):
        return {'error': 'Invalid username or password'}, 401
    login_user(user)
    return {'message': 'Login successful'}, 200

@auth.route('/logout', methods=['GET'])
def logout():
    logout_user()
    return {'message': 'Logout successful'}, 200