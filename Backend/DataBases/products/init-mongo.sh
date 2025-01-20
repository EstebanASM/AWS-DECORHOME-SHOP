#!/bin/bash
mongoimport --host localhost --db db_products --collection products --type json --file /data/products.json --jsonArray
