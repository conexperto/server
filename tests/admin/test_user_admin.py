''' tests.test_user_admin '''
import logging
from json import loads, dumps
from jsonschema import validate


logger = logging.getLogger(__name__)


schema = {
    "type": "object",
    "properties": {
        "success": { "type": "boolean" },
        "response": {
            "type": "object",
            "properties": {
                "uid": { "type": "string" },
            },
            "required": ["uid"]
        }
    },
    "required": ["success", "response"]
}

schema_error = {
    "type": "object",
    "properties": {
        "success": { "type": "boolean" },
        "err": { "type": "number" },
        "msg": { "type": "string" },
        "detail": { "type": "string" },
        "code": { "type": "string" }
    },
    "required": ["success", "err", "msg", "detail", "code"]
}

