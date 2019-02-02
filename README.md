## Installation
```bash
npm i https://github.com/dongmingchao/NSite-APIDocServer
```

## Import
```javascript
import api from 'nsite-api';
```

## Add Routers
```javascript
api.generator.addJoiRouter(your_joi_router);
```

## Use Middleware
```javascript
router.use(api.router.middleware());
```