CLUSTER_DISCOVERY_URL=mongodb://localhost/service-discovery \
CLUSTER_SERVICE=web \
CLUSTER_PUBLIC_SERVICES="search" \
CLUSTER_ENDPOINT_URL=http://localhost:$PORT \
ROOT_URL=http://www.mydomainname.com \
meteor --port $PORT
