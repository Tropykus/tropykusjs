import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Comptroller from "../src/Comptroller";

chai.use(chaiAsPromised);
const { expect } = chai;

const mnemonic = 'elegant ripple curve exhibit capital oblige off inform recall describe warrior earn';
const derivationPath = `m/44'/60'/0'/0/0`;

const comptrollerAddress = '0xB173b5EE67b9F38263413Bc29440f89cC5BC3C39';


describe('Comptroller', () => {
    let tropykus;
    beforeEach(async () => {
        tropykus = new Tropykus('http://localhost:8545', 400000);
        await tropykus.setAccount(mnemonic, derivationPath);
    });

    it('should instance a comptroller handler', async () => {
        tropykus.setComptroller(comptrollerAddress);
        expect(tropykus.comptroller).instanceOf(Comptroller);
    });

    it('should list the markets', async () => {
        tropykus.setComptroller(comptrollerAddress);
        return tropykus.comptroller.allMarkets()
            .then((markets) => markets.forEach((market) => expect(market).to.match(/0x[a-fA-F0-9]{40}/)));
    });

    it('should enter the markets', async () => {
        tropykus.setComptroller(comptrollerAddress);

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
