from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from functools import wraps

def jwt_required_role(role):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt_identity()
            if claims.get("role") != role:
                return {"msg": "Unauthorized"}, 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator
