import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Comptroller from "../src/Comptroller";

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Comptroller', () => {
    const tropykus = new Tropykus('https://rsktestnet.tropykus.finance/rsk');

    it('should instance a comptroller handler', () => {
        tropykus.setComptroller('0x4c21b88ab766adbc3a858b83f447ba7dc83b6ae4');
        expect(tropykus.comptroller).instanceOf(Comptroller);
    });
    it('should list the markets', () => {
        // tropykus.setComptroller('0x4c21b88ab766adbc3a858b83f447ba7dc83b6ae4');
        return tropykus.comptroller.allMarkets()
            .then((markets) => markets.forEach((market) => expect(market).to.match(/0x[a-fA-F0-9]{40}/)));
    });
});
