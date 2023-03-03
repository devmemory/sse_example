const router = require('express').Router();
const SSEController = require('../controllers/sse_controller');

const controller = new SSEController();

router.get('/start', (req, res) => controller.subscribe(req, res));

router.get('/stop', (req,res) => controller.unsubscribe(res))

module.exports = router;