#!/bin/bash

FLASK_APP="src.api:create_api()"

flask seed user up
flask seed admin up
