import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Comptroller from "../src/Comptroller";

chai.use(chaiAsPromised);
const { expect } = chai;

const comptrollerAddress = '0xeaa28bc9D395a92da610cDdD689eD11643968175';

describe('Comptroller', () => {
    const tropykus = new Tropykus('http://localhost:8545');

    it('should instance a comptroller handler', () => {
        tropykus.setComptroller(comptrollerAddress);
        expect(tropykus.comptroller).instanceOf(Comptroller);
    });
    it('should generate an account', () => {
        tropykus.setAccount('elegant ripple curve exhibit capital oblige off inform recall describe warrior earn');
        expect(tropykus.account.address.toLowerCase()).equals('0xe317349c7279ffF242cc8ADCb575EbA0153760BA'.toLowerCase());
    });
    it('should list the markets', () => {
        tropykus.setComptroller(comptrollerAddress);
        return tropykus.comptroller.allMarkets()
            .then((markets) => markets.forEach((market) => expect(market).to.match(/0x[a-fA-F0-9]{40}/)));
    });
    it('should enter the markets', async () => {
        tropykus.setComptroller(comptrollerAddress);
        tropykus.setAccount('elegant ripple curve exhibit capital oblige off inform recall describe warrior earn');

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
});
