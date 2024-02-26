import unittest
from app import create_app, db
from app.models import User, List, Item
from werkzeug.security import generate_password_hash

class MainTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_get_lists(self):
        # Create a test user
        password_hash = generate_password_hash('testpass')
        user = User(username='testuser', password_hash=password_hash)
        db.session.add(user)
        db.session.commit()

        # Log in the test user
        response = self.client.post('/login', json={'username': 'testuser', 'password': 'testpass'})
        self.assertEqual(response.status_code, 200)

        # Retrieve lists for the logged-in user
        response = self.client.get('/lists')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'lists', response.data)

    def test_create_list(self):
        # Create a test user
        password_hash = generate_password_hash('testpass')
        user = User(username='testuser', password_hash=password_hash)
        db.session.add(user)
        db.session.commit()

        # Log in the test user
        response = self.client.post('/login', json={'username': 'testuser', 'password': 'testpass'})
        self.assertEqual(response.status_code, 200)

        # Create a new list
        response = self.client.post('/lists', json={'title': 'Test List'})
        self.assertEqual(response.status_code, 201)
        #self.assertIn(b'List created successfully', response.data)

    def test_update_list(self):
        # Create a test user
        password_hash = generate_password_hash('testpass')
        user = User(username='testuser', password_hash=password_hash)
        db.session.add(user)
        db.session.commit()

        # Log in the test user
        response = self.client.post('/login', json={'username': 'testuser', 'password': 'testpass'})
        self.assertEqual(response.status_code, 200)

        # Create a new list
        response = self.client.post('/lists', json={'title': 'Test List'})
        self.assertEqual(response.status_code, 201)

        # Get the ID of the newly created list
        list_id = response.json['list_id']

        # Update the title of the list
        new_title = 'Updated Test List'
        response = self.client.put(f'/lists/{list_id}', json={'title': new_title})
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'List updated successfully', response.data)

        # Verify that the list title has been updated in the database
        updated_list = List.query.get(list_id)
        self.assertEqual(updated_list.title, new_title)

    def test_delete_list(self):
        # Create a test user
        password_hash = generate_password_hash('testpass')
        user = User(username='testuser', password_hash=password_hash)
        db.session.add(user)
        db.session.commit()

        # Log in the test user
        response = self.client.post('/login', json={'username': 'testuser', 'password': 'testpass'})
        self.assertEqual(response.status_code, 200)

        # Create a new list
        response = self.client.post('/lists', json={'title': 'Test List'})
        self.assertEqual(response.status_code, 201)

        # Get the ID of the newly created list
        list_id = response.json['list_id']

        # Delete the list
        response = self.client.delete(f'/lists/{list_id}')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'List deleted successfully', response.data)

        # Verify that the list has been deleted from the database
        deleted_list = List.query.get(list_id)
        self.assertIsNone(deleted_list)

    def test_get_items(self):
        # Create a test user
        password_hash = generate_password_hash('testpass')
        user = User(username='testuser', password_hash=password_hash)
        db.session.add(user)
        db.session.commit()

        # Log in the test user
        response = self.client.post('/login', json={'username': 'testuser', 'password': 'testpass'})
        self.assertEqual(response.status_code, 200)

        # Create a new list
        response = self.client.post('/lists', json={'title': 'Test List'})
        self.assertEqual(response.status_code, 201)
        list_id = response.json['list_id']

        # Create a new item in the list
        response = self.client.post(f'/lists/{list_id}/items', json={'content': 'Test Item 1'})
        self.assertEqual(response.status_code, 201)

        # Get the items for the list
        response = self.client.get(f'/lists/{list_id}/items')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'items', response.data)

    def test_create_item(self):
        # Create a test user
        password_hash = generate_password_hash('testpass')
        user = User(username='testuser', password_hash=password_hash)
        db.session.add(user)
        db.session.commit()

        # Log in the test user
        response = self.client.post('/login', json={'username': 'testuser', 'password': 'testpass'})
        self.assertEqual(response.status_code, 200)

        # Create a new list
        response = self.client.post('/lists', json={'title': 'Test List'})
        self.assertEqual(response.status_code, 201)
        list_id = response.json['list_id']

        # Create a new item in the list
        response = self.client.post(f'/lists/{list_id}/items', json={'content': 'Test Item 1'})
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'Item created successfully', response.data)

        # Verify that the item has been created in the database
        new_item = Item.query.filter_by(list_id=list_id).first()
        self.assertIsNotNone(new_item)

    def test_update_item(self):
        # Create a test user
        password_hash = generate_password_hash('testpass')
        user = User(username='testuser', password_hash=password_hash)
        db.session.add(user)
        db.session.commit()

        # Log in the test user
        response = self.client.post('/login', json={'username': 'testuser', 'password': 'testpass'})
        self.assertEqual(response.status_code, 200)

        # Create a new list
        response = self.client.post('/lists', json={'title': 'Test List'})
        self.assertEqual(response.status_code, 201)
        list_id = response.json['list_id']

        # Create a new item in the list
        response = self.client.post(f'/lists/{list_id}/items', json={'content': 'Test Item 1'})
        self.assertEqual(response.status_code, 201)
        item_id = response.json['item_id']

        # Update the item content
        new_content = 'Updated Content'
        response = self.client.put(f'/lists/{list_id}/items/{item_id}', json={'content': new_content})
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Item updated successfully', response.data)

        # Verify that the item content has been updated in the database
        updated_item = Item.query.get(item_id)
        self.assertEqual(updated_item.content, new_content)

    def test_delete_item(self):
        # Create a test user
        password_hash = generate_password_hash('testpass')
        user = User(username='testuser', password_hash=password_hash)
        db.session.add(user)
        db.session.commit()

        # Log in the test user
        response = self.client.post('/login', json={'username': 'testuser', 'password': 'testpass'})
        self.assertEqual(response.status_code, 200)

        # Create a new list
        response = self.client.post('/lists', json={'title': 'Test List'})
        self.assertEqual(response.status_code, 201)
        list_id = response.json['list_id']

        # Create a new item in the list
        response = self.client.post(f'/lists/{list_id}/items', json={'content': 'Test Item 1'})
        self.assertEqual(response.status_code, 201)
        item_id = response.json['item_id']

        # Delete the item
        response = self.client.delete(f'/lists/{list_id}/items/{item_id}')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Item deleted successfully', response.data)

        # Verify that the item has been deleted from the database
        deleted_item = Item.query.get(item_id)
        self.assertIsNone(deleted_item)

    def test_mark_item_as_complete(self):
        # Create a test user
        password_hash = generate_password_hash('testpass')
        user = User(username='testuser', password_hash=password_hash)
        db.session.add(user)
        db.session.commit()

        # Log in the test user
        response = self.client.post('/login', json={'username': 'testuser', 'password': 'testpass'})
        self.assertEqual(response.status_code, 200)

        # Create a new list
        response = self.client.post('/lists', json={'title': 'Test List'})
        self.assertEqual(response.status_code, 201)
        list_id = response.json['list_id']

        # Create a new item in the list
        response = self.client.post(f'/lists/{list_id}/items', json={'content': 'Test Item 1'})
        self.assertEqual(response.status_code, 201)
        item_id = response.json['item_id']

        # Mark the item as complete
        response = self.client.put(f'/lists/{list_id}/items/{item_id}/complete', json={'completed': True})
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Item marked as complete', response.data)

        # Verify that the item's completion status has been updated in the database
        completed_item = Item.query.get(item_id)
        self.assertTrue(completed_item.completed)

    def test_move_item(self):
        # Create a test user
        password_hash = generate_password_hash('testpass')
        user = User(username='testuser', password_hash=password_hash)
        db.session.add(user)
        db.session.commit()

        # Log in the test user
        response = self.client.post('/login', json={'username': 'testuser', 'password': 'testpass'})
        self.assertEqual(response.status_code, 200)

        # Create two new lists
        response = self.client.post('/lists', json={'title': 'Source List'})
        self.assertEqual(response.status_code, 201)
        source_list_id = response.json['list_id']

        response = self.client.post('/lists', json={'title': 'Destination List'})
        self.assertEqual(response.status_code, 201)
        destination_list_id = response.json['list_id']

        # Create a new item in the source list
        response = self.client.post(f'/lists/{source_list_id}/items', json={'content': 'Test Item 1'})
        self.assertEqual(response.status_code, 201)
        item_id = response.json['item_id']

        # Move the item to the destination list
        response = self.client.put(f'/lists/{source_list_id}/items/{item_id}/move', json={'to_list_id': destination_list_id})
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Item moved successfully', response.data)

        # Verify that the item has been moved to the destination list in the database
        moved_item = Item.query.get(item_id)
        self.assertEqual(moved_item.list_id, destination_list_id)

if __name__ == '__main__':
    unittest.main()
