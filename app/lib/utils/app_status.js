'use strict';

const packJson = require('../../../package.json');
const {logger} = require('./logger');
const {config} = require('../../config/config');

const appStatus = {
    getGeneralInfo() {
        const application = {};

        application.node_version = process.version;
        application.dep_versions = packJson.dependencies;
        application.name = config.app.name;
        application.platform = process.platform;
        application.memory_usage = process.memoryUsage();
        application.uptime_min = process.uptime() / 60;
        application.app_version = packJson.version;

        logger.info('Constructed general backend service status data');
        return application;
    },

    compile(_, res) {
        const status = {
            message: `${config.app.name} backend service is running.`,
            data: {
                info: this.getGeneralInfo()
            }
        }

        if (res) {
            return res.json({...status});
        }

        return status;
    }
}

module.exports = {
    appStatus
};
