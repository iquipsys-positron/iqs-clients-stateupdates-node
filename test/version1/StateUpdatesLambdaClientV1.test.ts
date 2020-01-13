let process = require('process');

import { ConfigParams } from 'pip-services3-commons-node';

import { OrganizationsMemoryClientV1 } from 'pip-clients-organizations-node';
import { DevicesMemoryClientV1 } from 'iqs-clients-devices-node';
import { CurrentObjectStatesMemoryClientV1 } from 'iqs-clients-currobjectstates-node';
import { StateUpdatesClientFixtureV1 } from './StateUpdatesClientFixtureV1';
import { StateUpdatesLambdaClientV1 } from '../../src/version1/StateUpdatesLambdaClientV1';

suite('StateUpdatesLambdaClient', ()=> {
    let AWS_LAMDBA_ARN = process.env["AWS_LAMDBA_ARN"] || "";
    let AWS_ACCESS_ID = process.env["AWS_ACCESS_ID"] || "";
    let AWS_ACCESS_KEY = process.env["AWS_ACCESS_KEY"] || "";

    if (!AWS_LAMDBA_ARN || !AWS_ACCESS_ID || !AWS_ACCESS_KEY)
        return;

    let config = ConfigParams.fromTuples(
        "lambda.connection.protocol", "aws",
        "lambda.connection.arn", AWS_LAMDBA_ARN,
        "lambda.credential.access_id", AWS_ACCESS_ID,
        "lambda.credential.access_key", AWS_ACCESS_KEY,
        "lambda.options.connection_timeout", 30000
    );
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: StateUpdatesLambdaClientV1;
    let fixture: StateUpdatesClientFixtureV1;

    setup((done) => {
        let organizationsClient = new OrganizationsMemoryClientV1();
        let devicesClient = new DevicesMemoryClientV1();
        let currentStatesClient = new CurrentObjectStatesMemoryClientV1();

        client = new StateUpdatesLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new StateUpdatesClientFixtureV1(client, organizationsClient, devicesClient, currentStatesClient);

        client.open(null, done);
    });

    teardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});