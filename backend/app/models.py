from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    lists = db.relationship('List', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    items = db.relationship('Item', backref='list', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<List {self.title}>'

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False, nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=True)
    # Note: You might want to specify behavior for the deletion of parent items here as well
    children = db.relationship('Item', backref=db.backref('parent', remote_side=[id]), lazy=True)

    def __repr__(self):
        return f'<Item {self.content}>'