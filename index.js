const Router = require('koa-joi-router');
const {SwaggerAPI} = require('koa-joi-router-docs');
const path = require('path');
const send = require('koa-send');

/**
 * Define routes
 */
const router = Router();

// Get /user/:_id
// router.get('/user/:_id', {
//   meta: {
//     swagger: {
//       summary: 'Get User Info',
//       description: `Note: \nSensitive data can only be viewed by the \`corresponding user\` or \`Admin\`.`,
//       tags: ['users']
//     }
//   },
//   validate: {
//     params: {
//       _id: Joi.string().alphanum().max(24).description('User id').required()
//     },
//     output: {
//       '200-299': {
//         body: Joi.object({
//           userId: Joi.string().description('User id')
//         }).options({
//           allowUnknown: true
//         }).description('User object')
//       }
//     }
//   },
//   handler: async ctx => {
//     console.log('getUser...')
//     ctx.body = {
//       userId: ctx.params._id
//     }
//   }
// });
//
// // POST /signup
// router.post('/signup', {
//   meta: {
//     swagger: {
//       summary: 'User Signup',
//       description: 'Signup with username and password.',
//       tags: ['users']
//     }
//   },
//   validate: {
//     type: 'json',
//     body: {
//       username: Joi.string().alphanum().min(3).max(30).required(),
//       password: Joi.string().alphanum().min(6).max(30).required()
//     },
//     output: {
//       200: {
//         body: {
//           userId: Joi.string().description('Newly created user id')
//         }
//       }
//     }
//   },
//   handler: async ctx => {
//     ctx.body = {
//       userId: ctx.body.username
//     }
//   }
// });

/**
 * Generate Swagger json from the router object
 */
const generator = new SwaggerAPI();

generator.addJoiRouter(router);
const base = {
	jsonPath: '/_api.json',
	webPath: '/doc',
	basePath: '/',
	info: {
		title: 'Example API',
		description: 'API for creating and editing examples.',
		version: '1.1'
	},
	tags: [{
		name: '用户管理',
		description: '对基础用户的注册/登陆'
	}],
	defaultResponses: {}
};

/**
 * Swagger JSON API
 */
router.get(base.jsonPath, async ctx => {
	ctx.body = JSON.stringify(generator.generateSpec(base, {
		defaultResponses: base.defaultResponses
	}), null, '  ')
});

module.exports = {
	router, generator, base,
	src: 'node_modules/nsite-api/assets/swagger/dist/'
};