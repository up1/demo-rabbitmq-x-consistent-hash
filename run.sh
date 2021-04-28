docker container run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
docker exec -it rabbitmq bash
rabbitmq-plugins enable rabbitmq_consistent_hash_exchange
exit