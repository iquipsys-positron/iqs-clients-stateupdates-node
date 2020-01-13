"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const StateUpdatesNullClientV1_1 = require("../version1/StateUpdatesNullClientV1");
const StateUpdatesDirectClientV1_1 = require("../version1/StateUpdatesDirectClientV1");
const StateUpdatesHttpClientV1_1 = require("../version1/StateUpdatesHttpClientV1");
const StateUpdatesLambdaClientV1_1 = require("../version1/StateUpdatesLambdaClientV1");
const StateUpdatesHttpProxyClientV1_1 = require("../version1/StateUpdatesHttpProxyClientV1");
class StateUpdatesClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(StateUpdatesClientFactory.NullClientV1Descriptor, StateUpdatesNullClientV1_1.StateUpdatesNullClientV1);
        this.registerAsType(StateUpdatesClientFactory.DirectClientV1Descriptor, StateUpdatesDirectClientV1_1.StateUpdatesDirectClientV1);
        this.registerAsType(StateUpdatesClientFactory.HttpClientV1Descriptor, StateUpdatesHttpClientV1_1.StateUpdatesHttpClientV1);
        this.registerAsType(StateUpdatesClientFactory.LambdaClientV1Descriptor, StateUpdatesLambdaClientV1_1.StateUpdatesLambdaClientV1);
        this.registerAsType(StateUpdatesClientFactory.HttpProxyClientV1Descriptor, StateUpdatesHttpProxyClientV1_1.StateUpdatesHttpProxyClientV1);
    }
}
exports.StateUpdatesClientFactory = StateUpdatesClientFactory;
StateUpdatesClientFactory.Descriptor = new pip_services3_commons_node_1.Descriptor('iqs-services-stateupdates', 'factory', 'default', 'default', '1.0');
StateUpdatesClientFactory.NullClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('iqs-services-stateupdates', 'client', 'null', 'default', '1.0');
StateUpdatesClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('iqs-services-stateupdates', 'client', 'direct', 'default', '1.0');
StateUpdatesClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('iqs-services-stateupdates', 'client', 'http', 'default', '1.0');
StateUpdatesClientFactory.LambdaClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('iqs-services-stateupdates', 'client', 'lambda', 'default', '1.0');
StateUpdatesClientFactory.HttpProxyClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('iqs-services-stateupdates', 'client', 'http-proxy', 'default', '1.0');
//# sourceMappingURL=StateUpdatesClientFactory.js.map