"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class StateUpdatesHttpClientV1 extends pip_services3_rpc_node_1.CommandableHttpClient {
    constructor(config) {
        super('v1/state_updates');
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
exports.StateUpdatesHttpClientV1 = StateUpdatesHttpClientV1;
//# sourceMappingURL=StateUpdatesHttpClientV1.js.map