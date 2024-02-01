from flask import Blueprint
from .crime import get_crimes, fetch_data

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return "Hello, world!"

main.add_url_rule('/fetch-data', 'fetch_data', fetch_data)
main.add_url_rule('/crimes', 'get_crimes', get_crimes)