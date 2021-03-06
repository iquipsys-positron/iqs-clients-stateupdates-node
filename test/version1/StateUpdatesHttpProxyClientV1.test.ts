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
import { ClusterV1 } from 'pip-clients-clusters-node';
import { ClustersMemoryClientV1 } from 'pip-clients-clusters-node';

import { StateUpdatesController } from 'iqs-services-stateupdates-node';
import { StateUpdatesHttpServiceV1 } from 'iqs-services-stateupdates-node';
import { IStateUpdatesClientV1 } from '../../src/version1/IStateUpdatesClientV1';
import { StateUpdatesHttpProxyClientV1 } from '../../src/version1/StateUpdatesHttpProxyClientV1';
import { StateUpdatesClientFixtureV1 } from './StateUpdatesClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);
var CLUSTER: ClusterV1 = {
    id: '1',
    name: 'test',
    type: 'organizations',
    active: true,
    api_host: 'localhost',
    service_ports: { 
        'iqs-services-stateupdates': 3000 
    },
    active_tenants: ['1']
}

suite('StateUpdatesHttpProxyClientV1', ()=> {
    let service: StateUpdatesHttpServiceV1;
    let client: StateUpdatesHttpProxyClientV1;
    let fixture: StateUpdatesClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let controller = new StateUpdatesController();
        let organizationsClient = new OrganizationsMemoryClientV1();
        let devicesClient = new DevicesMemoryClientV1();
        let currentStatesClient = new CurrentObjectStatesMemoryClientV1();

        let clustersClient = new ClustersMemoryClientV1();
        clustersClient.createCluster(null, CLUSTER, (err, cluster) => {});        

        service = new StateUpdatesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-organizations', 'client', 'memory', 'default', '1.0'), organizationsClient,
            new Descriptor('iqs-services-devices', 'client', 'memory', 'default', '1.0'), devicesClient,
            new Descriptor('iqs-services-attendance', 'client', 'null', 'default', '1.0'), new AttendanceNullClientV1(),
            new Descriptor('iqs-services-eventgeneration', 'client', 'null', 'default', '1.0'), new EventGenerationNullClientV1(),
            new Descriptor('pip-services-routeanalysis', 'client', 'null', 'default', '1.0'), new RouteAnalysisNullClientV1(),
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
            new Descriptor('iqs-services-currobjectstates', 'client', 'memory', 'default', '1.0'), currentStatesClient,
            new Descriptor('iqs-services-currdevicestates', 'client', 'memory', 'default', '1.0'), new CurrentDeviceStatesMemoryClientV1(),
            new Descriptor('pip-services-clusters', 'client', 'memory', 'default', '1.0'), clustersClient,
            new Descriptor('iqs-services-stateupdates', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('iqs-services-stateupdates', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new StateUpdatesHttpProxyClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new StateUpdatesClientFixtureV1(client, organizationsClient, devicesClient, currentStatesClient);

        service.open(null, (err) => {
            done(err);
        });
    });
    
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    // Invalidate state doesn't exist in iqs-services-stateupdates
    // test('Invalidate State', (done) => {
    //     fixture.testInvalidateState(done);
    // });
    
});
