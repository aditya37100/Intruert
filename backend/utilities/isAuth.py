from flask import request, make_response, jsonify

# from config.db_config import users

import jwt
import os


def isAuth():
    try:
        token = request.headers.get("Authorization")
        if token is None:
            # Fallback to URL parameter for <img> tags
            token_arg = request.args.get("token")
            if token_arg is None:
                return {"status": "error", "msg": "token not provided"}
            token = f"Bearer {token_arg}"

        token = token.split()[1]
        if token is None:
            return {"status": "error", "msg": "token in invalid format"}

        decoded_token = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=["HS256"])
        return {"status": "success", "msg": decoded_token}

    except jwt.InvalidTokenError as err:
        print(err)
        return {"status": "error", "msg": "invalid token"}
