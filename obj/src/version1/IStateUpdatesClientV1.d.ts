import { StateUpdateV1 } from './StateUpdateV1';
import { CurrentObjectStateV1 } from 'iqs-clients-currobjectstates-node';
export interface IStateUpdatesClientV1 {
    beginUpdateState(correlationId: string, stateUpdate: StateUpdateV1, callback: (err: any) => void): void;
    updateState(correlationId: string, stateUpdate: StateUpdateV1, callback: (err: any, state: CurrentObjectStateV1) => void): void;
    invalidateState(correlationId: string, orgId: string, deviceId: string, callback: (err: any, state: CurrentObjectStateV1) => void): void;
}
