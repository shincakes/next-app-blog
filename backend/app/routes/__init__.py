from .blog_routes import blog_routes

def register_routes(app):
    app.register_blueprint(blog_routes, url_prefix="/api/blogs")
