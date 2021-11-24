import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Comptroller from "../src/Comptroller";

chai.use(chaiAsPromised);
const { expect } = chai;

const mnemonic = 'elegant ripple curve exhibit capital oblige off inform recall describe warrior earn';
const derivationPath = `m/44'/60'/0'/0/0`;

const comptrollerAddress = '0xB173b5EE67b9F38263413Bc29440f89cC5BC3C39';
const priceOracleAddress = '0x4d7Cc3cdb88Fa1EEC3095C9f849c799F1f7D4031';


describe('Comptroller', () => {
    let tropykus;
    let comptroller;
    beforeEach(async () => {
        tropykus = new Tropykus('http://localhost:8545', 400000);
        await tropykus.setPriceOracle(priceOracleAddress);
        await tropykus.setAccount(mnemonic, derivationPath);
    });

    it('should instance a comptroller handler', async () => {
        comptroller = await tropykus.setComptroller(comptrollerAddress);
        expect(comptroller).instanceOf(Comptroller);
    });

    it('should list the markets', async () => {
        comptroller = await tropykus.setComptroller(comptrollerAddress);
        return comptroller.allMarkets()
            .then((markets) => markets.forEach((market) => expect(market).to.match(/0x[a-fA-F0-9]{40}/)));
    });

    it('should enter the markets', async () => {
        comptroller = await tropykus.setComptroller(
          null,
          false,
          {
              priceOracleAddress: tropykus.priceOracle.address,
              closeFactor: 0.5,
              liquidationIncentive: 0.07,
              markets: [
                  '0x8bfFbbC868Fe8347d1aC938527b9e56b2e1db761',
                  '0x1CbD672Ac9d98F4f033e12eDE3c55f5CB02B983C',
                  '0x1a389e93be8ef2B5D105DEa44271d4426736A484',
                  '0x42352e16C69DD08Ee207CD47ff443BbC720110c7',
                  '0xE498D1E3A0d7fdb80a2d7591D997aFDA34F8c5C5',
                  '0xf8A2e7A2bfa135a81f0c78edD6252a818619E2c3',
              ],
          });

        let assetsIn = await comptroller.getAssetsIn(tropykus.account);
        expect(assetsIn.length).equals(0);

        const markets = await comptroller.allMarkets();
        await comptroller.enterMarkets(tropykus.account, markets);

        assetsIn = await comptroller.getAssetsIn(tropykus.account);
        expect(assetsIn.length).equals(markets.length);
        assetsIn.forEach((asset, idx) => {
            expect(asset).equals(markets[idx]);
        });
    });
});
