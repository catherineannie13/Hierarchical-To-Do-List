import unittest
from app import create_app, db
from app.models import User
from werkzeug.security import generate_password_hash

class AuthTestCase(unittest.TestCase):
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

    def test_registration(self):
        response = self.client.post('/register', json={'username': 'testuser', 'password': 'testpass'})
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'User registered successfully', response.data)

    def test_duplicate_registration(self):
        user = User(username='testuser', password_hash='testpass')
        db.session.add(user)
        db.session.commit()

        response = self.client.post('/register', json={'username': 'testuser', 'password': 'testpass'})
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'Username already exists', response.data)

    def test_login(self):
        password_hash = generate_password_hash('testpass')
        user = User(username='testuser', password_hash=password_hash)
        db.session.add(user)
        db.session.commit()

        response = self.client.post('/login', json={'username': 'testuser', 'password': 'testpass'})
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Login successful', response.data)

    def test_invalid_login(self):
        response = self.client.post('/login', json={'username': 'nonexistent', 'password': 'nopass'})
        self.assertEqual(response.status_code, 401)
        self.assertIn(b'Invalid username or password', response.data)

    def test_logout(self):
        user = User(username='testuser', password_hash='testpass')
        db.session.add(user)
        db.session.commit()

        self.client.post('/login', json={'username': 'testuser', 'password': 'testpass'})
        response = self.client.get('/logout')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Logout successful', response.data)

if __name__ == '__main__':
    unittest.main()