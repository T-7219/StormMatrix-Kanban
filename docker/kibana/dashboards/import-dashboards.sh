#!/bin/bash
set -e

# Ждем, пока Kibana полностью загрузится
echo "Waiting for Kibana to start..."
while ! curl -s -o /dev/null -w "%{http_code}" http://localhost:5601/api/status | grep -q "200"; do
  echo "Kibana is not ready yet, waiting..."
  sleep 5
done
echo "Kibana is up and running!"

# Импортируем все дашборды
echo "Importing Kibana dashboards..."
for dashboard_file in /usr/share/kibana/dashboards/*.ndjson; do
  if [ -f "$dashboard_file" ]; then
    echo "Importing $dashboard_file..."
    curl -X POST "http://localhost:5601/api/saved_objects/_import" \
      -H "kbn-xsrf: true" \
      --form file=@"$dashboard_file" \
      -H "Content-Type: multipart/form-data"
  fi
done

echo "Dashboard import completed!"