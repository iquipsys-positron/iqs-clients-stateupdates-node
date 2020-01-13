"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StateUpdatesNullClientV1 {
    beginUpdateState(correlationId, stateUpdate, callback) {
        callback(null);
    }
    updateState(correlationId, stateUpdate, callback) {
        callback(null, null);
    }
    invalidateState(correlationId, orgId, deviceId, callback) {
        callback(null, null);
    }
}
exports.StateUpdatesNullClientV1 = StateUpdatesNullClientV1;
//# sourceMappingURL=StateUpdatesNullClientV1.js.map