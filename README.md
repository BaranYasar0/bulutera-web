# Fimple Web Project

v1

## _Simple and Composable Financial Platform With the “Financial Function As A Service” Principle_

## Prerequisites

- node version ^17.9.0
- yarn version ^1.22.18
- nvm version ^0.39.1 optional for managing node version

## Start and Run

In root directory,

```
`yarn` -- Install dependencies
`yarn start:remote` -- Starts the Foreign Trade(host) on local, imports other modules from remote (development environment)
```

Navigate to _http://{tenant_name}.localhost:50000_ to start the container

## Manuel Installation

```
`yarn` -- Install dependencies
`cd mynewmodule` -- container micro frontend directory
`npm start` --  Starts the module's micro frontend. (**requires other modules to run locally**)
`npm start:remote` --  Starts module's micro frontend with remote references.
```

## Projects

| Name | Port  |
| ---- | ----- |
| fund | 50000 |

## UIKey Generation

```shell
yarn generate-uiKey
```

## New Module Generation

```shell
yarn generate-module mynewmodule
```
