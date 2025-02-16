from marshmallow import Schema, fields

class BlogPostSchema(Schema):
    title = fields.String(required=True, error_messages={"required": "Title is required"})
    content = fields.String(required=True, error_messages={"required": "Content is required"})
