import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from 'pip-services3-components-node';

import { StateUpdatesNullClientV1 } from '../version1/StateUpdatesNullClientV1';
import { StateUpdatesDirectClientV1 } from '../version1/StateUpdatesDirectClientV1';
import { StateUpdatesHttpClientV1 } from '../version1/StateUpdatesHttpClientV1';
import { StateUpdatesLambdaClientV1 } from '../version1/StateUpdatesLambdaClientV1';
import { StateUpdatesHttpProxyClientV1 } from '../version1/StateUpdatesHttpProxyClientV1';

export class StateUpdatesClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('iqs-services-stateupdates', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('iqs-services-stateupdates', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('iqs-services-stateupdates', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('iqs-services-stateupdates', 'client', 'http', 'default', '1.0');
	public static LambdaClientV1Descriptor = new Descriptor('iqs-services-stateupdates', 'client', 'lambda', 'default', '1.0');
	public static HttpProxyClientV1Descriptor = new Descriptor('iqs-services-stateupdates', 'client', 'http-proxy', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(StateUpdatesClientFactory.NullClientV1Descriptor, StateUpdatesNullClientV1);
		this.registerAsType(StateUpdatesClientFactory.DirectClientV1Descriptor, StateUpdatesDirectClientV1);
		this.registerAsType(StateUpdatesClientFactory.HttpClientV1Descriptor, StateUpdatesHttpClientV1);
		this.registerAsType(StateUpdatesClientFactory.LambdaClientV1Descriptor, StateUpdatesLambdaClientV1);
		this.registerAsType(StateUpdatesClientFactory.HttpProxyClientV1Descriptor, StateUpdatesHttpProxyClientV1);
	}
	
}
