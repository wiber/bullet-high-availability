CLUSTER_DISCOVERY_URL=mongodb://localhost/service-discovery \
CLUSTER_SERVICE="search" \
CLUSTER_ENDPOINT_URL=http://localhost:$PORT \
ROOT_URL=http://www.mydomainname.com \
meteor --port $PORT
