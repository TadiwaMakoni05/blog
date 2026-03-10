import random
from faker import Faker
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from django.utils import timezone
from apps.users.models import CustomUser, Profile
from apps.blog.models import Category, Tag, Post
from apps.engagement.models import Comment, Like, Bookmark
from apps.notifications.models import NewsletterSubscriber

class Command(BaseCommand):
    help = 'Seeds the database with meaningful data using Faker'

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding database with Faker...")
        fake = Faker()

        # 1. Create Users
        users = []
        # Always create an admin user
        admin, created = CustomUser.objects.get_or_create(
            username='admin', 
            defaults={'email': 'admin@example.com', 'is_staff': True, 'is_superuser': True}
        )
        if created:
            admin.set_password('password123')
            admin.save()
            if hasattr(admin, 'profile'):
                admin.profile.bio = 'System Administrator and Creator.'
                admin.profile.save()
        users.append(admin)

        for _ in range(10):
            username = fake.unique.user_name()
            email = fake.unique.email()
            user, created = CustomUser.objects.get_or_create(
                username=username, 
                defaults={'email': email}
            )
            if created:
                user.set_password('password123')
                user.save()
                
            if hasattr(user, 'profile'):
                user.profile.bio = fake.paragraph(nb_sentences=3)
                user.profile.website = fake.url()
                user.profile.save()
            users.append(user)

        authors = users

        # 2. Create Categories
        categories_data = ['Technology', 'Design', 'Lifestyle', 'Programming', 'Career', 'Finance', 'Health', 'Travel']
        categories = []
        for cat_name in categories_data:
            cat, _ = Category.objects.get_or_create(
                name=cat_name, 
                defaults={'slug': slugify(cat_name), 'description': fake.sentence()}
            )
            categories.append(cat)

        # 3. Create Tags
        tags_data = ['React', 'Django', 'Python', 'JavaScript', 'Web Development', 'UI/UX', 'Productivity', 'Startup', 'Backend', 'Frontend', 'AI', 'Machine Learning', 'Data Science', 'DevOps', 'Cloud']
        tags = []
        for tag_name in tags_data:
            tag, _ = Tag.objects.get_or_create(
                name=tag_name, 
                defaults={'slug': slugify(tag_name)}
            )
            tags.append(tag)

        # 4. Create Posts
        posts = []
        for _ in range(30):
            title = fake.sentence(nb_words=6)[:-1]  # remove trailing dot
            status = random.choices(['Published', 'Draft'], weights=[80, 20])[0]
            
            # Generate 3-5 paragraphs of HTML content
            paragraphs = [f"<p>{fake.paragraph(nb_sentences=5)}</p>" for _ in range(random.randint(3, 6))]
            if random.choice([True, False]):
                paragraphs.insert(random.randint(1, len(paragraphs)-1), f"<h2>{fake.sentence(nb_words=4)[:-1]}</h2>")
            content = "".join(paragraphs)

            post, created = Post.objects.get_or_create(
                slug=slugify(title),
                defaults={
                    'title': title,
                    'author': random.choice(authors),
                    'category': random.choice(categories),
                    'content': content,
                    'excerpt': fake.paragraph(nb_sentences=2),
                    'status': status,
                    'is_featured': random.choices([True, False], weights=[10, 90])[0],
                    'view_count': random.randint(0, 1000)
                }
            )
            
            if created:
                # Add 2-5 random tags
                post.tags.add(*random.sample(tags, random.randint(2, 5)))
                
                # Override created_at to be randomly in the past year
                post.created_at = fake.date_time_between(start_date='-1y', end_date='now', tzinfo=timezone.get_current_timezone())
                post.save()
            posts.append(post)

        # 5. Engagement (Comments, Likes, Bookmarks)
        published_posts = [p for p in posts if p.status == 'Published']
        
        for post in published_posts:
            # Add some likes (0 to 8 per post)
            for user in random.sample(users, random.randint(0, min(8, len(users)))):
                Like.objects.get_or_create(post=post, user=user)

            # Add bookmarks (0 to 3 per post)
            for user in random.sample(users, random.randint(0, min(3, len(users)))):
                Bookmark.objects.get_or_create(post=post, user=user)

            # Add comments (0 to 4 per post)
            for _ in range(random.randint(0, 4)):
                comment_author = random.choice(users)
                comment, _ = Comment.objects.get_or_create(
                    post=post,
                    author=comment_author,
                    content=fake.paragraph(nb_sentences=2),
                    defaults={'is_approved': True}
                )
                
                # Nested comment (reply) 50% chance
                if random.choice([True, False]):
                    reply_author = random.choice([u for u in users if u != comment_author] or [comment_author])
                    Comment.objects.get_or_create(
                        post=post,
                        author=reply_author,
                        parent=comment,
                        content=fake.paragraph(nb_sentences=1),
                        defaults={'is_approved': True}
                    )

        # 6. Newsletter Subscribers
        for _ in range(15):
            NewsletterSubscriber.objects.get_or_create(email=fake.unique.email())

        self.stdout.write(self.style.SUCCESS(f"Database successfully seeded! Created/Verified {len(users)} users, {len(categories)} categories, {len(tags)} tags, and {len(posts)} posts."))

