
# Yoga Admission Form Backend Setup

This is the backend for the Yoga Admission Form. It is built with **Node.js** and **Sequelize** for managing the database interactions.

## Prerequisites

Before you begin, ensure that you have the following software installed on your machine:

- **Node.js** (v14 or higher)
- **MySQL** (or any MySQL-compatible database)

## Setup Instructions

Follow these steps to set up the backend locally:

### 1. Clone the repository

First, clone this repository to your local machine.

```bash
git clone https://github.com/your-repo/yoga-admission-form-backend.git
cd yoga-admission-form-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup MySQL Database

```bash
CREATE DATABASE yoga;
```

### 4. Configure Database Connection

```bash
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: 'yoga', // Change this to your database name
    dialect: 'mysql', // Ensure the dialect is 'mysql'
    username: 'root', // Change this to your MySQL username
    password: 'xxx', // Change this to your MySQL password
});

module.exports = sequelize;
```

### 5. Start Node Server

```bash
nodemon
```
-----OR------
```bash
node index.js
```

