from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from run import app
from app.config.db import db

migrate = Migrate(app, db)
manager = Manager(app)

# Register db command
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
