from flask import Blueprint, request, session
from werkzeug.security import generate_password_hash, check_password_hash
from .models import db, User
from flask_login import login_user, logout_user, login_required, current_user

auth = Blueprint('auth', __name__)

# Route to register a new user
@auth.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Check if username and password are provided
    if not username or not password:
        return {'error': 'Username and password are required'}, 400
    
    # Check if username already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return {'error': 'Username already exists'}, 400
    
    # Generate password hash and create new user
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return {'message': 'User registered successfully'}, 201

# Route to log in a user
@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Check if user exists and password is correct
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password_hash, password):
        return {'error': 'Invalid username or password'}, 401
    
    # Log in the user
    login_user(user)
    return {'message': 'Login successful'}, 200

# Route to log out a user
@auth.route('/logout', methods=['GET'])
@login_required
def logout():
    # Log out the user
    logout_user()
    return {'message': 'Logout successful'}, 200

# Route to check if the user is authenticated
@auth.route('/is_authenticated', methods=['GET'])
def is_authenticated():
    # Check if the user is authenticated
    if current_user.is_authenticated:
        return {'isAuthenticated': True}, 200
    else:
        return {'isAuthenticated': False}, 401
    
@auth.route('/current_user', methods=['GET'])
@login_required
def get_current_user():
    # Get the username of the current user
    return {'username': current_user.username}, 200