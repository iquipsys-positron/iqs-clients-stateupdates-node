let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { PagingParams } from 'pip-services3-commons-node';
import { OrganizationsMemoryClientV1 } from 'pip-clients-organizations-node';
import { DevicesMemoryClientV1 } from 'iqs-clients-devices-node';
import { CurrentObjectStatesMemoryClientV1 } from 'iqs-clients-currobjectstates-node';
import { CurrentObjectStateV1 } from 'iqs-clients-currobjectstates-node';

import { StateUpdateV1 } from '../../src/version1/StateUpdateV1';
import { IStateUpdatesClientV1 } from '../../src/version1/IStateUpdatesClientV1';

let time = new Date().getTime() - 10000;
let STATE1: StateUpdateV1 = {
    org_id: '1',
    device_id: '1',
    time: new Date(time),
    lat: 32,
    lng: -110,
    alt: 750,
    angle: 0,
    speed: 1,
    pressed: false,
    freezed: false
};
let STATE2: StateUpdateV1 = {
    org_id: '1',
    device_id: '2',
    time: new Date(time),
    lat: 33,
    lng: -111,
    alt: 750,
    angle: 0,
    speed: 1,
    pressed: false,
    freezed: false
};

export class StateUpdatesClientFixtureV1 {
    private _client: IStateUpdatesClientV1;
    private _organizationsClient: OrganizationsMemoryClientV1;
    private _devicesClient: DevicesMemoryClientV1;
    private _currentStatesClient: CurrentObjectStatesMemoryClientV1;
    
    constructor(client: IStateUpdatesClientV1, 
        organizationsClient: OrganizationsMemoryClientV1, devicesClient: DevicesMemoryClientV1,
        currentStatesClient: CurrentObjectStatesMemoryClientV1) {
        this._client = client;

        this._organizationsClient = organizationsClient;
        organizationsClient.createOrganization(null, { id: '1', name: 'Test organization', active: true }, () => {});

        this._devicesClient = devicesClient;
        devicesClient.createDevice(null, { id: '1', org_id: '1', object_id: '1', udi: '111', type: 'smartphone', status: 'active' }, () => {});
        devicesClient.createDevice(null, { id: '2', org_id: '1', object_id: '2', udi: '222', type: 'smartphone', status: 'active' }, () => {});        

        this._currentStatesClient = currentStatesClient;
    }
        
    public testCrudOperations(done) {
        let state1, state2: CurrentObjectStateV1;

        async.series([
        // Create one state
            (callback) => {
                this._client.updateState(
                    null,
                    STATE1,
                    (err, state) => {
                        assert.isNull(err);
                        assert.isObject(state);
                        assert.equal(state.org_id, STATE1.org_id);
                        assert.equal(state.online, 1);
                        assert.equal(state.freezed, 0);
                        state1 = state;

                        callback();
                    }
                );
            },
        // Create another state
            (callback) => {
                this._client.updateState(
                    null,
                    STATE2,
                    (err, state) => {
                        assert.isNull(err);

                        assert.isObject(state);
                        assert.equal(state.org_id, STATE2.org_id);
                        assert.equal(state.online,1);
                        assert.equal(state.freezed, 0);

                        state2 = state;

                        callback();
                    }
                );
            },
        // Get all states
            (callback) => {
                this._currentStatesClient.getStates(
                    null,
                    '1',
                    null,
                    new PagingParams(0,5,false),
                    (err, states) => {
                        assert.isNull(err);

                        assert.isObject(states);
                        assert.isTrue(states.data.length >= 2);

                        callback();
                    }
                );
            },
        // Update the state
            (callback) => {
                let stateUpdate = <StateUpdateV1>{
                    org_id: '1',
                    device_id: '1',
                    time: new Date(),
                    emergency: true,
                    freezed: true
                };
            
                this._client.updateState(
                    null,
                    stateUpdate,
                    (err, state) => {
                        assert.isNull(err);

                        assert.isObject(state);
                        assert.equal(state.org_id, stateUpdate.org_id);
                        assert.isNull(state.pos);
                        assert.isTrue(state.online >= 11);
                        assert.isTrue(state.freezed >= 1);

                        state1 = state;

                        callback();
                    }
                );
            }
        ], done);
    }

    public testInvalidateState(done) {
        async.series([
        // Invalidate state when it doesn't exist
            (callback) => {
                this._client.invalidateState(
                    null,
                    STATE1.org_id, STATE1.device_id,
                    (err, state) => {
                        assert.isNull(err);

                        assert.isObject(state);

                        callback();
                    }
                );
            },
        // Update state
            (callback) => {
                this._client.updateState(
                    null,
                    {
                        org_id: STATE1.org_id,
                        device_id: STATE1.device_id,
                        time: new Date(),
                        lat: 32,
                        lng: -110,
                        alt: 750,
                        angle: 0,
                        speed: 1,
                        pressed: false,
                        freezed: false
                    },
                    (err, state) => {
                        assert.isNull(err);

                        assert.isObject(state);

                        callback();
                    }
                );
            },
        // Invalidate state once again
            (callback) => {
                this._client.invalidateState(
                    null,
                    STATE1.org_id, STATE1.device_id,
                    (err, state) => {
                        assert.isNull(err);

                        assert.isObject(state);

                        callback();
                    }
                );
            }
        ], done);
    }

}
