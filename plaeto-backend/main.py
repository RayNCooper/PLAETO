from typing import Optional, List
from fastapi import FastAPI
from pydantic import BaseModel, Field
from pymongo import MongoClient
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware

client = MongoClient('mongo', 27017, username="root", password="example")

db = client.plaeto
collection = db.projects

app = FastAPI()

origins = [
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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

    trace_number: int
    trace_points: List[TracePoint]


class MetaData(BaseModel):
    country: str
    city: str
    weather: str
    lux: float
    environment: str


class TraceProject(BaseModel):
    """ List of TraceData Objects """

    """ Alias created so FastAPI/pydantic can read the id variable """
    id: Optional[PyObjectId] = Field(alias='_id')
    traces: List[TraceData]
    title: str
    metadata: MetaData

    class Config:
        """ Here we tell pydantic that we are using a custom type (MongoDB's ObjectId type) """
        arbitrary_types_allowed = True
        """ Definition of JSON encoding for FastAPI """
        json_encoders = {
            ObjectId: str
        }


@app.get("/project")
async def get_project(id: str):
    project = collection.find_one({"_id": ObjectId(id)})
    return {"project": TraceProject(**project)}


@app.delete("/project")
async def delete_project(id: str):
    d = collection.delete_one({"_id": ObjectId(id)})


@app.get("/projects")
async def list_projects():
    project_list = []
    for project in collection.find():
        project_list.append(TraceProject(**project))
    return {"projects": project_list}


@app.post("/project")
async def post_project(project: TraceProject):
    if hasattr(project, 'id'):
        delattr(project, 'id')
    ret = collection.insert_one(project.dict(by_alias=True))
    project.id = ret.inserted_id
    return {'posted_project': project}


@app.put("/project")
async def put_project(project: TraceProject):
    collection.replace_one({"_id": ObjectId(project.id)},
                           project.dict(exclude={'id'}))
    t = collection.find_one({"_id": ObjectId(project.id)})
    return {"updated_project": TraceProject(**t)}


@app.patch("/project")
async def append_trace(project_id: str, trace: TraceData):
    collection.find_one_and_update({"_id": ObjectId(project_id)}, {
                                   "$push": {'traces': trace.dict()}})
