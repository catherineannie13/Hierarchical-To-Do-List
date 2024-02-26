from flask import Blueprint, request, session
from .models import db, List, Item, User
from flask_login import current_user, login_required

main = Blueprint('main', __name__)

@main.route('/lists', methods=['GET'])
@login_required
def get_lists():
    user_id = current_user.get_id()
    user_lists = List.query.filter_by(user_id=user_id).all()
    lists = [{'id': lst.id, 'title': lst.title} for lst in user_lists]
    return {'lists': lists}, 200

@main.route('/lists', methods=['POST'])
@login_required
def create_list():
    user_id = current_user.get_id()
    data = request.json
    title = data.get('title')
    if not title:
        return {'error': 'List title is required'}, 400
    new_list = List(title=title, user_id=user_id)
    db.session.add(new_list)
    db.session.commit()
    return {'message': 'List created successfully', 'list_id': new_list.id}, 201

@main.route('/lists/<int:list_id>', methods=['PUT'])
@login_required
def update_list(list_id):
    user_id = current_user.get_id()
    list = List.query.get(list_id)
    if not list or list.user_id != user_id:
        return {'error': 'List not found or unauthorized'}, 404
    data = request.json
    new_title = data.get('title')
    if not new_title:
        return {'error': 'New title is required'}, 400
    list.title = new_title
    db.session.commit()
    return {'message': 'List updated successfully'}, 200

@main.route('/lists/<int:list_id>', methods=['DELETE'])
@login_required
def delete_list(list_id):
    user_id = current_user.get_id()
    list = List.query.get(list_id)
    if not list or list.user_id != user_id:
        return {'error': 'List not found or unauthorized'}, 404
    db.session.delete(list)
    db.session.commit()
    return {'message': 'List deleted successfully'}, 200

@main.route('/lists/<int:list_id>/items', methods=['GET'])
@login_required
def get_items(list_id):
    user_id = current_user.get_id()
    list = List.query.get(list_id)
    if not list or list.user_id != user_id:
        return {'error': 'List not found or unauthorized'}, 404
    items = [{'id': item.id, 'content': item.content, 'completed': item.completed} for item in list.items]
    return {'items': items}, 200

@main.route('/lists/<int:list_id>/items', methods=['POST'])
@login_required
def create_item(list_id):
    user_id = current_user.get_id()
    list = List.query.get(list_id)
    if not list or list.user_id != user_id:
        return {'error': 'List not found or unauthorized'}, 404
    data = request.json
    content = data.get('content')
    if not content:
        return {'error': 'Item content is required'}, 400
    new_item = Item(content=content, list_id=list_id)
    db.session.add(new_item)
    db.session.commit()
    return {'message': 'Item created successfully', 'item_id': new_item.id}, 201

@main.route('/lists/<int:list_id>/items/<int:item_id>', methods=['PUT'])
@login_required
def update_item(list_id, item_id):
    user_id = current_user.get_id()
    item = Item.query.get(item_id)
    if not item or item.list.user_id != user_id:
        return {'error': 'Item not found or unauthorized'}, 404
    data = request.json
    new_content = data.get('content')
    if new_content is not None:
        item.content = new_content
    completed = data.get('completed')
    if completed is not None:
        item.completed = completed
    db.session.commit()
    return {'message': 'Item updated successfully'}, 200

@main.route('/lists/<int:list_id>/items/<int:item_id>', methods=['DELETE'])
@login_required
def delete_item(list_id, item_id):
    user_id = current_user.get_id()
    item = Item.query.get(item_id)
    if not item or item.list_id != list_id or item.list.user_id != user_id:
        return {'error': 'Item not found or unauthorized'}, 404
    db.session.delete(item)
    db.session.commit()
    return {'message': 'Item deleted successfully'}, 200

@main.route('/lists/<int:list_id>/items/<int:item_id>/complete', methods=['PUT'])
@login_required
def mark_item_as_complete(list_id, item_id):
    user_id = current_user.get_id()
    item = Item.query.get(item_id)
    if not item or item.list_id != list_id or item.list.user_id != user_id:
        return {'error': 'Item not found or unauthorized'}, 404
    data = request.json
    completed = data.get('completed')
    if completed is None:
        return {'error': 'Completed field is required'}, 400
    item.completed = completed
    db.session.commit()
    return {'message': 'Item marked as complete'}, 200

@main.route('/lists/<int:from_list_id>/items/<int:item_id>/move', methods=['PUT'])
@login_required
def move_item(from_list_id, item_id):
    user_id = current_user.get_id()
    from_list = List.query.get(from_list_id)
    if not from_list or from_list.user_id != user_id:
        return {'error': 'Source list not found or unauthorized'}, 404
    data = request.json
    to_list_id = data.get('to_list_id')
    if to_list_id is None:
        return {'error': 'Destination list ID is required'}, 400
    to_list = List.query.get(to_list_id)
    if not to_list or to_list.user_id != user_id:
        return {'error': 'Destination list not found or unauthorized'}, 404
    item = Item.query.get(item_id)
    if not item or item.list_id != from_list_id:
        return {'error': 'Item not found in source list'}, 404
    item.list_id = to_list_id
    db.session.commit()
    return {'message': 'Item moved successfully'}, 200