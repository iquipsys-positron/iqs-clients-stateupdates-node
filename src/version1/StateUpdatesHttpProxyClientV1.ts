import { ConfigParams } from 'pip-services3-commons-node';
import { CurrentObjectStateV1 } from 'iqs-clients-currobjectstates-node';
import { ClustersProxyHttpClientV1 } from 'pip-clients-clusters-node';

import { StateUpdateV1 } from './StateUpdateV1';
import { IStateUpdatesClientV1 } from './IStateUpdatesClientV1';
import { StateUpdatesHttpClientV1 } from './StateUpdatesHttpClientV1';

export class StateUpdatesHttpProxyClientV1 extends ClustersProxyHttpClientV1<IStateUpdatesClientV1>
    implements IStateUpdatesClientV1 { 

    constructor(config?: any) {
        super(StateUpdatesHttpClientV1, 'iqs-services-stateupdates', 30020);

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public beginUpdateState(correlationId: string, stateUpdate: StateUpdateV1,
        callback: (err: any) => void): void {
        this.getClient(correlationId, stateUpdate.org_id, (err, client) => {
            if (err) {
                callback(err);
                return;
            }

            client.beginUpdateState(correlationId, stateUpdate, callback);
        });
    }

    public updateState(correlationId: string, stateUpdate: StateUpdateV1,
        callback: (err: any, state: CurrentObjectStateV1) => void): void {
        this.getClient(correlationId, stateUpdate.org_id, (err, client) => {
            if (err) {
                callback(err, null);
                return;
            }

            client.updateState(correlationId, stateUpdate, callback);
        });
    }

    public invalidateState(correlationId: string, orgId: string, deviceId: string,
        callback: (err: any, state: CurrentObjectStateV1) => void): void {
        this.getClient(correlationId, orgId, (err, client) => {
            if (err) {
                callback(err, null);
                return;
            }

            client.invalidateState(correlationId, orgId, deviceId, callback);
        });
    }
    
}
