let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { OrganizationsMemoryClientV1 } from 'pip-clients-organizations-node';
import { DevicesMemoryClientV1 } from 'iqs-clients-devices-node';
import { ControlObjectsMemoryClientV1 } from 'iqs-clients-controlobjects-node';
import { EventRulesMemoryClientV1 } from 'iqs-clients-eventrules-node';
import { ZonesMemoryClientV1 } from 'iqs-clients-zones-node';
import { ObjectStatesNullClientV1 } from 'iqs-clients-objectstates-node';
import { PositionsNullClientV1 } from 'pip-clients-positions-node';
import { OperationalEventsNullClientV1 } from 'iqs-clients-opevents-node';
import { IncidentsNullClientV1 } from 'iqs-clients-incidents-node';
import { RostersMemoryClientV1 } from 'iqs-clients-rosters-node';
import { SignalsNullClientV1 } from 'iqs-clients-signals-node';
import { StatisticsNullClientV1 } from 'pip-clients-statistics-node';
import { EmailNullClientV1 } from 'pip-clients-email-node';
import { SmsNullClientV1 } from 'pip-clients-sms-node';
import { CurrentObjectStatesMemoryClientV1 } from 'iqs-clients-currobjectstates-node';
import { CurrentDeviceStatesMemoryClientV1 } from 'iqs-clients-currdevicestates-node';
import { AttendanceNullClientV1 } from 'iqs-clients-attendance-node';
import { EventGenerationNullClientV1 } from 'iqs-clients-eventgeneration-node';
import { RouteAnalysisNullClientV1 } from 'pip-clients-routeanalysis-node';
import { DataProfilesNullClientV1 } from 'iqs-clients-dataprofiles-node';
import { DeviceProfilesNullClientV1 } from 'iqs-clients-deviceprofiles-node';
import { TransducerDataNullClientV1 } from 'pip-clients-transducerdata-node';

import { StateUpdatesController } from 'iqs-services-stateupdates-node';
import { IStateUpdatesClientV1 } from '../../src/version1/IStateUpdatesClientV1';
import { StateUpdatesDirectClientV1 } from '../../src/version1/StateUpdatesDirectClientV1';
import { StateUpdatesClientFixtureV1 } from './StateUpdatesClientFixtureV1';

suite('StateUpdatesDirectClientV1', ()=> {
    let client: StateUpdatesDirectClientV1;
    let fixture: StateUpdatesClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let controller = new StateUpdatesController();
        let organizationsClient = new OrganizationsMemoryClientV1();
        let devicesClient = new DevicesMemoryClientV1();
        let currentObjectStatesClient = new CurrentObjectStatesMemoryClientV1();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-organizations', 'client', 'memory', 'default', '1.0'), organizationsClient,
            new Descriptor('iqs-services-devices', 'client', 'memory', 'default', '1.0'), devicesClient,
            new Descriptor('iqs-services-attendance', 'client', 'memory', 'default', '1.0'), new AttendanceNullClientV1(),
            new Descriptor('iqs-services-eventgeneration', 'client', 'memory', 'default', '1.0'), new EventGenerationNullClientV1(),
            new Descriptor('pip-services-routeanalysis', 'client', 'memory', 'default', '1.0'), new RouteAnalysisNullClientV1(),
            new Descriptor('iqs-services-controlobjects', 'client', 'memory', 'default', '1.0'), new ControlObjectsMemoryClientV1(),
            new Descriptor('iqs-services-eventrules', 'client', 'memory', 'default', '1.0'), new EventRulesMemoryClientV1(),
            new Descriptor('iqs-services-zones', 'client', 'memory', 'default', '1.0'), new ZonesMemoryClientV1(),
            new Descriptor('iqs-services-objectstates', 'client', 'memory', 'default', '1.0'), new ObjectStatesNullClientV1(),
            new Descriptor('pip-services-positions', 'client', 'memory', 'default', '1.0'), new PositionsNullClientV1(),
            new Descriptor('iqs-services-opevents', 'client', 'null', 'default', '1.0'), new OperationalEventsNullClientV1(),
            new Descriptor('iqs-services-incidents', 'client', 'null', 'default', '1.0'), new IncidentsNullClientV1(),
            new Descriptor('iqs-services-rosters', 'client', 'memory', 'default', '1.0'), new RostersMemoryClientV1(),
            new Descriptor('iqs-services-signals', 'client', 'null', 'default', '1.0'), new SignalsNullClientV1(),
            new Descriptor('iqs-services-dataprofiles', 'client', 'null', 'default', '1.0'), new DataProfilesNullClientV1(),
            new Descriptor('iqs-services-deviceprofiles', 'client', 'null', 'default', '1.0'), new DeviceProfilesNullClientV1(),
            new Descriptor('pip-services-transducerdata', 'client', 'null', 'default', '1.0'), new TransducerDataNullClientV1(),
            new Descriptor('pip-services-statistics', 'client', 'null', 'default', '1.0'), new StatisticsNullClientV1(),
            new Descriptor('pip-services-email', 'client', 'null', 'default', '1.0'), new EmailNullClientV1(),
            new Descriptor('pip-services-sms', 'client', 'null', 'default', '1.0'), new SmsNullClientV1(),
            new Descriptor('iqs-services-currobjectstates', 'client', 'memory', 'default', '1.0'), currentObjectStatesClient,
            new Descriptor('iqs-services-currdevicestates', 'client', 'memory', 'default', '1.0'), new CurrentDeviceStatesMemoryClientV1(),
            new Descriptor('iqs-services-stateupdates', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);
        
        client = new StateUpdatesDirectClientV1();
        client.setReferences(references);

        fixture = new StateUpdatesClientFixtureV1(client, organizationsClient, devicesClient, currentObjectStatesClient);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    // Invalidate state doesn't exist in iqs-services-stateupdates
    // test('Invalidate State', (done) => {
    //     fixture.testInvalidateState(done);
    // });

});
