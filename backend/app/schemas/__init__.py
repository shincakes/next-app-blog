from .blog_schema import BlogPostSchema

# Instantiate Schema
blog_schema = BlogPostSchema()
blogs_schema = BlogPostSchema(many=True)
