from flask import Flask
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_cors import CORS
from .models import db, User
from .main import main as main_blueprint
from .auth import auth as auth_blueprint

def create_app():
    app = Flask(__name__)
    CORS(app)
    login_manager = LoginManager()
    login_manager.init_app(app)
    app.config['SECRET_KEY'] = 'secret-key-goes-here'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)  
    migrate = Migrate(app, db)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    with app.app_context():
        db.create_all() 

    app.register_blueprint(main_blueprint)
    app.register_blueprint(auth_blueprint)

    return app