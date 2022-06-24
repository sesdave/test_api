const { Router } = require('express')
const errorHandler = require('../middlewares/errorHandler')
const { login, getRegData } = require('../controllers/auth.controller')
const searchController = require('../controllers/search.controller')
const validate = require('../middlewares/Validator/auth')
const cloudinary = require('../utils/CloudinaryMediaProvider')

const personnelRoutes = require('./personnel')
const firmRoutes = require('./firm')
const adminRoutes = require('./admin')
const paymentRoutes = require('./payment')
const regulationRoutes = require('./regulation')
const documentRoutes = require('./documents')
const approvalRoutes = require('./approvals')
const testService=require('../database/repositories/personnel')
const isAuthenticated= require('../middlewares/isAuthenticated')
const isAuthorised= require('../middlewares/isAuthorized')
const fileSystem= require('fs')
const fastcsv= require('fast-csv')
const { resourceLimits } = require('worker_threads')

const router = Router()

router.post('/upload', (req, res, next) => {
	return cloudinary
		.upload(req)
		.then((response) => res.status(200).json(response))
		.catch(next)
})

router.use('/personnels', personnelRoutes)
router.use('/firms', firmRoutes)
router.use('/admins', adminRoutes)
router.use('/payments', paymentRoutes)
router.use('/regulations', regulationRoutes)
router.use('/approvals', approvalRoutes)
router.get('/fees', searchController.getSelectedFees)
router.post('/login', validate('signIn'), login)
router.use('/docs', documentRoutes)
router.get('/getRegData', getRegData)

router.get('/test', isAuthenticated, isAuthorised(''),async(req, res)=>{
	const response= await testService.getOwingPersonnel(req.user);
	console.log('user id', req.user.profileId)
	res.status(200).json({
		status:'success',
		data:response,
		msg:'Hello World'
	})
})

router.get('/export-csv', async(req, res)=>{
	console.log('Hello World!!!');
	const data=[{
		"id":1,
		"Name":"POS",
		"age": 29
	},{
		"id":2,
		"Name":"Lapari",
		"age": 30
	},{
		"id":3,
		"Name":"Laptop",
		"age": 29
	},{
		"id":4,
		"Name":"Hafsat",
		"age": 36
	},{
		"id":5,
		"Name":"Adejasa",
		"age": 20
	},{
		"id":6,
		"Name":"Lapori",
		"age": 20
	},{
		"id":7,
		"Name":"Adejasa",
		"age": 20
	},{
		"id":8,
		"Name":"Adejasa",
		"age": 20
	},{
		"id":9,
		"Name":"Adejasa",
		"age": 20
	},{
		"id":10,
		"Name":"Fijesa",
		"age": 20
	},{
		"id":11,
		"Name":"Gonora",
		"age": 29
	},{
		"id":12,
		"Name":"Lapari",
		"age": 30
	},{
		"id":13,
		"Name":"Adamu",
		"age": 29
	},{
		"id":14,
		"Name":"Computer",
		"age": 36
	},{
		"id":15,
		"Name":"Adejasa",
		"age": 20
	},{
		"id":16,
		"Name":"Charis",
		"age": 20
	},{
		"id":17,
		"Name":"Adejasa",
		"age": 20
	},{
		"id":18,
		"Name":"Adejasa",
		"age": 20
	},{
		"id":19,
		"Name":"Adejasa",
		"age": 20
	},{
		"id":20,
		"Name":"Bedroom",
		"age": 20
	}];
	const ws= fileSystem.createWriteStream("public/data.csv");
    fastcsv.write(data, {headers:true})
			.on("finish", function(){
				
				//res.send('Sent')
				//res.send("<a href='/public/data.csv' download='data.csv' id='download-link'>Click</a><script>document.getElementById('download-link').click();</script>")
				//const file = `public/data.csv`;
 			   // res.download(file); // Set disposition and send it.
				//res.send("<a href='/public/data.csv' download='data.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>");
            
			})
			.pipe(ws)
			.on("finish", function(){
				const file = `public/data.csv`;
				res.download(file)	
			})

		
	
		

;		
})

router.get('/', (req, res) =>
	res.status(200).send('You have reached the Coren backend api')
)

router.all('*', (req, res) => res.sendStatus(404))

router.use((err, req, res, next) => errorHandler(err, req, res))

module.exports = router
