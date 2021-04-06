# PLAETO
![PLAETO web client](https://git.reinkober.it/crunch/PLAETO/raw/branch/master/plaeto.png)
## Preface
Since this project was developed in the context of a past bachelor thesis, it will not be developed any further. Feel free to fork and ask questions. 

Contact/Inquiries: [dennis@reinkober.it](mailto:dennis@reinkober.it)
## Introduction
> “How could they see anything but the shadows if they were never allowed to move their heads?”

This repository contains the source for an implementation of a bachelor's thesis at the NES chair of the Duisburg-Essen University.

The repository's name is inspired from the parent project [SOCRAETES](https://github.com/SepehrMosavat/SOCRAETES), which provides an API for benchmarking bateryless sensor node energy harvesting data as well as relevant environmental parameters.

## Structure
There are two main directories that divide the structure of this project:

- plaeto_frontend: [Vue](https://vuejs.org/) App for user interaction, graphs and human-readable analysis
- plaeto_backend: [Django](https://www.djangoproject.com/) Backend service for management and API access of relevant data

## Installation
To run this project, you need to either have [Docker Desktop](https://docs.docker.com/get-started/) (Windows & Mac) installed or [Docker](https://docs.docker.com/get-started/) and [Docker Compose](https://docs.docker.com/compose/install/) in case you're a Linux user.

In order to ease installation, I prepared a docker compose file, which can be spun up by using only one command. The respective PLAETO system component images are built via Dockerfiles, excluding mongodb and mongo-express, which are ready-to-use images.

1. If you haven't already, install either [Docker Desktop](https://docs.docker.com/get-started/) (Windows & Mac) or [Docker](https://docs.docker.com/get-started/) and [Docker Compose](https://docs.docker.com/compose/install/) (Linux)
2. Run `docker-compose up` in the same directory as this README. This will spin up the PLAETO system, including the web client, REST API, MongoDB and the socket server
3. Visit [localhost:8081](http://localhost:8081/) and create a new database called `plaeto`
4. Inside this database, create a new collection called `projects`
5. Select the newly created collection and import the file in this README's directory called `MongoDB Fixture` for sample data


**Note**: There may be some inconsistencies concerning [persisted storage](https://hub.docker.com/_/mongo) (see "Caveats") as well as running Compose Files using Docker on Windows/Mac. This is due to these platforms utilizing Docker Desktop. In that case, you would have to deal with it yourself.


## Development Procedure
In order to enable organized development, the whole process will be described in [User Stories](https://www.atlassian.com/agile/project-management/user-stories) that are distributed across multiple milestones. These milestones are comparable to Sprints from the [SCRUM](https://www.scrum.org/resources/what-is-scrum/) methodology. The aforementioned User Stories will be noted in and accessible from separate document in this git repository. 

## Documents

- [User Stories & Requirements](user_stories.md)