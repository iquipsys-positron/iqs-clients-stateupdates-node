"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_clients_clusters_node_1 = require("pip-clients-clusters-node");
const StateUpdatesHttpClientV1_1 = require("./StateUpdatesHttpClientV1");
class StateUpdatesHttpProxyClientV1 extends pip_clients_clusters_node_1.ClustersProxyHttpClientV1 {
    constructor(config) {
        super(StateUpdatesHttpClientV1_1.StateUpdatesHttpClientV1, 'iqs-services-stateupdates', 30020);
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    beginUpdateState(correlationId, stateUpdate, callback) {
        this.getClient(correlationId, stateUpdate.org_id, (err, client) => {
            if (err) {
                callback(err);
                return;
            }
            client.beginUpdateState(correlationId, stateUpdate, callback);
        });
    }
    updateState(correlationId, stateUpdate, callback) {
        this.getClient(correlationId, stateUpdate.org_id, (err, client) => {
            if (err) {
                callback(err, null);
                return;
            }
            client.updateState(correlationId, stateUpdate, callback);
        });
    }
    invalidateState(correlationId, orgId, deviceId, callback) {
        this.getClient(correlationId, orgId, (err, client) => {
            if (err) {
                callback(err, null);
                return;
            }
            client.invalidateState(correlationId, orgId, deviceId, callback);
        });
    }
}
exports.StateUpdatesHttpProxyClientV1 = StateUpdatesHttpProxyClientV1;
//# sourceMappingURL=StateUpdatesHttpProxyClientV1.js.map