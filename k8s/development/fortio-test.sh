if [ -z $FORTIO_POD ];
then
  export FORTIO_POD=$(kubectl get pods -lapp=fortio -o 'jsonpath={.items[0].metadata.name}')
fi

kubectl exec "$FORTIO_POD" -c fortio -- fortio load -c 2 -qps 1 -t 200s -loglevel Warning -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjM4ODYyMTksImV4cCI6MTYyMzg4OTgxOSwic3ViIjoiZTQ3YTI0YTQtMWEwZS00ODZlLTkyNzctNDhiYzA3MzYwMzg5In0.aRhTUj67qcYBsCqz85qtZlcPHM5rYpOOUfpa7nYiCkg" http://gobarber-api-service-dev:8002/providers/appointments/day/16/month/6/year/2021
