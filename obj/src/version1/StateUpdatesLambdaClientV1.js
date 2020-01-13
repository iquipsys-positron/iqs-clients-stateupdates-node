"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
class StateUpdatesLambdaClientV1 extends pip_services3_aws_node_1.CommandableLambdaClient {
    constructor(config) {
        super('state_updates');
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    beginUpdateState(correlationId, stateUpdate, callback) {
        this.callCommand('begin_update_state', correlationId, {
            state_update: stateUpdate
        }, callback);
    }
    updateState(correlationId, stateUpdate, callback) {
        this.callCommand('update_state', correlationId, {
            state_update: stateUpdate
        }, callback);
    }
    invalidateState(correlationId, orgId, deviceId, callback) {
        this.callCommand('invalidate_state', correlationId, {
            org_id: orgId,
            device_id: deviceId
        }, callback);
    }
}
exports.StateUpdatesLambdaClientV1 = StateUpdatesLambdaClientV1;
//# sourceMappingURL=StateUpdatesLambdaClientV1.js.map