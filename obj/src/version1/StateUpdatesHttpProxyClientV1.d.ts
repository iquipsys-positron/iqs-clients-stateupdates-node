import { CurrentObjectStateV1 } from 'iqs-clients-currobjectstates-node';
import { ClustersProxyHttpClientV1 } from 'pip-clients-clusters-node';
import { StateUpdateV1 } from './StateUpdateV1';
import { IStateUpdatesClientV1 } from './IStateUpdatesClientV1';
export declare class StateUpdatesHttpProxyClientV1 extends ClustersProxyHttpClientV1<IStateUpdatesClientV1> implements IStateUpdatesClientV1 {
    constructor(config?: any);
    beginUpdateState(correlationId: string, stateUpdate: StateUpdateV1, callback: (err: any) => void): void;
    updateState(correlationId: string, stateUpdate: StateUpdateV1, callback: (err: any, state: CurrentObjectStateV1) => void): void;
    invalidateState(correlationId: string, orgId: string, deviceId: string, callback: (err: any, state: CurrentObjectStateV1) => void): void;
}
