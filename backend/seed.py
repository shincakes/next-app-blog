from app import db, create_app
from app.models import BlogPost

app = create_app()

with app.app_context():
    # Create some sample blog posts
    blog1 = BlogPost(title="First Blog", content="This is the first seeded blog post.")
    blog2 = BlogPost(title="Second Blog", content="Another seeded blog post!")

    db.session.add_all([blog1, blog2])
    db.session.commit()

    print("✅ Database seeding completed!")
