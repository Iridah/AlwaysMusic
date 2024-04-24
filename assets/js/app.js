// Definicion de variables
const express = require('express');
const pg = require('pg');
const fs = require('fs');
const chalk = require('chalk');
const nodemon = require('nodemon');

const app = express();
const { Pool } = pg;