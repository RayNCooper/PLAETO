# User Stories & Requirements

## Stakeholder

Until now, there is essentially only one type of stakeholder: _Users_.

A User knows their way around computers and digital workflows.

Users utilize [SOCRAETES](https://github.com/SepehrMosavat/SOCRAETES) to record energy harvesting conditions on a variety of embedded devices.

Although Users possess the ability to use the WebApp with all its features, they do not have access to delicate intricacies such as the Admin/Debug panel or other Interfaces through which the stored data of another User can be altered (to put it short: Users do not have Admin permissions).

Since Users do not have access to the core workings of the backend (such as management of all stored data), the WebApp needs to offer a Toolkit to Users that satisfies their needs.

## On-device (energy harvester recorder used, built on SOCRAETES)

- “As a User, I want to be able to record energy harvesting data from an embedded device.”
- “As a User, I want to be able to store my recorded data remotely.”
- “As a User, I want to be able to attach metadata such as time of day to the recorded energy harvesting data.”

## In the browser (WebApp, Frontend)

- “As a User, I want to be able to visualize my stored data.”
- “As a User, I want to be able to compare different datasets that I stored.“
- “As a User, I want to be able to apply different methods (such as interpolation) on my stored data for analysis purposes.”

## Requirements

As soon as there are enough User Stories, various requirements can be deduced:

### On-device (energy harvester recorder used, built on SOCRAETES)

#### ❌ Transmission of data ❌

- ✅ Users need to be able to transmit their data to the remote backend
  - This procedure is ideally performed by transmitting recorder data to the remote endpoint via an USB connection to a general computing device
    - Energy Harvester Recorder -> (USB) -> General Computing device -> (Network) -> Remote
- ❌ The means of transmission should include the following, starting off with the most important:
  1. via _Socket_ (Realtime - **JSON** format)
  2. via _HTTP_ (Fallback for Socket Connection, Locally Recorded Trace imported - **HDF5** format)
- ❌ If one kind of transmission fails, the other should be tried in order to guarantee reception of data
  - If there is no Internet connection available to the transmitting device, the program should log a _warning_ and save all recorded data to a file

#### ❌ Data format, Metadata ❌

- ❌ In order to guarantee data integrity, the format/schema for all data should be standardized
  - The data format used in network transmission is [JSON](https://www.json.org/json-en.html)
  - The data format for direct node-to-disk commitment, file import/export is [HDF5](https://www.hdfgroup.org/solutions/hdf5)
      - On file import (upload), data is parsed for persistence from **HDF5** to **JSON** 
      - On file export (download), data is parsed from persisted **JSON** to **HDF5**
      - **CAUTION:** How does the system handle large datasets (>=1GB)?
- ❌ Users should be able to add metadata such as temperature or time of day to their data in order to enable categorization

### In the browser (WebApp, Frontend)

#### ❌ Visualization of Data ❌

- ❌ Users should be able to visualize their stored data
  - There should be various options of charts and graphs for Users to choose from (both 2D and 3D)
- ❌ Users should be able to compare their stored data
  - Datasets should be comparable by giving side-by-side comparisons as well as by superimposing data in one chart
- ✅ Users should be able to observe incoming data in real-time if possible
  - If there is a socket connection to the project's backend, Users should be able to keep track of incoming data by receiving real-time updates relayed through the backend server

#### ❌ Data analysis ❌

- ❌ Users should be able to analyze their stored data
  - To give Users a chance to coarsely analyze their data, there should be several options for treating displayed data (e.g. interpolation)

### Backend (Remote)

#### ✅ API ✅

- ✅ The backend should offer an API in order to receive energy harvesting node data
  - There should be both an API for _HTTP_ as well as for _Sockets_

#### ❌ File import & export ❌

- ❌ The backend should offer a way to import and export data in the HDF5 file format
  - If an uploaded file has a wrong file extension or schema, it should be rejected and an error should be displayed to the User via the frontend
  - Data can be exported and downloaded in the HDF5 file format
