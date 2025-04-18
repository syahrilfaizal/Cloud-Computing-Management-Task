from flask import Flask
from .users import user_bp
from .tasks import task_bp

app = Flask(__name__)

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/api/users')
app.register_blueprint(task_bp, url_prefix='/api/tasks')

@app.route('/')
def home():
    return {"message": "Hello from Flask!"}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
