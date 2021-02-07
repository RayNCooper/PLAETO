from typing import Optional, List
from fastapi import FastAPI
from pydantic import BaseModel, Field
from pymongo import MongoClient
from bson import ObjectId

client = MongoClient('localhost', 27017, username="root", password="example")

db = client.plaeto
collection = db.traces

app = FastAPI()


class PyObjectId(ObjectId):
    """ Custom Validator Class for FastAPI because Pydantic
    does not support variables starting with '_' and MongoDB's ObjectId type """

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid objectid')
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type='string')


class TracePoint(BaseModel):
    """ equal to CurvePoint type in the frontend """
    sequence_number: int
    voltage: float
    micro_amperage: int


class TraceData(BaseModel):
    """ equal to CurveData type in the frontend """

    """ Alias created so FastAPI/pydantic can read the id variable """
    id: Optional[PyObjectId] = Field(alias='_id')
    trace_number: int
    trace_points: List[TracePoint]

    class Config:
        """ Here we tell pydantic that we are using a custom type (MongoDB's ObjectId type) """
        arbitrary_types_allowed = True
        """ Definition of JSON encoding for FastAPI """
        json_encoders = {
            ObjectId: str
        }


@app.get("/trace")
async def get_trace(id: str):
    trace = collection.find_one({"_id": ObjectId(id)})
    return {"trace": TraceData(**trace)}


@app.get("/traces")
async def list_traces():
    trace_list = []
    for trace in collection.find():
        trace_list.append(TraceData(**trace))
    return {"traces": trace_list}


@app.post("/trace")
async def post_trace(trace: TraceData):
    if hasattr(trace, 'id'):
        delattr(trace, 'id')
    ret = collection.insert_one(trace.dict(by_alias=True))
    trace.id = ret.inserted_id
    return {'posted_trace': trace}


@app.put("/trace")
async def put_trace(trace: TraceData):
    collection.replace_one({"_id": ObjectId(trace.id)},
                           trace.dict(exclude={'id'}))
    t = collection.find_one({"_id": ObjectId(trace.id)})
    return {"updated_trace": TraceData(**t)}
