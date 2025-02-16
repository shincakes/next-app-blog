from flask import Blueprint, request, jsonify, current_app
from app import db  
from app.models import BlogPost
from app.schemas import blog_schema, blogs_schema
from app.utils.logging import logger
from marshmallow import ValidationError
from sqlalchemy import or_ 

blog_routes = Blueprint("blog_routes", __name__)

# 🛑 Error Handling for Validation Errors
@blog_routes.errorhandler(ValidationError)
def handle_validation_error(error):
    return jsonify({"error": error.messages}), 400

# 📌 Get All Blog Posts
@blog_routes.route("/", methods=["GET"])
def get_blogs():
    try:
        # Get the page number and search query from the request
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 5, type=int)  
        search_query = request.args.get('search', "")

        # Start building the query
        query = BlogPost.query

        # Filter by search query if provided
        if search_query:
            query = query.filter(BlogPost.title.like(f"%{search_query}%"))

        # Paginate the query results
        paginated_posts = query.paginate(page=page, per_page=per_page, error_out=False)

        # Prepare the response data
        posts = [post.to_dict() for post in paginated_posts.items]
        return jsonify({
            'posts': posts,
            'total_pages': paginated_posts.pages,
            'current_page': paginated_posts.page,
        })

    except Exception as e:
        print(f"Error fetching blogs: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


    
# Create a Post
@blog_routes.route("/", methods=["POST"])
def create_blog():
    try:
        # Validate incoming data
        data = blog_schema.load(request.json)
        
        # Create new blog post with the provided data
        new_blog = BlogPost(title=data["title"], content=data["content"])
        
        # Add the blog post to the session and commit to the database
        db.session.add(new_blog)
        db.session.commit()
        
        # Return the blog post with its ID
        return jsonify(new_blog.to_dict()), 201
    except ValidationError as e:
        return handle_validation_error(e)
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

# 📌 Update a Blog Post
@blog_routes.route("/<int:post_id>", methods=["PUT"])
def update_blog(post_id):
    post = BlogPost.query.get(post_id)
    if not post:
        return jsonify({"error": "Blog post not found"}), 404

    data = request.json
    if "title" in data:
        post.title = data["title"]
    if "content" in data:
        post.content = data["content"]

    db.session.commit()
    return jsonify({"message": "Blog post updated successfully", "post": {
        "id": post.id,
        "title": post.title,
        "content": post.content
    }}), 200

# 📌 Delete a Blog Post
@blog_routes.route("/<int:post_id>", methods=["DELETE"])
def delete_blog(post_id):
    post = BlogPost.query.get(post_id)
    if not post:
        return jsonify({"error": "Blog post not found"}), 404

    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Blog post deleted successfully"}), 200

@blog_routes.route("/<int:post_id>", methods=["OPTIONS"])
def options_blog(post_id):
    return jsonify({"message": "Preflight request allowed"}), 200