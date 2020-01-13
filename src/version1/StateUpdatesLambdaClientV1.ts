let _ = require('lodash');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { CommandableLambdaClient } from 'pip-services3-aws-node';

import { CurrentObjectStateV1 } from 'iqs-clients-currobjectstates-node';

import { StateUpdateV1 } from './StateUpdateV1';
import { IStateUpdatesClientV1 } from './IStateUpdatesClientV1';

export class StateUpdatesLambdaClientV1 extends CommandableLambdaClient implements IStateUpdatesClientV1 {       

    constructor(config?: any) {
        super('state_updates');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public beginUpdateState(correlationId: string, stateUpdate: StateUpdateV1,
        callback: (err: any) => void): void {
        this.callCommand(
            'begin_update_state', 
            correlationId,
            {
                state_update: stateUpdate
            }, 
            callback
        );
    }

    public updateState(correlationId: string, stateUpdate: StateUpdateV1,
        callback: (err: any, state: CurrentObjectStateV1) => void): void {
        this.callCommand(
            'update_state', 
            correlationId,
            {
                state_update: stateUpdate
            }, 
            callback
        );
    }

    public invalidateState(correlationId: string, orgId: string, deviceId: string,
        callback: (err: any, state: CurrentObjectStateV1) => void): void {
        this.callCommand(
            'invalidate_state', 
            correlationId,
            {
                org_id: orgId,
                device_id: deviceId
            }, 
            callback
        );
    }
    
}
