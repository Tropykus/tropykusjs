import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Comptroller from "../src/Comptroller";
import Market from '../src/Market';
import CRBTCMarket from '../src/Markets/CRBTCMarket';
import CTokenMarket from '../src/Markets/CTokenMarket';

chai.use(chaiAsPromised);
const { expect } = chai;

const mnemonic = 'elegant ripple curve exhibit capital oblige off inform recall describe warrior earn';

const comptrollerAddress = '0xB173b5EE67b9F38263413Bc29440f89cC5BC3C39';
const crbtcMarketAddress = '0xE498D1E3A0d7fdb80a2d7591D997aFDA34F8c5C5';
const cdocAddress = '0x1CbD672Ac9d98F4f033e12eDE3c55f5CB02B983C';


describe('Comptroller', () => {
    const tropykus = new Tropykus('http://localhost:8545');

    it.skip('should generate an account', async () => {
        tropykus.setAccount(mnemonic);
        expect(tropykus.account.address.toLowerCase()).equals('0xe317349c7279ffF242cc8ADCb575EbA0153760BA'.toLowerCase());
    });

    it.skip('should instance a comptroller handler', async () => {
        tropykus.setComptroller(comptrollerAddress);
        expect(tropykus.comptroller).instanceOf(Comptroller);
    });

    it('should instance a CRBTC Market', async () => {
        tropykus.setMarket(crbtcMarketAddress);
        expect(tropykus.market).instanceOf(CRBTCMarket);
    })

    it('should instance a CTocken Market', async () => {
        tropykus.setMarket(cdocAddress, false);
        expect(tropykus.market).instanceOf(CTokenMarket);
    });

    it.skip('should list the markets', async () => {
        tropykus.setComptroller(comptrollerAddress);
        return tropykus.comptroller.allMarkets()
            .then((markets) => markets.forEach((market) => expect(market).to.match(/0x[a-fA-F0-9]{40}/)));
    });

    it.skip('should enter the markets', async () => {
        tropykus.setComptroller(comptrollerAddress);
        tropykus.setAccount(mnemonic);

        let assetsIn = await tropykus.comptroller.getAssetsIn(tropykus.account);
        expect(assetsIn.length).equals(0);

        const markets = await tropykus.comptroller.allMarkets();
        await tropykus.comptroller.enterMarkets(tropykus.account, markets);

        assetsIn = await tropykus.comptroller.getAssetsIn(tropykus.account);
        expect(assetsIn.length).equals(markets.length);
        assetsIn.forEach((asset, idx) => {
            expect(asset).equals(markets[idx]);
        });
    });

    it('should deposit in the crbtc market', async () => {
        tropykus.setComptroller(comptrollerAddress);
        tropykus.setAccount(mnemonic);

        const markets = await tropykus.comptroller.allMarkets();
        await tropykus.comptroller.enterMarkets(tropykus.account, markets);

        tropykus.setMarket(crbtcMarketAddress);

        await tropykus.market.mint(tropykus.account, '1000');
        console.log('Balance in crbtc market:', (await tropykus.market.balanceOfUnderlying(tropykus.account)).toString());
    });

    it.skip('should deposit in any token market', async () => {
        tropykus.setComptroller(comptrollerAddress);
        tropykus.setAccount(mnemonic);

        const markets = await tropykus.comptroller.allMarkets();
        await tropykus.comptroller.enterMarkets(tropykus.account, markets);

        const crbtc = new Market(tropykus.ethersProvider);
        crbtc.setMarket(crbtcMarketAddress, false);

        await crbtc.mint(tropykus.account, '1000');
        console.log((await crbtc.balanceOfUnderlying(tropykus.account)).toString());
    });
});
