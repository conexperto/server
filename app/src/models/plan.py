from src.mixins import BaseMixin
from sqlalchemy import Column, ForeignKey
from sqlalchemy import String, Integer, ARRAY 
from sqlalchemy.orm import relationship
from src.db import db



class Plan(BaseMixin, db.Model):
    __tablename__ = 'plan'

    id              = Column(Integer, primary_key=True)
    user_id         = Column(Integer, ForeignKey("expert.id"))
    duration        = Column(Integer, nullable=False)
    price           = Column(Integer, nullable=False)
    coin            = Column(String, default="USD")



