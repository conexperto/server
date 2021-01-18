from os.path import abspath, join
from flask import Flask, render_template, g
from flask_cors import CORS

from src.helpers import JSONSerializable
from src.db import db 


# Initialize Application.
def create_api(env):
    api = Flask(__name__, 
                    root_path=abspath(join(__package__, '../')),
                    static_folder='/static')

    api.config.from_object(env)
    JSONSerializable(api)

    CORS(api, resources=r'*', origins=r'*', methods=r'*', allow_headers=r'*', expose_headers=r'*')

    from src.blueprints.admin import auth_admin
    from src.blueprints import auth
    
    api.register_blueprint(auth_admin, url_prefix='/admin/auth')
    api.register_blueprint(auth, url_prefix='/auth')
    
    
    @api.route('/')
    def index():
        return render_template('index.html')

    @api.route('/admin')
    def index_admin():
        return render_template('index-admin.html')
    
    @api.route('/instructions')
    def instructions():
        return render_template('instructions.html')

    with api.app_context():
        db.init_app(api)
        #db.create_all()

    return api
