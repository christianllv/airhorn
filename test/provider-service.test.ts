import {ProviderService} from '../src/provider-service';
import {ProviderType} from '../src/provider-type';
import {WebHook} from '../src/providers/webhook';

test('Provider Service Init', () => {
	const providerService = new ProviderService();

	expect(providerService).toEqual(new ProviderService());
});

test('Provider Service - Options', () => {
	const options = {templatePath: './test/templates/'};
	const providerService = new ProviderService(options);

	expect(providerService.config.templatePath).toEqual(options.templatePath);
});

test('Provider Service - Get Providers', () => {
	const providerService = new ProviderService();

	expect(providerService.providers.length).toEqual(0);
});

test('Provider Service - Get SMS Providers', () => {
	const providerService = new ProviderService();

	expect(providerService.sms).toEqual([]);
});

test('Provider Service - Get smtp Provider', () => {
	const providerService = new ProviderService();

	expect(providerService.smtp).toEqual([]);
});

test('Provider Service - Get webhook Provider', () => {
	const providerService = new ProviderService();

	expect(providerService.webhook).toEqual([]);
});

test('Provider Service - Get mobilePush Provider', () => {
	const providerService = new ProviderService();

	expect(providerService.mobilePush).toEqual([]);
});

test('Provider Service - Get Provider By Type With No Result', () => {
	const providerService = new ProviderService();
	const webHook = new WebHook();

	providerService.addProvider(webHook);

	expect(providerService.getProviderByType(ProviderType.SMS).length).toEqual(0);
});

test('Provider Service - Get Provider By Type', () => {
	const providerService = new ProviderService();
	const webHook = new WebHook();

	providerService.addProvider(webHook);

	expect(providerService.getProviderByType(ProviderType.WEBHOOK).length).toEqual(1);
});

test('Provider Service - Add Provider', () => {
	const providerService = new ProviderService();
	const webHook = new WebHook();

	providerService.addProvider(webHook);

	expect(providerService.providers.length).toEqual(1);
});

test('Provider Service - Add Provider Exists', () => {
	const providerService = new ProviderService();
	const webHook = new WebHook();

	providerService.addProvider(webHook);

	expect(() => {
		providerService.addProvider(webHook);
	}).toThrowError('Provider webhook already exists');

	expect(providerService.providers.length).toEqual(1);
});

test('Provider Service - Remove Provider', () => {
	const providerService = new ProviderService();
	const webHook = new WebHook();

	providerService.addProvider(webHook);

	expect(providerService.providers.length).toEqual(1);

	providerService.removeProvider('webhook');

	expect(providerService.providers.length).toEqual(0);
});

test('Provider Service - Remove Provider Does Not Exist', () => {
	const providerService = new ProviderService();
	const webHook = new WebHook();

	providerService.addProvider(webHook);

	expect(providerService.providers.length).toEqual(1);

	providerService.removeProvider('sms');

	expect(providerService.providers.length).toEqual(1);
});

test('Provider Service - Update Provider', () => {
	const providerService = new ProviderService();
	const webHook = new WebHook();

	providerService.addProvider(webHook);

	providerService.updateProvider(webHook);

	expect(providerService.providers.length).toEqual(1);
});

test('Provider Service - Update Provider Does Not Exist', () => {
	const providerService = new ProviderService();
	const webHook = new WebHook();

	providerService.updateProvider(webHook);

	expect(providerService.providers.length).toEqual(1);
});
