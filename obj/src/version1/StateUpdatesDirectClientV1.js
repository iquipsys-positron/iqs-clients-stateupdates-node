"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class StateUpdatesDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor("iqs-services-stateupdates", "controller", "*", "*", "*"));
    }
    beginUpdateState(correlationId, stateUpdate, callback) {
        let timing = this.instrument(correlationId, 'state_updates.begin_update_state');
        this._controller.beginUpdateState(correlationId, stateUpdate, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    updateState(correlationId, stateUpdate, callback) {
        let timing = this.instrument(correlationId, 'state_updates.update_state');
        this._controller.updateState(correlationId, stateUpdate, (err, state) => {
            timing.endTiming();
            callback(err, state);
        });
    }
    invalidateState(correlationId, orgId, deviceId, callback) {
        let timing = this.instrument(correlationId, 'state_updates.invalidate_state');
        this._controller.invalidateState(correlationId, orgId, deviceId, (err, state) => {
            timing.endTiming();
            callback(err, state);
        });
    }
}
exports.StateUpdatesDirectClientV1 = StateUpdatesDirectClientV1;
//# sourceMappingURL=StateUpdatesDirectClientV1.js.map