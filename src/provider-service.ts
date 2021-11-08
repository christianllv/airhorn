import {Config} from './config';
import {ProviderInterface} from './provider-interface';
import {ProviderType} from './provider-type';

export class ProviderService {
	config = new Config();
	private readonly _providers = new Array<ProviderInterface>();

	constructor(options?: any) {
		if (options) {
			this.config = new Config(options);
		}
	}

	public get providers(): ProviderInterface[] {
		return this._providers;
	}

	public get sms(): ProviderInterface[] {
		return this.getProviderByType(ProviderType.SMS);
	}

	public get smtp(): ProviderInterface[] {
		return this.getProviderByType(ProviderType.SMTP);
	}

	public get webhook(): ProviderInterface[] {
		return this.getProviderByType(ProviderType.WEBHOOK);
	}

	public get mobilePush(): ProviderInterface[] {
		return this.getProviderByType(ProviderType.MOBILE_PUSH);
	}

	public getProviderByType(type: ProviderType): ProviderInterface[] {
		let result: ProviderInterface[] = [];
		const provider = this._providers.filter(provider => provider.type === type);

		if (provider.length > 0) {
			result = provider;
		}

		return result;
	}

	public removeProvider(name: string) {
		const index = this._providers.findIndex(provider => provider.name === name);

		if (index > -1) {
			this._providers.splice(index, 1);
		}
	}

	public addProvider(provider: ProviderInterface) {
		if (this.providerExists(provider.name)) {
			throw new Error(`Provider ${provider.name} already exists`);
		} else {
			this._providers.push(provider);
		}
	}

	public providerExists(name: string): boolean {
		return this.getProvider(name) !== undefined;
	}

	public updateProvider(provider: ProviderInterface) {
		if (this.providerExists(provider.name)) {
			this.removeProvider(provider.name);
		}

		this.addProvider(provider);
	}

	public getProvider(name: string): ProviderInterface | undefined {
		let result: ProviderInterface | undefined;

		for (const provider of this._providers) {
			if (provider.name === name) {
				result = provider;
				break;
			}
		}

		return result;
	}
}