# demo-rabbitmq-x-consistent-hash

## Step to run

Start consumer
```
node consumer.js 1
node consumer.js 2
node consumer.js 3
node consumer.js 4
node consumer.js 5
```

Start provider
```
node provider.js user1 1
node provider.js user1 2
node provider.js user1 3
node provider.js demo 1
node provider.js test 1
```
