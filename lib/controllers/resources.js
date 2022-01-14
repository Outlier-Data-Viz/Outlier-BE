const {Router} = require('express');
const Resources = require('../models/Resources');

module.exports = Router() 
.post('/', async (req, res, next) => {
    try {
        const entry = await Resources.create(req.body);
        res.send(entry)
    } catch (error) {
        next(error);
    }
})

.get('/', async (req, res, next) => {
    try {
        const savedResource = await Resources.getAllResources();
        res.send(savedResource);
    } catch (error) {
        next(error);
    }
})

.get('/:id', async (res, res, next) => {
    try {
        const id = req.params.id;
        const resource = await Resources.getResourcesById(id);
        res.send(resource);
    } catch (error) {
        next(error);
    }
})

.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.resourceId;
        const update = req.body;
        const updateRes = await Resources.update({ id, ...update});
        res.send(updateRes);
    } catch (error) {
        next(error);
    }
})

.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleteRes = await Resources.delete(id);
        res.send(deleteRes);
    } catch (error) {
        next(error);
    }
});
