import { CommandableHttpClient } from 'pip-services3-rpc-node';
import { CurrentObjectStateV1 } from 'iqs-clients-currobjectstates-node';
import { StateUpdateV1 } from './StateUpdateV1';
import { IStateUpdatesClientV1 } from './IStateUpdatesClientV1';
export declare class StateUpdatesHttpClientV1 extends CommandableHttpClient implements IStateUpdatesClientV1 {
    constructor(config?: any);
    beginUpdateState(correlationId: string, stateUpdate: StateUpdateV1, callback: (err: any) => void): void;
    updateState(correlationId: string, stateUpdate: StateUpdateV1, callback: (err: any, state: CurrentObjectStateV1) => void): void;
    invalidateState(correlationId: string, orgId: string, deviceId: string, callback: (err: any, state: CurrentObjectStateV1) => void): void;
}
