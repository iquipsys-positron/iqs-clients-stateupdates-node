import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';

import { CurrentObjectStateV1 } from 'iqs-clients-currobjectstates-node';

import { IStateUpdatesClientV1 } from './IStateUpdatesClientV1';
import { StateUpdateV1 } from './StateUpdateV1';

export class StateUpdatesNullClientV1 implements IStateUpdatesClientV1 {
            
    public beginUpdateState(correlationId: string, stateUpdate: StateUpdateV1, 
        callback: (err: any) => void): void {
        callback(null);
    }

    public updateState(correlationId: string, stateUpdate: StateUpdateV1, 
        callback: (err: any, state: CurrentObjectStateV1) => void): void {
        callback(null, null);
    }

    public invalidateState(correlationId: string, orgId: string, deviceId: string, 
        callback: (err: any, state: CurrentObjectStateV1) => void): void {
        callback(null, null);
    }
    
}