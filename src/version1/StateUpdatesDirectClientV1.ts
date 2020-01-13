import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';

import { CurrentObjectStateV1 } from 'iqs-clients-currobjectstates-node';

import { IStateUpdatesClientV1 } from './IStateUpdatesClientV1';
//import { IStateUpdatesController } from 'iqs-services-stateupdates-node';
import { StateUpdateV1 } from './StateUpdateV1';

export class StateUpdatesDirectClientV1 extends DirectClient<any> implements IStateUpdatesClientV1 {
            
    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor("iqs-services-stateupdates", "controller", "*", "*", "*"))
    }

    public beginUpdateState(correlationId: string, stateUpdate: StateUpdateV1, 
        callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'state_updates.begin_update_state');
        this._controller.beginUpdateState(correlationId, stateUpdate, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    public updateState(correlationId: string, stateUpdate: StateUpdateV1, 
        callback: (err: any, state: CurrentObjectStateV1) => void): void {
        let timing = this.instrument(correlationId, 'state_updates.update_state');
        this._controller.updateState(correlationId, stateUpdate, (err, state) => {
            timing.endTiming();
            callback(err, state);
        });
    }

    public invalidateState(correlationId: string, orgId: string, deviceId: string, 
        callback: (err: any, state: CurrentObjectStateV1) => void): void {
        let timing = this.instrument(correlationId, 'state_updates.invalidate_state');
        this._controller.invalidateState(correlationId, orgId, deviceId, (err, state) => {
            timing.endTiming();
            callback(err, state);
        });
    }
    
}