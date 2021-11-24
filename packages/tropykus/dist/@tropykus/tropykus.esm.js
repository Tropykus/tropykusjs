import { ethers, Wallet } from 'ethers';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var _format$6 = "hh-sol-artifact-1";
var contractName$6 = "ComptrollerG6";
var sourceName$6 = "contracts/ComptrollerG6.sol";
var abi$6 = [
	{
		inputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "string",
				name: "action",
				type: "string"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "pauseState",
				type: "bool"
			}
		],
		name: "ActionPaused",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: false,
				internalType: "string",
				name: "action",
				type: "string"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "pauseState",
				type: "bool"
			}
		],
		name: "ActionPaused",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "CompGranted",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newSpeed",
				type: "uint256"
			}
		],
		name: "CompSpeedUpdated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "contributor",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newSpeed",
				type: "uint256"
			}
		],
		name: "ContributorCompSpeedUpdated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "compDelta",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "compBorrowIndex",
				type: "uint256"
			}
		],
		name: "DistributedBorrowerComp",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "supplier",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "compDelta",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "compSupplyIndex",
				type: "uint256"
			}
		],
		name: "DistributedSupplierComp",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "error",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "info",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "detail",
				type: "uint256"
			}
		],
		name: "Failure",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "isComped",
				type: "bool"
			}
		],
		name: "MarketComped",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "MarketEntered",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "MarketExited",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			}
		],
		name: "MarketListed",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newBorrowCap",
				type: "uint256"
			}
		],
		name: "NewBorrowCap",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldBorrowCapGuardian",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newBorrowCapGuardian",
				type: "address"
			}
		],
		name: "NewBorrowCapGuardian",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "oldCloseFactorMantissa",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newCloseFactorMantissa",
				type: "uint256"
			}
		],
		name: "NewCloseFactor",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "oldCollateralFactorMantissa",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newCollateralFactorMantissa",
				type: "uint256"
			}
		],
		name: "NewCollateralFactor",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "oldCompRate",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newCompRate",
				type: "uint256"
			}
		],
		name: "NewCompRate",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "oldLiquidationIncentiveMantissa",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newLiquidationIncentiveMantissa",
				type: "uint256"
			}
		],
		name: "NewLiquidationIncentive",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldPauseGuardian",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newPauseGuardian",
				type: "address"
			}
		],
		name: "NewPauseGuardian",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract PriceOracle",
				name: "oldPriceOracle",
				type: "address"
			},
			{
				indexed: false,
				internalType: "contract PriceOracle",
				name: "newPriceOracle",
				type: "address"
			}
		],
		name: "NewPriceOracle",
		type: "event"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address[]",
				name: "cTokens",
				type: "address[]"
			}
		],
		name: "_addCompMarkets",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract Unitroller",
				name: "unitroller",
				type: "address"
			}
		],
		name: "_become",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "_borrowGuardianPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			}
		],
		name: "_dropCompMarket",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "_grantComp",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "_mintGuardianPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "newBorrowCapGuardian",
				type: "address"
			}
		],
		name: "_setBorrowCapGuardian",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "bool",
				name: "state",
				type: "bool"
			}
		],
		name: "_setBorrowPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "newCloseFactorMantissa",
				type: "uint256"
			}
		],
		name: "_setCloseFactor",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "newCollateralFactorMantissa",
				type: "uint256"
			}
		],
		name: "_setCollateralFactor",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "compRate_",
				type: "uint256"
			}
		],
		name: "_setCompRate",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "contributor",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "compSpeed",
				type: "uint256"
			}
		],
		name: "_setContributorCompSpeed",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "newLiquidationIncentiveMantissa",
				type: "uint256"
			}
		],
		name: "_setLiquidationIncentive",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract CToken[]",
				name: "cTokens",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "newBorrowCaps",
				type: "uint256[]"
			}
		],
		name: "_setMarketBorrowCaps",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "bool",
				name: "state",
				type: "bool"
			}
		],
		name: "_setMintPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "newPauseGuardian",
				type: "address"
			}
		],
		name: "_setPauseGuardian",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract PriceOracle",
				name: "newOracle",
				type: "address"
			}
		],
		name: "_setPriceOracle",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bool",
				name: "state",
				type: "bool"
			}
		],
		name: "_setSeizePaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bool",
				name: "state",
				type: "bool"
			}
		],
		name: "_setTransferPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			}
		],
		name: "_supportMarket",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "accountAssets",
		outputs: [
			{
				internalType: "contract CToken",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "admin",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "allMarkets",
		outputs: [
			{
				internalType: "contract CToken",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "borrowAmount",
				type: "uint256"
			}
		],
		name: "borrowAllowed",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "borrowCapGuardian",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "borrowCaps",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "borrowGuardianPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "borrowAmount",
				type: "uint256"
			}
		],
		name: "borrowVerify",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			}
		],
		name: "checkMembership",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "holder",
				type: "address"
			},
			{
				internalType: "contract CToken[]",
				name: "cTokens",
				type: "address[]"
			}
		],
		name: "claimComp",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address[]",
				name: "holders",
				type: "address[]"
			},
			{
				internalType: "contract CToken[]",
				name: "cTokens",
				type: "address[]"
			},
			{
				internalType: "bool",
				name: "borrowers",
				type: "bool"
			},
			{
				internalType: "bool",
				name: "suppliers",
				type: "bool"
			}
		],
		name: "claimComp",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "holder",
				type: "address"
			}
		],
		name: "claimComp",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "closeFactorMantissa",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "compAccrued",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "compBorrowState",
		outputs: [
			{
				internalType: "uint224",
				name: "index",
				type: "uint224"
			},
			{
				internalType: "uint32",
				name: "block",
				type: "uint32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "compBorrowerIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "compClaimThreshold",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "compContributorSpeeds",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "compInitialIndex",
		outputs: [
			{
				internalType: "uint224",
				name: "",
				type: "uint224"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "compRate",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "compSpeeds",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "compSupplierIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "compSupplyState",
		outputs: [
			{
				internalType: "uint224",
				name: "index",
				type: "uint224"
			},
			{
				internalType: "uint32",
				name: "block",
				type: "uint32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "comptrollerImplementation",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address[]",
				name: "cTokens",
				type: "address[]"
			}
		],
		name: "enterMarkets",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cTokenAddress",
				type: "address"
			}
		],
		name: "exitMarket",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "getAccountLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getAllMarkets",
		outputs: [
			{
				internalType: "contract CToken[]",
				name: "",
				type: "address[]"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "getAssetsIn",
		outputs: [
			{
				internalType: "contract CToken[]",
				name: "",
				type: "address[]"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getBlockNumber",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getCompAddress",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				internalType: "address",
				name: "cTokenModify",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "redeemTokens",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "borrowAmount",
				type: "uint256"
			}
		],
		name: "getHypotheticalAccountLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "isComptroller",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "lastContributorBlock",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cTokenBorrowed",
				type: "address"
			},
			{
				internalType: "address",
				name: "cTokenCollateral",
				type: "address"
			},
			{
				internalType: "address",
				name: "liquidator",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "repayAmount",
				type: "uint256"
			}
		],
		name: "liquidateBorrowAllowed",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cTokenBorrowed",
				type: "address"
			},
			{
				internalType: "address",
				name: "cTokenCollateral",
				type: "address"
			},
			{
				internalType: "address",
				name: "liquidator",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "actualRepayAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "seizeTokens",
				type: "uint256"
			}
		],
		name: "liquidateBorrowVerify",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "cTokenBorrowed",
				type: "address"
			},
			{
				internalType: "address",
				name: "cTokenCollateral",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "actualRepayAmount",
				type: "uint256"
			}
		],
		name: "liquidateCalculateSeizeTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "liquidationIncentiveMantissa",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "markets",
		outputs: [
			{
				internalType: "bool",
				name: "isListed",
				type: "bool"
			},
			{
				internalType: "uint256",
				name: "collateralFactorMantissa",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "isComped",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "maxAssets",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "minter",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "mintAmount",
				type: "uint256"
			}
		],
		name: "mintAllowed",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "mintGuardianPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "minter",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "actualMintAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "mintTokens",
				type: "uint256"
			}
		],
		name: "mintVerify",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "oracle",
		outputs: [
			{
				internalType: "contract PriceOracle",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "pauseGuardian",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "pendingAdmin",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "pendingComptrollerImplementation",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "redeemer",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "redeemTokens",
				type: "uint256"
			}
		],
		name: "redeemAllowed",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "redeemer",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "redeemAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "redeemTokens",
				type: "uint256"
			}
		],
		name: "redeemVerify",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "refreshCompSpeeds",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "payer",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "repayAmount",
				type: "uint256"
			}
		],
		name: "repayBorrowAllowed",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "payer",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "actualRepayAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "borrowerIndex",
				type: "uint256"
			}
		],
		name: "repayBorrowVerify",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cTokenCollateral",
				type: "address"
			},
			{
				internalType: "address",
				name: "cTokenBorrowed",
				type: "address"
			},
			{
				internalType: "address",
				name: "liquidator",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "seizeTokens",
				type: "uint256"
			}
		],
		name: "seizeAllowed",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "seizeGuardianPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cTokenCollateral",
				type: "address"
			},
			{
				internalType: "address",
				name: "cTokenBorrowed",
				type: "address"
			},
			{
				internalType: "address",
				name: "liquidator",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "seizeTokens",
				type: "uint256"
			}
		],
		name: "seizeVerify",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "src",
				type: "address"
			},
			{
				internalType: "address",
				name: "dst",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "transferTokens",
				type: "uint256"
			}
		],
		name: "transferAllowed",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "transferGuardianPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "src",
				type: "address"
			},
			{
				internalType: "address",
				name: "dst",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "transferTokens",
				type: "uint256"
			}
		],
		name: "transferVerify",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "tropAddress",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "contributor",
				type: "address"
			}
		],
		name: "updateContributorRewards",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	}
];
var bytecode$6 = "0x608060405234801561001057600080fd5b50600080546001600160a01b03191633179055615ac280620000336000396000f3fe608060405234801561001057600080fd5b506004361061047f5760003560e01c80636d35bf9111610257578063bb82aa5e11610146578063da3d454c116100c3578063e875544611610087578063e8755446146112f4578063e9af0292146112fc578063eabe7d9114611322578063ede4edd014611358578063f851a4401461137e5761047f565b8063da3d454c14611256578063dce154491461128c578063dcfbc0c7146112b8578063e4028eee146112c0578063e6653f3d146112ec5761047f565b8063ca0af0431161010a578063ca0af04314611113578063cc7ebdc414611141578063ce485c5e14611167578063d02f735114611208578063d9bbdf381461124e5761047f565b8063bb82aa5e14610fb9578063bdcdc25814610fc1578063bea6b8b814610ffd578063c299823814611023578063c488847b146110c45761047f565b806394b2294b116101d4578063aa90075411610198578063aa90075414610efd578063abfceffc14610f05578063ac0b0bb714610f7b578063b0772d0b14610f83578063b21be7fd14610f8b5761047f565b806394b2294b14610e7d578063986ab83814610e855780639d1b5a0a14610eab578063a76b3fda14610eb3578063a7f0e23114610ed95761047f565b806387f763031161021b57806387f7630314610dba5780638c57804e14610dc25780638e8f294b14610de85780638ebf636414610e30578063929fe9a114610e4f5761047f565b80636d35bf9114610d18578063731f0c2b14610d5e578063741b252514610d84578063747026c914610daa5780637dc0d1d014610db25761047f565b80634a584432116103735780635c778605116102f05780636810dfa6116102b45780636810dfa614610b1f5780636a49111214610c4b5780636a56947e14610c685780636b79c38d14610ca45780636d154ea514610cf25761047f565b80635c778605146109995780635ec88c79146109cf5780635f5af1aa146109f55780635fc7e71e14610a1b578063607ef6c114610a615761047f565b80634fd42e17116103375780634fd42e17146108d157806351dff989146108ee57806352d84d1e1461092a57806355ee1fe114610947578063598ee1cb1461096d5761047f565b80634a5844321461080b5780634ada90af146108315780634d8e5037146108395780634e79238f146108415780634ef4c3e11461089b5761047f565b806327efe3cb116104015780633bcf7ec1116103c55780633bcf7ec1146107455780633c94786f1461077357806341c728b91461077b57806342cbb15c146107b757806347ef3b3b146107bf5761047f565b806327efe3cb146106915780632d70db78146106bd578063317b0b77146106dc578063391957d7146106f95780633aa729b41461071f5761047f565b80631ededc91116104485780631ededc91146105df57806321af45691461062157806324008a621461064557806324a3d6221461068157806326782247146106895761047f565b80627e3dd21461048457806318c882a5146104a05780631c3db2e0146104ce5780631d504dc6146105815780631d7b33d7146105a7575b600080fd5b61048c611386565b604080519115158252519081900360200190f35b61048c600480360360408110156104b657600080fd5b506001600160a01b038135169060200135151561138b565b61057f600480360360408110156104e457600080fd5b6001600160a01b038235169190810190604081016020820135600160201b81111561050e57600080fd5b82018360208201111561052057600080fd5b803590602001918460208302840111600160201b8311171561054157600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550611510945050505050565b005b61057f6004803603602081101561059757600080fd5b50356001600160a01b0316611572565b6105cd600480360360208110156105bd57600080fd5b50356001600160a01b03166116bb565b60408051918252519081900360200190f35b61057f600480360360a08110156105f557600080fd5b506001600160a01b038135811691602081013582169160408201351690606081013590608001356116cd565b6106296116d4565b604080516001600160a01b039092168252519081900360200190f35b6105cd6004803603608081101561065b57600080fd5b506001600160a01b038135811691602081013582169160408201351690606001356116e3565b6106296117ac565b6106296117bb565b61057f600480360360408110156106a757600080fd5b506001600160a01b0381351690602001356117ca565b61048c600480360360208110156106d357600080fd5b503515156118cd565b6105cd600480360360208110156106f257600080fd5b50356119f0565b61057f6004803603602081101561070f57600080fd5b50356001600160a01b0316611a9d565b61057f6004803603602081101561073557600080fd5b50356001600160a01b0316611b45565b61048c6004803603604081101561075b57600080fd5b506001600160a01b0381351690602001351515611c42565b61048c611dc2565b61057f6004803603608081101561079157600080fd5b506001600160a01b03813581169160208101359091169060408101359060600135611dd2565b6105cd611dd8565b61057f600480360360c08110156107d557600080fd5b506001600160a01b0381358116916020810135821691604082013581169160608101359091169060808101359060a00135611ddd565b6105cd6004803603602081101561082157600080fd5b50356001600160a01b0316611de5565b6105cd611df7565b61057f611dfd565b61087d6004803603608081101561085757600080fd5b506001600160a01b03813581169160208101359091169060408101359060600135611e41565b60408051938452602084019290925282820152519081900360600190f35b6105cd600480360360608110156108b157600080fd5b506001600160a01b03813581169160208101359091169060400135611e7b565b6105cd600480360360208110156108e757600080fd5b5035611f17565b61057f6004803603608081101561090457600080fd5b506001600160a01b03813581169160208101359091169060408101359060600135611f87565b6106296004803603602081101561094057600080fd5b5035611fcc565b6105cd6004803603602081101561095d57600080fd5b50356001600160a01b0316611ff3565b61057f6004803603604081101561098357600080fd5b506001600160a01b038135169060200135612078565b61057f600480360360608110156109af57600080fd5b506001600160a01b03813581169160208101359091169060400135612163565b61087d600480360360208110156109e557600080fd5b50356001600160a01b0316612168565b6105cd60048036036020811015610a0b57600080fd5b50356001600160a01b031661219d565b6105cd600480360360a0811015610a3157600080fd5b506001600160a01b0381358116916020810135821691604082013581169160608101359091169060800135612221565b61057f60048036036040811015610a7757600080fd5b810190602081018135600160201b811115610a9157600080fd5b820183602082011115610aa357600080fd5b803590602001918460208302840111600160201b83111715610ac457600080fd5b919390929091602081019035600160201b811115610ae157600080fd5b820183602082011115610af357600080fd5b803590602001918460208302840111600160201b83111715610b1457600080fd5b509092509050612386565b61057f60048036036080811015610b3557600080fd5b810190602081018135600160201b811115610b4f57600080fd5b820183602082011115610b6157600080fd5b803590602001918460208302840111600160201b83111715610b8257600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b811115610bd157600080fd5b820183602082011115610be357600080fd5b803590602001918460208302840111600160201b83111715610c0457600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550505050803515159150602001351515612508565b61057f60048036036020811015610c6157600080fd5b50356126b1565b61057f60048036036080811015610c7e57600080fd5b506001600160a01b03813581169160208101358216916040820135169060600135611dd2565b610cca60048036036020811015610cba57600080fd5b50356001600160a01b031661273b565b604080516001600160e01b03909316835263ffffffff90911660208301528051918290030190f35b61048c60048036036020811015610d0857600080fd5b50356001600160a01b0316612765565b61057f600480360360a0811015610d2e57600080fd5b506001600160a01b03813581169160208101358216916040820135811691606081013590911690608001356116cd565b61048c60048036036020811015610d7457600080fd5b50356001600160a01b031661277a565b61057f60048036036020811015610d9a57600080fd5b50356001600160a01b031661278f565b6105cd612852565b61062961285d565b61048c61286c565b610cca60048036036020811015610dd857600080fd5b50356001600160a01b031661287c565b610e0e60048036036020811015610dfe57600080fd5b50356001600160a01b03166128a6565b6040805193151584526020840192909252151582820152519081900360600190f35b61048c60048036036020811015610e4657600080fd5b503515156128cc565b61048c60048036036040811015610e6557600080fd5b506001600160a01b03813581169160200135166129ee565b6105cd612a21565b6105cd60048036036020811015610e9b57600080fd5b50356001600160a01b0316612a27565b610629612a39565b6105cd60048036036020811015610ec957600080fd5b50356001600160a01b0316612a51565b610ee1612bae565b604080516001600160e01b039092168252519081900360200190f35b6105cd612bc1565b610f2b60048036036020811015610f1b57600080fd5b50356001600160a01b0316612bc7565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610f67578181015183820152602001610f4f565b505050509050019250505060405180910390f35b61048c612c50565b610f2b612c60565b6105cd60048036036040811015610fa157600080fd5b506001600160a01b0381358116916020013516612cc2565b610629612cdf565b6105cd60048036036080811015610fd757600080fd5b506001600160a01b03813581169160208101358216916040820135169060600135612cee565b6105cd6004803603602081101561101357600080fd5b50356001600160a01b0316612d72565b610f2b6004803603602081101561103957600080fd5b810190602081018135600160201b81111561105357600080fd5b82018360208201111561106557600080fd5b803590602001918460208302840111600160201b8311171561108657600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550612d84945050505050565b6110fa600480360360608110156110da57600080fd5b506001600160a01b03813581169160208101359091169060400135612e1b565b6040805192835260208301919091528051918290030190f35b6105cd6004803603604081101561112957600080fd5b506001600160a01b0381358116916020013516613043565b6105cd6004803603602081101561115757600080fd5b50356001600160a01b0316613060565b61057f6004803603602081101561117d57600080fd5b810190602081018135600160201b81111561119757600080fd5b8201836020820111156111a957600080fd5b803590602001918460208302840111600160201b831117156111ca57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550613072945050505050565b6105cd600480360360a081101561121e57600080fd5b506001600160a01b03813581169160208101358216916040820135811691606081013590911690608001356130ea565b610629613295565b6105cd6004803603606081101561126c57600080fd5b506001600160a01b038135811691602081013590911690604001356132a4565b610629600480360360408110156112a257600080fd5b506001600160a01b038135169060200135613644565b610629613679565b6105cd600480360360408110156112d657600080fd5b506001600160a01b038135169060200135613688565b61048c613838565b6105cd613848565b61057f6004803603602081101561131257600080fd5b50356001600160a01b031661384e565b6105cd6004803603606081101561133857600080fd5b506001600160a01b038135811691602081013590911690604001356138b2565b6105cd6004803603602081101561136e57600080fd5b50356001600160a01b03166138ef565b610629613bfd565b600181565b6001600160a01b03821660009081526009602052604081205460ff166113de576040805162461bcd60e51b815260206004820152600360248201526210cc4d60ea1b604482015290519081900360640190fd5b600a546001600160a01b031633148061140157506000546001600160a01b031633145b611438576040805162461bcd60e51b815260206004820152600360248201526243313560e81b604482015290519081900360640190fd5b6000546001600160a01b031633148061145357506001821515145b61148a576040805162461bcd60e51b815260206004820152600360248201526221989b60e91b604482015290519081900360640190fd5b6001600160a01b0383166000818152600c6020908152604091829020805486151560ff199091168117909155825193845283830152606090830181905260069083015265426f72726f7760d01b6080830152517f71aec636243f9709bb0007ae15e9afb8150ab01716d75fd7573be5cc096e03b09181900360a00190a150805b92915050565b60408051600180825281830190925260609160208083019080388339019050509050828160008151811061154057fe5b60200260200101906001600160a01b031690816001600160a01b03168152505061156d8183600180612508565b505050565b806001600160a01b031663f851a4406040518163ffffffff1660e01b815260040160206040518083038186803b1580156115ab57600080fd5b505afa1580156115bf573d6000803e3d6000fd5b505050506040513d60208110156115d557600080fd5b50516001600160a01b03163314611619576040805162461bcd60e51b815260206004820152600360248201526243313760e81b604482015290519081900360640190fd5b806001600160a01b031663c1e803346040518163ffffffff1660e01b8152600401602060405180830381600087803b15801561165457600080fd5b505af1158015611668573d6000803e3d6000fd5b505050506040513d602081101561167e57600080fd5b5051156116b8576040805162461bcd60e51b815260206004820152600360248201526208662760eb1b604482015290519081900360640190fd5b50565b600f6020526000908152604090205481565b5050505050565b6015546001600160a01b031681565b6001600160a01b03841660009081526009602052604081205460ff1661170b575060096117a4565b6117136159ce565b6040518060200160405280876001600160a01b031663aa5af0fd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561175757600080fd5b505afa15801561176b573d6000803e3d6000fd5b505050506040513d602081101561178157600080fd5b5051905290506117918682613c0c565b61179e8685836000613e6a565b60009150505b949350505050565b600a546001600160a01b031681565b6001546001600160a01b031681565b6117d2614054565b611823576040805162461bcd60e51b815260206004820152601960248201527f6f6e6c792061646d696e2063616e206772616e7420636f6d7000000000000000604482015290519081900360640190fd5b600061182f838361407d565b90508015611884576040805162461bcd60e51b815260206004820152601b60248201527f696e73756666696369656e7420636f6d7020666f72206772616e740000000000604482015290519081900360640190fd5b604080516001600160a01b03851681526020810184905281517f98b2f82a3a07f223a0be64b3d0f47711c64dccd1feafb94aa28156b38cd9695c929181900390910190a1505050565b600a546000906001600160a01b03163314806118f357506000546001600160a01b031633145b61192a576040805162461bcd60e51b815260206004820152600360248201526243313560e81b604482015290519081900360640190fd5b6000546001600160a01b031633148061194557506001821515145b61197c576040805162461bcd60e51b815260206004820152600360248201526221989b60e91b604482015290519081900360640190fd5b600a8054831515600160b81b810260ff60b81b1990921691909117909155604080516020810192909252808252600582820152645365697a6560d81b6060830152517fef159d9a32b2472e32b098f954f3ce62d232939f1c207070b584df1814de2de09181900360800190a150805b919050565b600080546001600160a01b03163314611a50576040805162461bcd60e51b815260206004820152601f60248201527f6f6e6c792061646d696e2063616e2073657420636c6f736520666163746f7200604482015290519081900360640190fd5b6005805490839055604080518281526020810185905281517f3b9670cf975d26958e754b57098eaa2ac914d8d2a31b83257997b9f346110fd9929181900390910190a160005b9392505050565b6000546001600160a01b03163314611ae2576040805162461bcd60e51b815260206004820152600360248201526243313360e81b604482015290519081900360640190fd5b601580546001600160a01b038381166001600160a01b0319831681179093556040805191909216808252602082019390935281517feda98690e518e9a05f8ec6837663e188211b2da8f4906648b323f2c1d4434e29929181900390910190a15050565b6000546001600160a01b03163314611b8a576040805162461bcd60e51b815260206004820152600360248201526210cc8d60ea1b604482015290519081900360640190fd5b6001600160a01b0381166000908152600960205260409020600381015460ff161515600114611be6576040805162461bcd60e51b815260206004820152600360248201526243323560e81b604482015290519081900360640190fd5b60038101805460ff19169055604080516001600160a01b03841681526000602082015281517f93c1f3e36ed71139f466a4ce8c9751790e2e33f5afb2df0dcfb3aeabe55d5aa2929181900390910190a1611c3e6141aa565b5050565b6001600160a01b03821660009081526009602052604081205460ff16611c95576040805162461bcd60e51b815260206004820152600360248201526210cc4d60ea1b604482015290519081900360640190fd5b600a546001600160a01b0316331480611cb857506000546001600160a01b031633145b611cef576040805162461bcd60e51b815260206004820152600360248201526243313560e81b604482015290519081900360640190fd5b6000546001600160a01b0316331480611d0a57506001821515145b611d41576040805162461bcd60e51b815260206004820152600360248201526221989b60e91b604482015290519081900360640190fd5b6001600160a01b0383166000818152600b6020908152604091829020805486151560ff199091168117909155825193845283830152606090830181905260049083015263135a5b9d60e21b6080830152517f71aec636243f9709bb0007ae15e9afb8150ab01716d75fd7573be5cc096e03b09181900360a00190a150919050565b600a54600160a01b900460ff1681565b50505050565b435b90565b505050505050565b60166020526000908152604090205481565b60065481565b333214611e37576040805162461bcd60e51b815260206004820152600360248201526243313960e81b604482015290519081900360640190fd5b611e3f6141aa565b565b600080600080600080611e568a8a8a8a61456f565b925092509250826011811115611e6857fe5b95509093509150505b9450945094915050565b6001600160a01b0383166000908152600b602052604081205460ff1615611ece576040805162461bcd60e51b8152602060048201526002602482015261219960f11b604482015290519081900360640190fd5b6001600160a01b03841660009081526009602052604090205460ff16611ef85760095b9050611a96565b611f01846148a7565b611f0d84846000614afb565b6000949350505050565b600080546001600160a01b03163314611f3d57611f366001600b614cf3565b90506119eb565b6006805490839055604080518281526020810185905281517faeba5a6c40a8ac138134bff1aaa65debf25971188a58804bad717f82f0ec1316929181900390910190a16000611a96565b80158015611f955750600082115b15611dd2576040805162461bcd60e51b8152602060048201526002602482015261433360f01b604482015290519081900360640190fd5b600d8181548110611fd957fe5b6000918252602090912001546001600160a01b0316905081565b600080546001600160a01b0316331461201257611f3660016010614cf3565b600480546001600160a01b038481166001600160a01b0319831681179093556040805191909216808252602082019390935281517fd52b2b9b7e9ee655fcb95d2e5b9e0c9f69e7ef2b8e9d2d0ea78402d576d22e22929181900390910190a16000611a96565b612080614054565b6120d1576040805162461bcd60e51b815260206004820152601d60248201527f6f6e6c792061646d696e2063616e2073657420636f6d70207370656564000000604482015290519081900360640190fd5b6120da8261278f565b806120f9576001600160a01b0382166000908152601960205260408120555b612101611dd8565b6001600160a01b03831660008181526019602090815260408083209490945560188152908390208490558251848152925191927f386537fa92edc3319af95f1f904dcf1900021e4f3f4e08169a577a09076e66b3929081900390910190a25050565b61156d565b60008060008060008061217f87600080600061456f565b92509250925082601181111561219157fe5b97919650945092505050565b600080546001600160a01b031633146121bc57611f3660016013614cf3565b600a80546001600160a01b038481166001600160a01b0319831617928390556040805192821680845293909116602083015280517f0613b6ee6a04f0d09f390e4d9318894b9f6ac7fd83897cd8d18896ba579c401e9281900390910190a16000611a96565b6001600160a01b03851660009081526009602052604081205460ff16158061226257506001600160a01b03851660009081526009602052604090205460ff16155b156122715760095b905061237d565b60008061227d85614d59565b9193509091506000905082601181111561229357fe5b146122ad578160118111156122a457fe5b9250505061237d565b806122b95760036122a4565b6000886001600160a01b03166395dd9193876040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060206040518083038186803b15801561231157600080fd5b505afa158015612325573d6000803e3d6000fd5b505050506040513d602081101561233b57600080fd5b50516040805160208101909152600554815290915060009061235d9083614d79565b90508086111561237457601194505050505061237d565b60009450505050505b95945050505050565b6000546001600160a01b03163314806123a957506015546001600160a01b031633145b6123e0576040805162461bcd60e51b815260206004820152600360248201526243313160e81b604482015290519081900360640190fd5b828181158015906123f057508082145b612427576040805162461bcd60e51b815260206004820152600360248201526221989960e91b604482015290519081900360640190fd5b60005b828110156124ff5784848281811061243e57fe5b905060200201356016600089898581811061245557fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b031681526020019081526020016000208190555086868281811061249557fe5b905060200201356001600160a01b03166001600160a01b03167f6f1951b2aad10f3fc81b86d91105b413a5b3f847a34bbc5ce1904201b14438f68686848181106124db57fe5b905060200201356040518082815260200191505060405180910390a260010161242a565b50505050505050565b60005b83518110156116cd57600084828151811061252257fe5b6020908102919091018101516001600160a01b0381166000908152600990925260409091205490915060ff16612597576040805162461bcd60e51b81526020600482015260156024820152741b585c9ad95d081b5d5cdd081899481b1a5cdd1959605a1b604482015290519081900360640190fd5b6001841515141561265f576125aa6159ce565b6040518060200160405280836001600160a01b031663aa5af0fd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156125ee57600080fd5b505afa158015612602573d6000803e3d6000fd5b505050506040513d602081101561261857600080fd5b5051905290506126288282613c0c565b60005b875181101561265c576126548389838151811061264457fe5b6020026020010151846001613e6a565b60010161262b565b50505b600183151514156126a857612673816148a7565b60005b86518110156126a65761269e8288838151811061268f57fe5b60200260200101516001614afb565b600101612676565b505b5060010161250b565b6126b9614054565b6126f0576040805162461bcd60e51b815260206004820152600360248201526221991960e91b604482015290519081900360640190fd5b600e805490829055604080518281526020810184905281517fc227c9272633c3a307d9845bf2bc2509cefb20d655b5f3c1002d8e1e3f22c8b0929181900390910190a1611c3e6141aa565b6010602052600090815260409020546001600160e01b03811690600160e01b900463ffffffff1682565b600c6020526000908152604090205460ff1681565b600b6020526000908152604090205460ff1681565b6001600160a01b038116600090815260186020526040812054906127b1611dd8565b6001600160a01b038416600090815260196020526040812054919250906127d9908390614d98565b90506000811180156127eb5750600083115b15611dd25760006127fc8285614dd2565b6001600160a01b038616600090815260146020526040812054919250906128239083614e14565b6001600160a01b0387166000908152601460209081526040808320939093556019905220849055505050505050565b66038d7ea4c6800081565b6004546001600160a01b031681565b600a54600160b01b900460ff1681565b6011602052600090815260409020546001600160e01b03811690600160e01b900463ffffffff1682565b60096020526000908152604090208054600182015460039092015460ff91821692911683565b600a546000906001600160a01b03163314806128f257506000546001600160a01b031633145b612929576040805162461bcd60e51b815260206004820152600360248201526243313560e81b604482015290519081900360640190fd5b6000546001600160a01b031633148061294457506001821515145b61297b576040805162461bcd60e51b815260206004820152600360248201526221989b60e91b604482015290519081900360640190fd5b600a8054831515600160b01b810260ff60b01b1990921691909117909155604080516020810192909252808252600882820152672a3930b739b332b960c11b6060830152517fef159d9a32b2472e32b098f954f3ce62d232939f1c207070b584df1814de2de09181900360800190a15090565b6001600160a01b038082166000908152600960209081526040808320938616835260029093019052205460ff1692915050565b60075481565b60186020526000908152604090205481565b73c00e94cb662c3520282e6f5717214004a7f2688890565b600080546001600160a01b03163314612a7057611f3660016012614cf3565b6001600160a01b03821660009081526009602052604090205460ff1615612a9d57611f36600a6011614cf3565b816001600160a01b031663fe9c44ae6040518163ffffffff1660e01b815260040160206040518083038186803b158015612ad657600080fd5b505afa158015612aea573d6000803e3d6000fd5b505050506040513d6020811015612b0057600080fd5b5050604080516060810182526001808252600060208381018281528486018381526001600160a01b03891684526009909252949091209251835490151560ff19918216178455935191830191909155516003909101805491151591909216179055612b6a82614e4a565b604080516001600160a01b038416815290517fcf583bb0c569eb967f806b11601c4cb93c10310485c67add5f8362c2f212321f9181900360200190a1600092915050565b6ec097ce7bc90715b34b9f100000000081565b600e5481565b60608060086000846001600160a01b03166001600160a01b03168152602001908152602001600020805480602002602001604051908101604052809291908181526020018280548015612c4357602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311612c25575b5093979650505050505050565b600a54600160b81b900460ff1681565b6060600d805480602002602001604051908101604052809291908181526020018280548015612cb857602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311612c9a575b5050505050905090565b601260209081526000928352604080842090915290825290205481565b6002546001600160a01b031681565b600a54600090600160b01b900460ff1615612d35576040805162461bcd60e51b8152602060048201526002602482015261433960f01b604482015290519081900360640190fd5b6000612d42868685614f17565b90508015612d515790506117a4565b612d5a866148a7565b612d6686866000614afb565b61179e86856000614afb565b60196020526000908152604090205481565b6060600082519050606081604051908082528060200260200182016040528015612db8578160200160208202803883390190505b50905060005b82811015612e13576000858281518110612dd457fe5b60200260200101519050612de88133614fc3565b6011811115612df357fe5b838381518110612dff57fe5b602090810291909101015250600101612dbe565b509392505050565b600480546040805163fc57d4df60e01b81526001600160a01b038781169482019490945290516000938493849391169163fc57d4df91602480820192602092909190829003018186803b158015612e7157600080fd5b505afa158015612e85573d6000803e3d6000fd5b505050506040513d6020811015612e9b57600080fd5b5051600480546040805163fc57d4df60e01b81526001600160a01b038a8116948201949094529051939450600093929091169163fc57d4df91602480820192602092909190829003018186803b158015612ef457600080fd5b505afa158015612f08573d6000803e3d6000fd5b505050506040513d6020811015612f1e57600080fd5b50519050811580612f2d575080155b15612f4257600d93506000925061303b915050565b6000866001600160a01b031663182df0f56040518163ffffffff1660e01b815260040160206040518083038186803b158015612f7d57600080fd5b505afa158015612f91573d6000803e3d6000fd5b505050506040513d6020811015612fa757600080fd5b505190506000612fb56159ce565b612fbd6159ce565b612fc56159ce565b612fed604051806020016040528060065481525060405180602001604052808a8152506150b9565b92506130156040518060200160405280888152506040518060200160405280888152506150b9565b915061302183836150f8565b905061302d818b614d79565b600099509750505050505050505b935093915050565b601360209081526000928352604080842090915290825290205481565b60146020526000908152604090205481565b61307a614054565b6130b1576040805162461bcd60e51b815260206004820152600360248201526243323360e81b604482015290519081900360640190fd5b60005b81518110156130e1576130d98282815181106130cc57fe5b6020026020010151615134565b6001016130b4565b506116b86141aa565b600a54600090600160b81b900460ff1615613131576040805162461bcd60e51b8152602060048201526002602482015261086760f31b604482015290519081900360640190fd5b6001600160a01b03861660009081526009602052604090205460ff16158061317257506001600160a01b03851660009081526009602052604090205460ff16155b1561317e57600961226a565b846001600160a01b0316635fe3b5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156131b757600080fd5b505afa1580156131cb573d6000803e3d6000fd5b505050506040513d60208110156131e157600080fd5b505160408051635fe3b56760e01b815290516001600160a01b0392831692891691635fe3b567916004808301926020929190829003018186803b15801561322757600080fd5b505afa15801561323b573d6000803e3d6000fd5b505050506040513d602081101561325157600080fd5b50516001600160a01b03161461326857600261226a565b613271866148a7565b61327d86846000614afb565b61328986856000614afb565b60009695505050505050565b6017546001600160a01b031681565b6001600160a01b0383166000908152600c602052604081205460ff16156132f7576040805162461bcd60e51b815260206004820152600260248201526110cd60f21b604482015290519081900360640190fd5b6001600160a01b03841660009081526009602052604090205460ff1661331e576009611ef1565b6001600160a01b038085166000908152600960209081526040808320938716835260029093019052205460ff166133fb57336001600160a01b03851614613391576040805162461bcd60e51b8152602060048201526002602482015261433560f01b604482015290519081900360640190fd5b600061339d3385614fc3565b905060008160118111156133ad57fe5b146133c6578060118111156133be57fe5b915050611a96565b6001600160a01b038086166000908152600960209081526040808320938816835260029093019052205460ff166133f957fe5b505b600480546040805163fc57d4df60e01b81526001600160a01b03888116948201949094529051929091169163fc57d4df91602480820192602092909190829003018186803b15801561344c57600080fd5b505afa158015613460573d6000803e3d6000fd5b505050506040513d602081101561347657600080fd5b505161348357600d611ef1565b6001600160a01b0384166000908152601660205260409020548015613555576000856001600160a01b03166347bd37186040518163ffffffff1660e01b815260040160206040518083038186803b1580156134dd57600080fd5b505afa1580156134f1573d6000803e3d6000fd5b505050506040513d602081101561350757600080fd5b5051905060006135178286614e14565b9050828110613552576040805162461bcd60e51b8152602060048201526002602482015261433760f01b604482015290519081900360640190fd5b50505b600080613565868860008861456f565b9193509091506000905082601181111561357b57fe5b146135965781601181111561358c57fe5b9350505050611a96565b80156135a357600461358c565b6135ab6159ce565b6040518060200160405280896001600160a01b031663aa5af0fd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156135ef57600080fd5b505afa158015613603573d6000803e3d6000fd5b505050506040513d602081101561361957600080fd5b5051905290506136298882613c0c565b6136368888836000613e6a565b600098975050505050505050565b6008602052816000526040600020818154811061365d57fe5b6000918252602090912001546001600160a01b03169150829050565b6003546001600160a01b031681565b600080546001600160a01b031633146136ae576136a760016006614cf3565b905061150a565b6001600160a01b0383166000908152600960205260409020805460ff166136e3576136db60096007614cf3565b91505061150a565b6136eb6159ce565b5060408051602081019091528381526137026159ce565b506040805160208101909152670c7d713b49da000081526137238183615432565b1561373e5761373460066008614cf3565b935050505061150a565b84158015906137c75750600480546040805163fc57d4df60e01b81526001600160a01b038a8116948201949094529051929091169163fc57d4df91602480820192602092909190829003018186803b15801561379957600080fd5b505afa1580156137ad573d6000803e3d6000fd5b505050506040513d60208110156137c357600080fd5b5051155b156137d857613734600d6009614cf3565b60018301805490869055604080516001600160a01b03891681526020810183905280820188905290517f70483e6592cd5182d45ac970e05bc62cdcc90e9d8ef2c2dbe686cf383bcd7fc59181900360600190a16000979650505050505050565b600a54600160a81b900460ff1681565b60055481565b6116b881600d8054806020026020016040519081016040528092919081815260200182805480156138a857602002820191906000526020600020905b81546001600160a01b0316815260019091019060200180831161388a575b5050505050611510565b6000806138c0858585614f17565b905080156138cf579050611a96565b6138d8856148a7565b6138e485856000614afb565b600095945050505050565b6000808290506000806000836001600160a01b031663c37f68e2336040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060806040518083038186803b15801561395057600080fd5b505afa158015613964573d6000803e3d6000fd5b505050506040513d608081101561397a57600080fd5b5080516020820151604090920151909450909250905082156139c8576040805162461bcd60e51b8152602060048201526002602482015261433160f01b604482015290519081900360640190fd5b80156139e5576139da600c6002614cf3565b9450505050506119eb565b60006139f2873385614f17565b90508015613a1357613a07600e600383615439565b955050505050506119eb565b6001600160a01b0385166000908152600960209081526040808320338452600281019092529091205460ff16613a5257600096505050505050506119eb565b3360009081526002820160209081526040808320805460ff191690556008825291829020805483518184028101840190945280845260609392830182828015613ac457602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311613aa6575b5050835193945083925060009150505b82811015613b1957896001600160a01b0316848281518110613af257fe5b60200260200101516001600160a01b03161415613b1157809150613b19565b600101613ad4565b50818110613b2357fe5b336000908152600860205260409020805481906000198101908110613b4457fe5b9060005260206000200160009054906101000a90046001600160a01b0316818381548110613b6e57fe5b600091825260209091200180546001600160a01b0319166001600160a01b03929092169190911790558054613ba78260001983016159e1565b50604080516001600160a01b038c16815233602082015281517fe699a64c18b07ac5b7301aa273f36a2287239eb9501d81950672794afba29a0d929181900390910190a160009c9b505050505050505050505050565b6000546001600160a01b031681565b6001600160a01b0382166000908152601160209081526040808320600f9092528220549091613c39611dd8565b8354909150600090613c59908390600160e01b900463ffffffff16614d98565b9050600081118015613c6b5750600083115b15613e18576000613ce0876001600160a01b03166347bd37186040518163ffffffff1660e01b815260040160206040518083038186803b158015613cae57600080fd5b505afa158015613cc2573d6000803e3d6000fd5b505050506040513d6020811015613cd857600080fd5b50518761549f565b90506000613cee8386614dd2565b9050613cf86159ce565b60008311613d155760405180602001604052806000815250613d1f565b613d1f82846154bd565b9050613d296159ce565b604080516020810190915288546001600160e01b03168152613d4b90836154f2565b90506040518060400160405280613d8183600001516040518060400160405280600381526020016204332360ec1b815250615517565b6001600160e01b03168152602001613db4886040518060400160405280600381526020016243323160e81b8152506155b1565b63ffffffff9081169091526001600160a01b038c166000908152601160209081526040909120835181549490920151909216600160e01b026001600160e01b039182166001600160e01b0319909416939093171691909117905550611ddd92505050565b8015611ddd57613e43826040518060400160405280600381526020016243323160e81b8152506155b1565b845463ffffffff91909116600160e01b026001600160e01b03909116178455505050505050565b6001600160a01b0384166000908152601160205260409020613e8a6159ce565b50604080516020810190915281546001600160e01b03168152613eab6159ce565b5060408051602080820183526001600160a01b03808a16600090815260138352848120918a16808252828452948120805485528651959091529152919091558051156124ff57613ef96159ce565b613f038383615606565b90506000613f92896001600160a01b03166395dd91938a6040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060206040518083038186803b158015613f6057600080fd5b505afa158015613f74573d6000803e3d6000fd5b505050506040513d6020811015613f8a57600080fd5b50518861549f565b90506000613fa0828461562b565b6001600160a01b038a1660009081526014602052604081205491925090613fc79083614e14565b9050613fe88a828a613fe05766038d7ea4c68000613fe3565b60005b61565a565b6001600160a01b03808c1660008181526014602090815260409182902094909455895181518781529485015280519193928f16927f1fc3ecc087d8d2d15e23d0032af5a47059c3892d003d8e139fdcb6bb327c99a6929081900390910190a35050505050505050505050565b600080546001600160a01b031633148061407857506002546001600160a01b031633145b905090565b600080614088612a39565b604080516370a0823160e01b815230600482015290519192506000916001600160a01b038416916370a08231916024808301926020929190829003018186803b1580156140d457600080fd5b505afa1580156140e8573d6000803e3d6000fd5b505050506040513d60208110156140fe57600080fd5b505190508084116141a157816001600160a01b031663a9059cbb86866040518363ffffffff1660e01b815260040180836001600160a01b03166001600160a01b0316815260200182815260200192505050602060405180830381600087803b15801561416957600080fd5b505af115801561417d573d6000803e3d6000fd5b505050506040513d602081101561419357600080fd5b506000935061150a92505050565b50919392505050565b6060600d80548060200260200160405190810160405280929190818152602001828054801561420257602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116141e4575b50939450600093505050505b81518110156142c857600082828151811061422557fe5b602002602001015190506142376159ce565b6040518060200160405280836001600160a01b031663aa5af0fd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561427b57600080fd5b505afa15801561428f573d6000803e3d6000fd5b505050506040513d60208110156142a557600080fd5b5051905290506142b4826148a7565b6142be8282613c0c565b505060010161420e565b506142d16159ce565b6040518060200160405280600081525090506060825160405190808252806020026020018201604052801561432057816020015b61430d6159ce565b8152602001906001900390816143055790505b50905060005b83518110156144a657600084828151811061433d57fe5b6020908102919091018101516001600160a01b0381166000908152600990925260409091206003015490915060ff161561449d576143796159ce565b60408051602080820180845260045463fc57d4df60e01b9091526001600160a01b03868116602485015293519293849391169163fc57d4df916044808601929190818703018186803b1580156143ce57600080fd5b505afa1580156143e2573d6000803e3d6000fd5b505050506040513d60208110156143f857600080fd5b5051905290506144066159ce565b61447482846001600160a01b03166347bd37186040518163ffffffff1660e01b815260040160206040518083038186803b15801561444357600080fd5b505afa158015614457573d6000803e3d6000fd5b505050506040513d602081101561446d57600080fd5b505161579f565b90508085858151811061448357fe5b602002602001018190525061449886826154f2565b955050505b50600101614326565b5060005b8351811015611dd2576000600d82815481106144c257fe5b600091825260208220015485516001600160a01b0390911692506144e757600061450f565b61450f600e5461450a8686815181106144fc57fe5b6020026020010151886150f8565b6157c0565b6001600160a01b0383166000818152600f60209081526040918290208490558151848152915193945091927f2ab93f65628379309f36cb125e90d7c902454a545c4f8b8cb0794af75c24b807929181900390910190a250506001016144aa565b600080600061457c615a05565b6001600160a01b038816600090815260086020908152604080832080548251818502810185019093528083526060938301828280156145e457602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116145c6575b50939450600093505050505b815181101561486857600082828151811061460757fe5b60200260200101519050806001600160a01b031663c37f68e28d6040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060806040518083038186803b15801561466757600080fd5b505afa15801561467b573d6000803e3d6000fd5b505050506040513d608081101561469157600080fd5b508051602082015160408084015160609485015160808b01529389019390935291870191909152935083156146d65750600f965060009550859450611e719350505050565b60408051602080820183526001600160a01b0380851660008181526009845285902060010154845260c08a01939093528351808301855260808a0151815260e08a015260048054855163fc57d4df60e01b815291820194909452935192169263fc57d4df9260248083019392829003018186803b15801561475657600080fd5b505afa15801561476a573d6000803e3d6000fd5b505050506040513d602081101561478057600080fd5b505160a086018190526147a35750600d965060009550859450611e719350505050565b604080516020810190915260a0860151815261010086015260c085015160e08601516147dd916147d2916150b9565b8661010001516150b9565b6101208601819052604086015186516147f79291906157d9565b8552610100850151606086015160208701516148149291906157d9565b60208601526001600160a01b03818116908c16141561485f576148418561012001518b87602001516157d9565b60208601819052610100860151614859918b906157d9565b60208601525b506001016145f0565b5060208301518351111561488e5750506020810151905160009450039150829050611e71565b5050805160209091015160009450849350039050611e71565b6001600160a01b0381166000908152601060209081526040808320600f90925282205490916148d4611dd8565b83549091506000906148f4908390600160e01b900463ffffffff16614d98565b90506000811180156149065750600083115b15614aaa576000856001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561494657600080fd5b505afa15801561495a573d6000803e3d6000fd5b505050506040513d602081101561497057600080fd5b5051905060006149808386614dd2565b905061498a6159ce565b600083116149a757604051806020016040528060008152506149b1565b6149b182846154bd565b90506149bb6159ce565b604080516020810190915288546001600160e01b031681526149dd90836154f2565b90506040518060400160405280614a1383600001516040518060400160405280600381526020016204332360ec1b815250615517565b6001600160e01b03168152602001614a46886040518060400160405280600381526020016243323160e81b8152506155b1565b63ffffffff9081169091526001600160a01b038b166000908152601060209081526040909120835181549490920151909216600160e01b026001600160e01b039182166001600160e01b03199094169390931716919091179055506116cd92505050565b80156116cd57614ad5826040518060400160405280600381526020016243323160e81b8152506155b1565b845463ffffffff91909116600160e01b026001600160e01b039091161784555050505050565b6001600160a01b0383166000908152601060205260409020614b1b6159ce565b50604080516020810190915281546001600160e01b03168152614b3c6159ce565b5060408051602080820183526001600160a01b03808916600090815260128352848120918916808252828452948120805485528651959091529152919091558051158015614b8a5750815115155b15614ba2576ec097ce7bc90715b34b9f100000000081525b614baa6159ce565b614bb48383615606565b90506000876001600160a01b03166370a08231886040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060206040518083038186803b158015614c0e57600080fd5b505afa158015614c22573d6000803e3d6000fd5b505050506040513d6020811015614c3857600080fd5b505190506000614c48828461562b565b6001600160a01b03891660009081526014602052604081205491925090614c6f9083614e14565b9050614c8889828a613fe05766038d7ea4c68000613fe3565b6001600160a01b03808b1660008181526014602090815260409182902094909455895181518781529485015280519193928e16927f2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a929081900390910190a350505050505050505050565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0836011811115614d2257fe5b836013811115614d2e57fe5b604080519283526020830191909152600082820152519081900360600190a1826011811115611a9657fe5b6000806000614d6c84600080600061456f565b9250925092509193909250565b6000614d836159ce565b614d8d848461579f565b90506117a481615801565b6000611a968383604051806040016040528060158152602001747375627472616374696f6e20756e646572666c6f7760581b815250615810565b6000611a9683836040518060400160405280601781526020017f6d756c7469706c69636174696f6e206f766572666c6f7700000000000000000081525061586a565b6000611a968383604051806040016040528060118152602001706164646974696f6e206f766572666c6f7760781b8152506158e9565b60005b600d54811015614ec457816001600160a01b0316600d8281548110614e6e57fe5b6000918252602090912001546001600160a01b03161415614ebc576040805162461bcd60e51b815260206004820152600360248201526204331360ec1b604482015290519081900360640190fd5b600101614e4d565b50600d80546001810182556000919091527fd7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb50180546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03831660009081526009602052604081205460ff16614f3e576009611ef1565b6001600160a01b038085166000908152600960209081526040808320938716835260029093019052205460ff16614f76576000611ef1565b600080614f86858786600061456f565b91935090915060009050826011811115614f9c57fe5b14614fb657816011811115614fad57fe5b92505050611a96565b8015613289576004614fad565b6001600160a01b0382166000908152600960205260408120805460ff16614fee57600991505061150a565b6001600160a01b038316600090815260028201602052604090205460ff1615156001141561502057600091505061150a565b6001600160a01b0380841660008181526002840160209081526040808320805460ff19166001908117909155600883528184208054918201815584529282902090920180549489166001600160a01b031990951685179055815193845283019190915280517f3ab23ab0d51cccc0c3085aec51f99228625aa1a922b3a8ca89a26b0f2027a1a59281900390910190a15060009392505050565b6150c16159ce565b6040518060200160405280670de0b6b3a76400006150e786600001518660000151614dd2565b816150ee57fe5b0490529392505050565b6151006159ce565b604051806020016040528061512b6151248660000151670de0b6b3a7640000614dd2565b855161593e565b90529392505050565b6001600160a01b0381166000908152600960205260409020805460ff1615156001146151a7576040805162461bcd60e51b815260206004820152601960248201527f636f6d70206d61726b6574206973206e6f74206c697374656400000000000000604482015290519081900360640190fd5b600381015460ff16156151ec576040805162461bcd60e51b81526020600482015260086024820152670636f6d70204331360c41b604482015290519081900360640190fd5b60038101805460ff19166001908117909155604080516001600160a01b0385168152602081019290925280517f93c1f3e36ed71139f466a4ce8c9751790e2e33f5afb2df0dcfb3aeabe55d5aa29281900390910190a16001600160a01b0382166000908152601060205260409020546001600160e01b031615801561529457506001600160a01b038216600090815260106020526040902054600160e01b900463ffffffff16155b156153495760405180604001604052806ec097ce7bc90715b34b9f10000000006001600160e01b031681526020016152ee6152cd611dd8565b6040518060400160405280600381526020016243323160e81b8152506155b1565b63ffffffff9081169091526001600160a01b0384166000908152601060209081526040909120835181549490920151909216600160e01b026001600160e01b039182166001600160e01b031990941693909317169190911790555b6001600160a01b0382166000908152601160205260409020546001600160e01b031615801561539b57506001600160a01b038216600090815260116020526040902054600160e01b900463ffffffff16155b15611c3e5760405180604001604052806ec097ce7bc90715b34b9f10000000006001600160e01b031681526020016153d46152cd611dd8565b63ffffffff9081169091526001600160a01b0384166000908152601160209081526040909120835181549490920151909216600160e01b026001600160e01b039182166001600160e01b031990941693909317169190911790555050565b5190511090565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa084601181111561546857fe5b84601381111561547457fe5b604080519283526020830191909152818101859052519081900360600190a18360118111156117a457fe5b6000611a966154b684670de0b6b3a7640000614dd2565b835161593e565b6154c56159ce565b604051806020016040528061512b6154ec866ec097ce7bc90715b34b9f1000000000614dd2565b8561593e565b6154fa6159ce565b604051806020016040528061512b85600001518560000151614e14565b600081600160e01b84106155a95760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561556e578181015183820152602001615556565b50505050905090810190601f16801561559b5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b509192915050565b600081600160201b84106155a95760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561556e578181015183820152602001615556565b61560e6159ce565b604051806020016040528061512b85600001518560000151614d98565b60006ec097ce7bc90715b34b9f100000000061564b848460000151614dd2565b8161565257fe5b049392505050565b600081831015801561566c5750600083115b1561579757600061567b612a39565b604080516370a0823160e01b815230600482015290519192506000916001600160a01b038416916370a08231916024808301926020929190829003018186803b1580156156c757600080fd5b505afa1580156156db573d6000803e3d6000fd5b505050506040513d60208110156156f157600080fd5b5051905080851161579457816001600160a01b031663a9059cbb87876040518363ffffffff1660e01b815260040180836001600160a01b03166001600160a01b0316815260200182815260200192505050602060405180830381600087803b15801561575c57600080fd5b505af1158015615770573d6000803e3d6000fd5b505050506040513d602081101561578657600080fd5b5060009350611a9692505050565b50505b509092915050565b6157a76159ce565b604051806020016040528061512b856000015185614dd2565b6000670de0b6b3a764000061564b848460000151614dd2565b60006157e36159ce565b6157ed858561579f565b905061237d6157fb82615801565b84614e14565b51670de0b6b3a7640000900490565b600081848411156158625760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561556e578181015183820152602001615556565b505050900390565b6000831580615877575082155b1561588457506000611a96565b8383028385828161589157fe5b041483906158e05760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561556e578181015183820152602001615556565b50949350505050565b600083830182858210156158e05760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561556e578181015183820152602001615556565b6000611a9683836040518060400160405280600e81526020016d646976696465206279207a65726f60901b815250600081836159bb5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561556e578181015183820152602001615556565b508284816159c557fe5b04949350505050565b6040518060200160405280600081525090565b81548183558181111561156d5760008381526020902061156d918101908301615a6f565b604051806101400160405280600081526020016000815260200160008152602001600081526020016000815260200160008152602001615a436159ce565b8152602001615a506159ce565b8152602001615a5d6159ce565b8152602001615a6a6159ce565b905290565b611dda91905b80821115615a895760008155600101615a75565b509056fea265627a7a723158203b572cbde865aef8c70a29acf721afae5a2cbedbbe10de7ba62cec611fdc181064736f6c63430005100032";
var deployedBytecode$6 = "0x608060405234801561001057600080fd5b506004361061047f5760003560e01c80636d35bf9111610257578063bb82aa5e11610146578063da3d454c116100c3578063e875544611610087578063e8755446146112f4578063e9af0292146112fc578063eabe7d9114611322578063ede4edd014611358578063f851a4401461137e5761047f565b8063da3d454c14611256578063dce154491461128c578063dcfbc0c7146112b8578063e4028eee146112c0578063e6653f3d146112ec5761047f565b8063ca0af0431161010a578063ca0af04314611113578063cc7ebdc414611141578063ce485c5e14611167578063d02f735114611208578063d9bbdf381461124e5761047f565b8063bb82aa5e14610fb9578063bdcdc25814610fc1578063bea6b8b814610ffd578063c299823814611023578063c488847b146110c45761047f565b806394b2294b116101d4578063aa90075411610198578063aa90075414610efd578063abfceffc14610f05578063ac0b0bb714610f7b578063b0772d0b14610f83578063b21be7fd14610f8b5761047f565b806394b2294b14610e7d578063986ab83814610e855780639d1b5a0a14610eab578063a76b3fda14610eb3578063a7f0e23114610ed95761047f565b806387f763031161021b57806387f7630314610dba5780638c57804e14610dc25780638e8f294b14610de85780638ebf636414610e30578063929fe9a114610e4f5761047f565b80636d35bf9114610d18578063731f0c2b14610d5e578063741b252514610d84578063747026c914610daa5780637dc0d1d014610db25761047f565b80634a584432116103735780635c778605116102f05780636810dfa6116102b45780636810dfa614610b1f5780636a49111214610c4b5780636a56947e14610c685780636b79c38d14610ca45780636d154ea514610cf25761047f565b80635c778605146109995780635ec88c79146109cf5780635f5af1aa146109f55780635fc7e71e14610a1b578063607ef6c114610a615761047f565b80634fd42e17116103375780634fd42e17146108d157806351dff989146108ee57806352d84d1e1461092a57806355ee1fe114610947578063598ee1cb1461096d5761047f565b80634a5844321461080b5780634ada90af146108315780634d8e5037146108395780634e79238f146108415780634ef4c3e11461089b5761047f565b806327efe3cb116104015780633bcf7ec1116103c55780633bcf7ec1146107455780633c94786f1461077357806341c728b91461077b57806342cbb15c146107b757806347ef3b3b146107bf5761047f565b806327efe3cb146106915780632d70db78146106bd578063317b0b77146106dc578063391957d7146106f95780633aa729b41461071f5761047f565b80631ededc91116104485780631ededc91146105df57806321af45691461062157806324008a621461064557806324a3d6221461068157806326782247146106895761047f565b80627e3dd21461048457806318c882a5146104a05780631c3db2e0146104ce5780631d504dc6146105815780631d7b33d7146105a7575b600080fd5b61048c611386565b604080519115158252519081900360200190f35b61048c600480360360408110156104b657600080fd5b506001600160a01b038135169060200135151561138b565b61057f600480360360408110156104e457600080fd5b6001600160a01b038235169190810190604081016020820135600160201b81111561050e57600080fd5b82018360208201111561052057600080fd5b803590602001918460208302840111600160201b8311171561054157600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550611510945050505050565b005b61057f6004803603602081101561059757600080fd5b50356001600160a01b0316611572565b6105cd600480360360208110156105bd57600080fd5b50356001600160a01b03166116bb565b60408051918252519081900360200190f35b61057f600480360360a08110156105f557600080fd5b506001600160a01b038135811691602081013582169160408201351690606081013590608001356116cd565b6106296116d4565b604080516001600160a01b039092168252519081900360200190f35b6105cd6004803603608081101561065b57600080fd5b506001600160a01b038135811691602081013582169160408201351690606001356116e3565b6106296117ac565b6106296117bb565b61057f600480360360408110156106a757600080fd5b506001600160a01b0381351690602001356117ca565b61048c600480360360208110156106d357600080fd5b503515156118cd565b6105cd600480360360208110156106f257600080fd5b50356119f0565b61057f6004803603602081101561070f57600080fd5b50356001600160a01b0316611a9d565b61057f6004803603602081101561073557600080fd5b50356001600160a01b0316611b45565b61048c6004803603604081101561075b57600080fd5b506001600160a01b0381351690602001351515611c42565b61048c611dc2565b61057f6004803603608081101561079157600080fd5b506001600160a01b03813581169160208101359091169060408101359060600135611dd2565b6105cd611dd8565b61057f600480360360c08110156107d557600080fd5b506001600160a01b0381358116916020810135821691604082013581169160608101359091169060808101359060a00135611ddd565b6105cd6004803603602081101561082157600080fd5b50356001600160a01b0316611de5565b6105cd611df7565b61057f611dfd565b61087d6004803603608081101561085757600080fd5b506001600160a01b03813581169160208101359091169060408101359060600135611e41565b60408051938452602084019290925282820152519081900360600190f35b6105cd600480360360608110156108b157600080fd5b506001600160a01b03813581169160208101359091169060400135611e7b565b6105cd600480360360208110156108e757600080fd5b5035611f17565b61057f6004803603608081101561090457600080fd5b506001600160a01b03813581169160208101359091169060408101359060600135611f87565b6106296004803603602081101561094057600080fd5b5035611fcc565b6105cd6004803603602081101561095d57600080fd5b50356001600160a01b0316611ff3565b61057f6004803603604081101561098357600080fd5b506001600160a01b038135169060200135612078565b61057f600480360360608110156109af57600080fd5b506001600160a01b03813581169160208101359091169060400135612163565b61087d600480360360208110156109e557600080fd5b50356001600160a01b0316612168565b6105cd60048036036020811015610a0b57600080fd5b50356001600160a01b031661219d565b6105cd600480360360a0811015610a3157600080fd5b506001600160a01b0381358116916020810135821691604082013581169160608101359091169060800135612221565b61057f60048036036040811015610a7757600080fd5b810190602081018135600160201b811115610a9157600080fd5b820183602082011115610aa357600080fd5b803590602001918460208302840111600160201b83111715610ac457600080fd5b919390929091602081019035600160201b811115610ae157600080fd5b820183602082011115610af357600080fd5b803590602001918460208302840111600160201b83111715610b1457600080fd5b509092509050612386565b61057f60048036036080811015610b3557600080fd5b810190602081018135600160201b811115610b4f57600080fd5b820183602082011115610b6157600080fd5b803590602001918460208302840111600160201b83111715610b8257600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b811115610bd157600080fd5b820183602082011115610be357600080fd5b803590602001918460208302840111600160201b83111715610c0457600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550505050803515159150602001351515612508565b61057f60048036036020811015610c6157600080fd5b50356126b1565b61057f60048036036080811015610c7e57600080fd5b506001600160a01b03813581169160208101358216916040820135169060600135611dd2565b610cca60048036036020811015610cba57600080fd5b50356001600160a01b031661273b565b604080516001600160e01b03909316835263ffffffff90911660208301528051918290030190f35b61048c60048036036020811015610d0857600080fd5b50356001600160a01b0316612765565b61057f600480360360a0811015610d2e57600080fd5b506001600160a01b03813581169160208101358216916040820135811691606081013590911690608001356116cd565b61048c60048036036020811015610d7457600080fd5b50356001600160a01b031661277a565b61057f60048036036020811015610d9a57600080fd5b50356001600160a01b031661278f565b6105cd612852565b61062961285d565b61048c61286c565b610cca60048036036020811015610dd857600080fd5b50356001600160a01b031661287c565b610e0e60048036036020811015610dfe57600080fd5b50356001600160a01b03166128a6565b6040805193151584526020840192909252151582820152519081900360600190f35b61048c60048036036020811015610e4657600080fd5b503515156128cc565b61048c60048036036040811015610e6557600080fd5b506001600160a01b03813581169160200135166129ee565b6105cd612a21565b6105cd60048036036020811015610e9b57600080fd5b50356001600160a01b0316612a27565b610629612a39565b6105cd60048036036020811015610ec957600080fd5b50356001600160a01b0316612a51565b610ee1612bae565b604080516001600160e01b039092168252519081900360200190f35b6105cd612bc1565b610f2b60048036036020811015610f1b57600080fd5b50356001600160a01b0316612bc7565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610f67578181015183820152602001610f4f565b505050509050019250505060405180910390f35b61048c612c50565b610f2b612c60565b6105cd60048036036040811015610fa157600080fd5b506001600160a01b0381358116916020013516612cc2565b610629612cdf565b6105cd60048036036080811015610fd757600080fd5b506001600160a01b03813581169160208101358216916040820135169060600135612cee565b6105cd6004803603602081101561101357600080fd5b50356001600160a01b0316612d72565b610f2b6004803603602081101561103957600080fd5b810190602081018135600160201b81111561105357600080fd5b82018360208201111561106557600080fd5b803590602001918460208302840111600160201b8311171561108657600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550612d84945050505050565b6110fa600480360360608110156110da57600080fd5b506001600160a01b03813581169160208101359091169060400135612e1b565b6040805192835260208301919091528051918290030190f35b6105cd6004803603604081101561112957600080fd5b506001600160a01b0381358116916020013516613043565b6105cd6004803603602081101561115757600080fd5b50356001600160a01b0316613060565b61057f6004803603602081101561117d57600080fd5b810190602081018135600160201b81111561119757600080fd5b8201836020820111156111a957600080fd5b803590602001918460208302840111600160201b831117156111ca57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550613072945050505050565b6105cd600480360360a081101561121e57600080fd5b506001600160a01b03813581169160208101358216916040820135811691606081013590911690608001356130ea565b610629613295565b6105cd6004803603606081101561126c57600080fd5b506001600160a01b038135811691602081013590911690604001356132a4565b610629600480360360408110156112a257600080fd5b506001600160a01b038135169060200135613644565b610629613679565b6105cd600480360360408110156112d657600080fd5b506001600160a01b038135169060200135613688565b61048c613838565b6105cd613848565b61057f6004803603602081101561131257600080fd5b50356001600160a01b031661384e565b6105cd6004803603606081101561133857600080fd5b506001600160a01b038135811691602081013590911690604001356138b2565b6105cd6004803603602081101561136e57600080fd5b50356001600160a01b03166138ef565b610629613bfd565b600181565b6001600160a01b03821660009081526009602052604081205460ff166113de576040805162461bcd60e51b815260206004820152600360248201526210cc4d60ea1b604482015290519081900360640190fd5b600a546001600160a01b031633148061140157506000546001600160a01b031633145b611438576040805162461bcd60e51b815260206004820152600360248201526243313560e81b604482015290519081900360640190fd5b6000546001600160a01b031633148061145357506001821515145b61148a576040805162461bcd60e51b815260206004820152600360248201526221989b60e91b604482015290519081900360640190fd5b6001600160a01b0383166000818152600c6020908152604091829020805486151560ff199091168117909155825193845283830152606090830181905260069083015265426f72726f7760d01b6080830152517f71aec636243f9709bb0007ae15e9afb8150ab01716d75fd7573be5cc096e03b09181900360a00190a150805b92915050565b60408051600180825281830190925260609160208083019080388339019050509050828160008151811061154057fe5b60200260200101906001600160a01b031690816001600160a01b03168152505061156d8183600180612508565b505050565b806001600160a01b031663f851a4406040518163ffffffff1660e01b815260040160206040518083038186803b1580156115ab57600080fd5b505afa1580156115bf573d6000803e3d6000fd5b505050506040513d60208110156115d557600080fd5b50516001600160a01b03163314611619576040805162461bcd60e51b815260206004820152600360248201526243313760e81b604482015290519081900360640190fd5b806001600160a01b031663c1e803346040518163ffffffff1660e01b8152600401602060405180830381600087803b15801561165457600080fd5b505af1158015611668573d6000803e3d6000fd5b505050506040513d602081101561167e57600080fd5b5051156116b8576040805162461bcd60e51b815260206004820152600360248201526208662760eb1b604482015290519081900360640190fd5b50565b600f6020526000908152604090205481565b5050505050565b6015546001600160a01b031681565b6001600160a01b03841660009081526009602052604081205460ff1661170b575060096117a4565b6117136159ce565b6040518060200160405280876001600160a01b031663aa5af0fd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561175757600080fd5b505afa15801561176b573d6000803e3d6000fd5b505050506040513d602081101561178157600080fd5b5051905290506117918682613c0c565b61179e8685836000613e6a565b60009150505b949350505050565b600a546001600160a01b031681565b6001546001600160a01b031681565b6117d2614054565b611823576040805162461bcd60e51b815260206004820152601960248201527f6f6e6c792061646d696e2063616e206772616e7420636f6d7000000000000000604482015290519081900360640190fd5b600061182f838361407d565b90508015611884576040805162461bcd60e51b815260206004820152601b60248201527f696e73756666696369656e7420636f6d7020666f72206772616e740000000000604482015290519081900360640190fd5b604080516001600160a01b03851681526020810184905281517f98b2f82a3a07f223a0be64b3d0f47711c64dccd1feafb94aa28156b38cd9695c929181900390910190a1505050565b600a546000906001600160a01b03163314806118f357506000546001600160a01b031633145b61192a576040805162461bcd60e51b815260206004820152600360248201526243313560e81b604482015290519081900360640190fd5b6000546001600160a01b031633148061194557506001821515145b61197c576040805162461bcd60e51b815260206004820152600360248201526221989b60e91b604482015290519081900360640190fd5b600a8054831515600160b81b810260ff60b81b1990921691909117909155604080516020810192909252808252600582820152645365697a6560d81b6060830152517fef159d9a32b2472e32b098f954f3ce62d232939f1c207070b584df1814de2de09181900360800190a150805b919050565b600080546001600160a01b03163314611a50576040805162461bcd60e51b815260206004820152601f60248201527f6f6e6c792061646d696e2063616e2073657420636c6f736520666163746f7200604482015290519081900360640190fd5b6005805490839055604080518281526020810185905281517f3b9670cf975d26958e754b57098eaa2ac914d8d2a31b83257997b9f346110fd9929181900390910190a160005b9392505050565b6000546001600160a01b03163314611ae2576040805162461bcd60e51b815260206004820152600360248201526243313360e81b604482015290519081900360640190fd5b601580546001600160a01b038381166001600160a01b0319831681179093556040805191909216808252602082019390935281517feda98690e518e9a05f8ec6837663e188211b2da8f4906648b323f2c1d4434e29929181900390910190a15050565b6000546001600160a01b03163314611b8a576040805162461bcd60e51b815260206004820152600360248201526210cc8d60ea1b604482015290519081900360640190fd5b6001600160a01b0381166000908152600960205260409020600381015460ff161515600114611be6576040805162461bcd60e51b815260206004820152600360248201526243323560e81b604482015290519081900360640190fd5b60038101805460ff19169055604080516001600160a01b03841681526000602082015281517f93c1f3e36ed71139f466a4ce8c9751790e2e33f5afb2df0dcfb3aeabe55d5aa2929181900390910190a1611c3e6141aa565b5050565b6001600160a01b03821660009081526009602052604081205460ff16611c95576040805162461bcd60e51b815260206004820152600360248201526210cc4d60ea1b604482015290519081900360640190fd5b600a546001600160a01b0316331480611cb857506000546001600160a01b031633145b611cef576040805162461bcd60e51b815260206004820152600360248201526243313560e81b604482015290519081900360640190fd5b6000546001600160a01b0316331480611d0a57506001821515145b611d41576040805162461bcd60e51b815260206004820152600360248201526221989b60e91b604482015290519081900360640190fd5b6001600160a01b0383166000818152600b6020908152604091829020805486151560ff199091168117909155825193845283830152606090830181905260049083015263135a5b9d60e21b6080830152517f71aec636243f9709bb0007ae15e9afb8150ab01716d75fd7573be5cc096e03b09181900360a00190a150919050565b600a54600160a01b900460ff1681565b50505050565b435b90565b505050505050565b60166020526000908152604090205481565b60065481565b333214611e37576040805162461bcd60e51b815260206004820152600360248201526243313960e81b604482015290519081900360640190fd5b611e3f6141aa565b565b600080600080600080611e568a8a8a8a61456f565b925092509250826011811115611e6857fe5b95509093509150505b9450945094915050565b6001600160a01b0383166000908152600b602052604081205460ff1615611ece576040805162461bcd60e51b8152602060048201526002602482015261219960f11b604482015290519081900360640190fd5b6001600160a01b03841660009081526009602052604090205460ff16611ef85760095b9050611a96565b611f01846148a7565b611f0d84846000614afb565b6000949350505050565b600080546001600160a01b03163314611f3d57611f366001600b614cf3565b90506119eb565b6006805490839055604080518281526020810185905281517faeba5a6c40a8ac138134bff1aaa65debf25971188a58804bad717f82f0ec1316929181900390910190a16000611a96565b80158015611f955750600082115b15611dd2576040805162461bcd60e51b8152602060048201526002602482015261433360f01b604482015290519081900360640190fd5b600d8181548110611fd957fe5b6000918252602090912001546001600160a01b0316905081565b600080546001600160a01b0316331461201257611f3660016010614cf3565b600480546001600160a01b038481166001600160a01b0319831681179093556040805191909216808252602082019390935281517fd52b2b9b7e9ee655fcb95d2e5b9e0c9f69e7ef2b8e9d2d0ea78402d576d22e22929181900390910190a16000611a96565b612080614054565b6120d1576040805162461bcd60e51b815260206004820152601d60248201527f6f6e6c792061646d696e2063616e2073657420636f6d70207370656564000000604482015290519081900360640190fd5b6120da8261278f565b806120f9576001600160a01b0382166000908152601960205260408120555b612101611dd8565b6001600160a01b03831660008181526019602090815260408083209490945560188152908390208490558251848152925191927f386537fa92edc3319af95f1f904dcf1900021e4f3f4e08169a577a09076e66b3929081900390910190a25050565b61156d565b60008060008060008061217f87600080600061456f565b92509250925082601181111561219157fe5b97919650945092505050565b600080546001600160a01b031633146121bc57611f3660016013614cf3565b600a80546001600160a01b038481166001600160a01b0319831617928390556040805192821680845293909116602083015280517f0613b6ee6a04f0d09f390e4d9318894b9f6ac7fd83897cd8d18896ba579c401e9281900390910190a16000611a96565b6001600160a01b03851660009081526009602052604081205460ff16158061226257506001600160a01b03851660009081526009602052604090205460ff16155b156122715760095b905061237d565b60008061227d85614d59565b9193509091506000905082601181111561229357fe5b146122ad578160118111156122a457fe5b9250505061237d565b806122b95760036122a4565b6000886001600160a01b03166395dd9193876040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060206040518083038186803b15801561231157600080fd5b505afa158015612325573d6000803e3d6000fd5b505050506040513d602081101561233b57600080fd5b50516040805160208101909152600554815290915060009061235d9083614d79565b90508086111561237457601194505050505061237d565b60009450505050505b95945050505050565b6000546001600160a01b03163314806123a957506015546001600160a01b031633145b6123e0576040805162461bcd60e51b815260206004820152600360248201526243313160e81b604482015290519081900360640190fd5b828181158015906123f057508082145b612427576040805162461bcd60e51b815260206004820152600360248201526221989960e91b604482015290519081900360640190fd5b60005b828110156124ff5784848281811061243e57fe5b905060200201356016600089898581811061245557fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b031681526020019081526020016000208190555086868281811061249557fe5b905060200201356001600160a01b03166001600160a01b03167f6f1951b2aad10f3fc81b86d91105b413a5b3f847a34bbc5ce1904201b14438f68686848181106124db57fe5b905060200201356040518082815260200191505060405180910390a260010161242a565b50505050505050565b60005b83518110156116cd57600084828151811061252257fe5b6020908102919091018101516001600160a01b0381166000908152600990925260409091205490915060ff16612597576040805162461bcd60e51b81526020600482015260156024820152741b585c9ad95d081b5d5cdd081899481b1a5cdd1959605a1b604482015290519081900360640190fd5b6001841515141561265f576125aa6159ce565b6040518060200160405280836001600160a01b031663aa5af0fd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156125ee57600080fd5b505afa158015612602573d6000803e3d6000fd5b505050506040513d602081101561261857600080fd5b5051905290506126288282613c0c565b60005b875181101561265c576126548389838151811061264457fe5b6020026020010151846001613e6a565b60010161262b565b50505b600183151514156126a857612673816148a7565b60005b86518110156126a65761269e8288838151811061268f57fe5b60200260200101516001614afb565b600101612676565b505b5060010161250b565b6126b9614054565b6126f0576040805162461bcd60e51b815260206004820152600360248201526221991960e91b604482015290519081900360640190fd5b600e805490829055604080518281526020810184905281517fc227c9272633c3a307d9845bf2bc2509cefb20d655b5f3c1002d8e1e3f22c8b0929181900390910190a1611c3e6141aa565b6010602052600090815260409020546001600160e01b03811690600160e01b900463ffffffff1682565b600c6020526000908152604090205460ff1681565b600b6020526000908152604090205460ff1681565b6001600160a01b038116600090815260186020526040812054906127b1611dd8565b6001600160a01b038416600090815260196020526040812054919250906127d9908390614d98565b90506000811180156127eb5750600083115b15611dd25760006127fc8285614dd2565b6001600160a01b038616600090815260146020526040812054919250906128239083614e14565b6001600160a01b0387166000908152601460209081526040808320939093556019905220849055505050505050565b66038d7ea4c6800081565b6004546001600160a01b031681565b600a54600160b01b900460ff1681565b6011602052600090815260409020546001600160e01b03811690600160e01b900463ffffffff1682565b60096020526000908152604090208054600182015460039092015460ff91821692911683565b600a546000906001600160a01b03163314806128f257506000546001600160a01b031633145b612929576040805162461bcd60e51b815260206004820152600360248201526243313560e81b604482015290519081900360640190fd5b6000546001600160a01b031633148061294457506001821515145b61297b576040805162461bcd60e51b815260206004820152600360248201526221989b60e91b604482015290519081900360640190fd5b600a8054831515600160b01b810260ff60b01b1990921691909117909155604080516020810192909252808252600882820152672a3930b739b332b960c11b6060830152517fef159d9a32b2472e32b098f954f3ce62d232939f1c207070b584df1814de2de09181900360800190a15090565b6001600160a01b038082166000908152600960209081526040808320938616835260029093019052205460ff1692915050565b60075481565b60186020526000908152604090205481565b73c00e94cb662c3520282e6f5717214004a7f2688890565b600080546001600160a01b03163314612a7057611f3660016012614cf3565b6001600160a01b03821660009081526009602052604090205460ff1615612a9d57611f36600a6011614cf3565b816001600160a01b031663fe9c44ae6040518163ffffffff1660e01b815260040160206040518083038186803b158015612ad657600080fd5b505afa158015612aea573d6000803e3d6000fd5b505050506040513d6020811015612b0057600080fd5b5050604080516060810182526001808252600060208381018281528486018381526001600160a01b03891684526009909252949091209251835490151560ff19918216178455935191830191909155516003909101805491151591909216179055612b6a82614e4a565b604080516001600160a01b038416815290517fcf583bb0c569eb967f806b11601c4cb93c10310485c67add5f8362c2f212321f9181900360200190a1600092915050565b6ec097ce7bc90715b34b9f100000000081565b600e5481565b60608060086000846001600160a01b03166001600160a01b03168152602001908152602001600020805480602002602001604051908101604052809291908181526020018280548015612c4357602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311612c25575b5093979650505050505050565b600a54600160b81b900460ff1681565b6060600d805480602002602001604051908101604052809291908181526020018280548015612cb857602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311612c9a575b5050505050905090565b601260209081526000928352604080842090915290825290205481565b6002546001600160a01b031681565b600a54600090600160b01b900460ff1615612d35576040805162461bcd60e51b8152602060048201526002602482015261433960f01b604482015290519081900360640190fd5b6000612d42868685614f17565b90508015612d515790506117a4565b612d5a866148a7565b612d6686866000614afb565b61179e86856000614afb565b60196020526000908152604090205481565b6060600082519050606081604051908082528060200260200182016040528015612db8578160200160208202803883390190505b50905060005b82811015612e13576000858281518110612dd457fe5b60200260200101519050612de88133614fc3565b6011811115612df357fe5b838381518110612dff57fe5b602090810291909101015250600101612dbe565b509392505050565b600480546040805163fc57d4df60e01b81526001600160a01b038781169482019490945290516000938493849391169163fc57d4df91602480820192602092909190829003018186803b158015612e7157600080fd5b505afa158015612e85573d6000803e3d6000fd5b505050506040513d6020811015612e9b57600080fd5b5051600480546040805163fc57d4df60e01b81526001600160a01b038a8116948201949094529051939450600093929091169163fc57d4df91602480820192602092909190829003018186803b158015612ef457600080fd5b505afa158015612f08573d6000803e3d6000fd5b505050506040513d6020811015612f1e57600080fd5b50519050811580612f2d575080155b15612f4257600d93506000925061303b915050565b6000866001600160a01b031663182df0f56040518163ffffffff1660e01b815260040160206040518083038186803b158015612f7d57600080fd5b505afa158015612f91573d6000803e3d6000fd5b505050506040513d6020811015612fa757600080fd5b505190506000612fb56159ce565b612fbd6159ce565b612fc56159ce565b612fed604051806020016040528060065481525060405180602001604052808a8152506150b9565b92506130156040518060200160405280888152506040518060200160405280888152506150b9565b915061302183836150f8565b905061302d818b614d79565b600099509750505050505050505b935093915050565b601360209081526000928352604080842090915290825290205481565b60146020526000908152604090205481565b61307a614054565b6130b1576040805162461bcd60e51b815260206004820152600360248201526243323360e81b604482015290519081900360640190fd5b60005b81518110156130e1576130d98282815181106130cc57fe5b6020026020010151615134565b6001016130b4565b506116b86141aa565b600a54600090600160b81b900460ff1615613131576040805162461bcd60e51b8152602060048201526002602482015261086760f31b604482015290519081900360640190fd5b6001600160a01b03861660009081526009602052604090205460ff16158061317257506001600160a01b03851660009081526009602052604090205460ff16155b1561317e57600961226a565b846001600160a01b0316635fe3b5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156131b757600080fd5b505afa1580156131cb573d6000803e3d6000fd5b505050506040513d60208110156131e157600080fd5b505160408051635fe3b56760e01b815290516001600160a01b0392831692891691635fe3b567916004808301926020929190829003018186803b15801561322757600080fd5b505afa15801561323b573d6000803e3d6000fd5b505050506040513d602081101561325157600080fd5b50516001600160a01b03161461326857600261226a565b613271866148a7565b61327d86846000614afb565b61328986856000614afb565b60009695505050505050565b6017546001600160a01b031681565b6001600160a01b0383166000908152600c602052604081205460ff16156132f7576040805162461bcd60e51b815260206004820152600260248201526110cd60f21b604482015290519081900360640190fd5b6001600160a01b03841660009081526009602052604090205460ff1661331e576009611ef1565b6001600160a01b038085166000908152600960209081526040808320938716835260029093019052205460ff166133fb57336001600160a01b03851614613391576040805162461bcd60e51b8152602060048201526002602482015261433560f01b604482015290519081900360640190fd5b600061339d3385614fc3565b905060008160118111156133ad57fe5b146133c6578060118111156133be57fe5b915050611a96565b6001600160a01b038086166000908152600960209081526040808320938816835260029093019052205460ff166133f957fe5b505b600480546040805163fc57d4df60e01b81526001600160a01b03888116948201949094529051929091169163fc57d4df91602480820192602092909190829003018186803b15801561344c57600080fd5b505afa158015613460573d6000803e3d6000fd5b505050506040513d602081101561347657600080fd5b505161348357600d611ef1565b6001600160a01b0384166000908152601660205260409020548015613555576000856001600160a01b03166347bd37186040518163ffffffff1660e01b815260040160206040518083038186803b1580156134dd57600080fd5b505afa1580156134f1573d6000803e3d6000fd5b505050506040513d602081101561350757600080fd5b5051905060006135178286614e14565b9050828110613552576040805162461bcd60e51b8152602060048201526002602482015261433760f01b604482015290519081900360640190fd5b50505b600080613565868860008861456f565b9193509091506000905082601181111561357b57fe5b146135965781601181111561358c57fe5b9350505050611a96565b80156135a357600461358c565b6135ab6159ce565b6040518060200160405280896001600160a01b031663aa5af0fd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156135ef57600080fd5b505afa158015613603573d6000803e3d6000fd5b505050506040513d602081101561361957600080fd5b5051905290506136298882613c0c565b6136368888836000613e6a565b600098975050505050505050565b6008602052816000526040600020818154811061365d57fe5b6000918252602090912001546001600160a01b03169150829050565b6003546001600160a01b031681565b600080546001600160a01b031633146136ae576136a760016006614cf3565b905061150a565b6001600160a01b0383166000908152600960205260409020805460ff166136e3576136db60096007614cf3565b91505061150a565b6136eb6159ce565b5060408051602081019091528381526137026159ce565b506040805160208101909152670c7d713b49da000081526137238183615432565b1561373e5761373460066008614cf3565b935050505061150a565b84158015906137c75750600480546040805163fc57d4df60e01b81526001600160a01b038a8116948201949094529051929091169163fc57d4df91602480820192602092909190829003018186803b15801561379957600080fd5b505afa1580156137ad573d6000803e3d6000fd5b505050506040513d60208110156137c357600080fd5b5051155b156137d857613734600d6009614cf3565b60018301805490869055604080516001600160a01b03891681526020810183905280820188905290517f70483e6592cd5182d45ac970e05bc62cdcc90e9d8ef2c2dbe686cf383bcd7fc59181900360600190a16000979650505050505050565b600a54600160a81b900460ff1681565b60055481565b6116b881600d8054806020026020016040519081016040528092919081815260200182805480156138a857602002820191906000526020600020905b81546001600160a01b0316815260019091019060200180831161388a575b5050505050611510565b6000806138c0858585614f17565b905080156138cf579050611a96565b6138d8856148a7565b6138e485856000614afb565b600095945050505050565b6000808290506000806000836001600160a01b031663c37f68e2336040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060806040518083038186803b15801561395057600080fd5b505afa158015613964573d6000803e3d6000fd5b505050506040513d608081101561397a57600080fd5b5080516020820151604090920151909450909250905082156139c8576040805162461bcd60e51b8152602060048201526002602482015261433160f01b604482015290519081900360640190fd5b80156139e5576139da600c6002614cf3565b9450505050506119eb565b60006139f2873385614f17565b90508015613a1357613a07600e600383615439565b955050505050506119eb565b6001600160a01b0385166000908152600960209081526040808320338452600281019092529091205460ff16613a5257600096505050505050506119eb565b3360009081526002820160209081526040808320805460ff191690556008825291829020805483518184028101840190945280845260609392830182828015613ac457602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311613aa6575b5050835193945083925060009150505b82811015613b1957896001600160a01b0316848281518110613af257fe5b60200260200101516001600160a01b03161415613b1157809150613b19565b600101613ad4565b50818110613b2357fe5b336000908152600860205260409020805481906000198101908110613b4457fe5b9060005260206000200160009054906101000a90046001600160a01b0316818381548110613b6e57fe5b600091825260209091200180546001600160a01b0319166001600160a01b03929092169190911790558054613ba78260001983016159e1565b50604080516001600160a01b038c16815233602082015281517fe699a64c18b07ac5b7301aa273f36a2287239eb9501d81950672794afba29a0d929181900390910190a160009c9b505050505050505050505050565b6000546001600160a01b031681565b6001600160a01b0382166000908152601160209081526040808320600f9092528220549091613c39611dd8565b8354909150600090613c59908390600160e01b900463ffffffff16614d98565b9050600081118015613c6b5750600083115b15613e18576000613ce0876001600160a01b03166347bd37186040518163ffffffff1660e01b815260040160206040518083038186803b158015613cae57600080fd5b505afa158015613cc2573d6000803e3d6000fd5b505050506040513d6020811015613cd857600080fd5b50518761549f565b90506000613cee8386614dd2565b9050613cf86159ce565b60008311613d155760405180602001604052806000815250613d1f565b613d1f82846154bd565b9050613d296159ce565b604080516020810190915288546001600160e01b03168152613d4b90836154f2565b90506040518060400160405280613d8183600001516040518060400160405280600381526020016204332360ec1b815250615517565b6001600160e01b03168152602001613db4886040518060400160405280600381526020016243323160e81b8152506155b1565b63ffffffff9081169091526001600160a01b038c166000908152601160209081526040909120835181549490920151909216600160e01b026001600160e01b039182166001600160e01b0319909416939093171691909117905550611ddd92505050565b8015611ddd57613e43826040518060400160405280600381526020016243323160e81b8152506155b1565b845463ffffffff91909116600160e01b026001600160e01b03909116178455505050505050565b6001600160a01b0384166000908152601160205260409020613e8a6159ce565b50604080516020810190915281546001600160e01b03168152613eab6159ce565b5060408051602080820183526001600160a01b03808a16600090815260138352848120918a16808252828452948120805485528651959091529152919091558051156124ff57613ef96159ce565b613f038383615606565b90506000613f92896001600160a01b03166395dd91938a6040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060206040518083038186803b158015613f6057600080fd5b505afa158015613f74573d6000803e3d6000fd5b505050506040513d6020811015613f8a57600080fd5b50518861549f565b90506000613fa0828461562b565b6001600160a01b038a1660009081526014602052604081205491925090613fc79083614e14565b9050613fe88a828a613fe05766038d7ea4c68000613fe3565b60005b61565a565b6001600160a01b03808c1660008181526014602090815260409182902094909455895181518781529485015280519193928f16927f1fc3ecc087d8d2d15e23d0032af5a47059c3892d003d8e139fdcb6bb327c99a6929081900390910190a35050505050505050505050565b600080546001600160a01b031633148061407857506002546001600160a01b031633145b905090565b600080614088612a39565b604080516370a0823160e01b815230600482015290519192506000916001600160a01b038416916370a08231916024808301926020929190829003018186803b1580156140d457600080fd5b505afa1580156140e8573d6000803e3d6000fd5b505050506040513d60208110156140fe57600080fd5b505190508084116141a157816001600160a01b031663a9059cbb86866040518363ffffffff1660e01b815260040180836001600160a01b03166001600160a01b0316815260200182815260200192505050602060405180830381600087803b15801561416957600080fd5b505af115801561417d573d6000803e3d6000fd5b505050506040513d602081101561419357600080fd5b506000935061150a92505050565b50919392505050565b6060600d80548060200260200160405190810160405280929190818152602001828054801561420257602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116141e4575b50939450600093505050505b81518110156142c857600082828151811061422557fe5b602002602001015190506142376159ce565b6040518060200160405280836001600160a01b031663aa5af0fd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561427b57600080fd5b505afa15801561428f573d6000803e3d6000fd5b505050506040513d60208110156142a557600080fd5b5051905290506142b4826148a7565b6142be8282613c0c565b505060010161420e565b506142d16159ce565b6040518060200160405280600081525090506060825160405190808252806020026020018201604052801561432057816020015b61430d6159ce565b8152602001906001900390816143055790505b50905060005b83518110156144a657600084828151811061433d57fe5b6020908102919091018101516001600160a01b0381166000908152600990925260409091206003015490915060ff161561449d576143796159ce565b60408051602080820180845260045463fc57d4df60e01b9091526001600160a01b03868116602485015293519293849391169163fc57d4df916044808601929190818703018186803b1580156143ce57600080fd5b505afa1580156143e2573d6000803e3d6000fd5b505050506040513d60208110156143f857600080fd5b5051905290506144066159ce565b61447482846001600160a01b03166347bd37186040518163ffffffff1660e01b815260040160206040518083038186803b15801561444357600080fd5b505afa158015614457573d6000803e3d6000fd5b505050506040513d602081101561446d57600080fd5b505161579f565b90508085858151811061448357fe5b602002602001018190525061449886826154f2565b955050505b50600101614326565b5060005b8351811015611dd2576000600d82815481106144c257fe5b600091825260208220015485516001600160a01b0390911692506144e757600061450f565b61450f600e5461450a8686815181106144fc57fe5b6020026020010151886150f8565b6157c0565b6001600160a01b0383166000818152600f60209081526040918290208490558151848152915193945091927f2ab93f65628379309f36cb125e90d7c902454a545c4f8b8cb0794af75c24b807929181900390910190a250506001016144aa565b600080600061457c615a05565b6001600160a01b038816600090815260086020908152604080832080548251818502810185019093528083526060938301828280156145e457602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116145c6575b50939450600093505050505b815181101561486857600082828151811061460757fe5b60200260200101519050806001600160a01b031663c37f68e28d6040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060806040518083038186803b15801561466757600080fd5b505afa15801561467b573d6000803e3d6000fd5b505050506040513d608081101561469157600080fd5b508051602082015160408084015160609485015160808b01529389019390935291870191909152935083156146d65750600f965060009550859450611e719350505050565b60408051602080820183526001600160a01b0380851660008181526009845285902060010154845260c08a01939093528351808301855260808a0151815260e08a015260048054855163fc57d4df60e01b815291820194909452935192169263fc57d4df9260248083019392829003018186803b15801561475657600080fd5b505afa15801561476a573d6000803e3d6000fd5b505050506040513d602081101561478057600080fd5b505160a086018190526147a35750600d965060009550859450611e719350505050565b604080516020810190915260a0860151815261010086015260c085015160e08601516147dd916147d2916150b9565b8661010001516150b9565b6101208601819052604086015186516147f79291906157d9565b8552610100850151606086015160208701516148149291906157d9565b60208601526001600160a01b03818116908c16141561485f576148418561012001518b87602001516157d9565b60208601819052610100860151614859918b906157d9565b60208601525b506001016145f0565b5060208301518351111561488e5750506020810151905160009450039150829050611e71565b5050805160209091015160009450849350039050611e71565b6001600160a01b0381166000908152601060209081526040808320600f90925282205490916148d4611dd8565b83549091506000906148f4908390600160e01b900463ffffffff16614d98565b90506000811180156149065750600083115b15614aaa576000856001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561494657600080fd5b505afa15801561495a573d6000803e3d6000fd5b505050506040513d602081101561497057600080fd5b5051905060006149808386614dd2565b905061498a6159ce565b600083116149a757604051806020016040528060008152506149b1565b6149b182846154bd565b90506149bb6159ce565b604080516020810190915288546001600160e01b031681526149dd90836154f2565b90506040518060400160405280614a1383600001516040518060400160405280600381526020016204332360ec1b815250615517565b6001600160e01b03168152602001614a46886040518060400160405280600381526020016243323160e81b8152506155b1565b63ffffffff9081169091526001600160a01b038b166000908152601060209081526040909120835181549490920151909216600160e01b026001600160e01b039182166001600160e01b03199094169390931716919091179055506116cd92505050565b80156116cd57614ad5826040518060400160405280600381526020016243323160e81b8152506155b1565b845463ffffffff91909116600160e01b026001600160e01b039091161784555050505050565b6001600160a01b0383166000908152601060205260409020614b1b6159ce565b50604080516020810190915281546001600160e01b03168152614b3c6159ce565b5060408051602080820183526001600160a01b03808916600090815260128352848120918916808252828452948120805485528651959091529152919091558051158015614b8a5750815115155b15614ba2576ec097ce7bc90715b34b9f100000000081525b614baa6159ce565b614bb48383615606565b90506000876001600160a01b03166370a08231886040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060206040518083038186803b158015614c0e57600080fd5b505afa158015614c22573d6000803e3d6000fd5b505050506040513d6020811015614c3857600080fd5b505190506000614c48828461562b565b6001600160a01b03891660009081526014602052604081205491925090614c6f9083614e14565b9050614c8889828a613fe05766038d7ea4c68000613fe3565b6001600160a01b03808b1660008181526014602090815260409182902094909455895181518781529485015280519193928e16927f2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a929081900390910190a350505050505050505050565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0836011811115614d2257fe5b836013811115614d2e57fe5b604080519283526020830191909152600082820152519081900360600190a1826011811115611a9657fe5b6000806000614d6c84600080600061456f565b9250925092509193909250565b6000614d836159ce565b614d8d848461579f565b90506117a481615801565b6000611a968383604051806040016040528060158152602001747375627472616374696f6e20756e646572666c6f7760581b815250615810565b6000611a9683836040518060400160405280601781526020017f6d756c7469706c69636174696f6e206f766572666c6f7700000000000000000081525061586a565b6000611a968383604051806040016040528060118152602001706164646974696f6e206f766572666c6f7760781b8152506158e9565b60005b600d54811015614ec457816001600160a01b0316600d8281548110614e6e57fe5b6000918252602090912001546001600160a01b03161415614ebc576040805162461bcd60e51b815260206004820152600360248201526204331360ec1b604482015290519081900360640190fd5b600101614e4d565b50600d80546001810182556000919091527fd7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb50180546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03831660009081526009602052604081205460ff16614f3e576009611ef1565b6001600160a01b038085166000908152600960209081526040808320938716835260029093019052205460ff16614f76576000611ef1565b600080614f86858786600061456f565b91935090915060009050826011811115614f9c57fe5b14614fb657816011811115614fad57fe5b92505050611a96565b8015613289576004614fad565b6001600160a01b0382166000908152600960205260408120805460ff16614fee57600991505061150a565b6001600160a01b038316600090815260028201602052604090205460ff1615156001141561502057600091505061150a565b6001600160a01b0380841660008181526002840160209081526040808320805460ff19166001908117909155600883528184208054918201815584529282902090920180549489166001600160a01b031990951685179055815193845283019190915280517f3ab23ab0d51cccc0c3085aec51f99228625aa1a922b3a8ca89a26b0f2027a1a59281900390910190a15060009392505050565b6150c16159ce565b6040518060200160405280670de0b6b3a76400006150e786600001518660000151614dd2565b816150ee57fe5b0490529392505050565b6151006159ce565b604051806020016040528061512b6151248660000151670de0b6b3a7640000614dd2565b855161593e565b90529392505050565b6001600160a01b0381166000908152600960205260409020805460ff1615156001146151a7576040805162461bcd60e51b815260206004820152601960248201527f636f6d70206d61726b6574206973206e6f74206c697374656400000000000000604482015290519081900360640190fd5b600381015460ff16156151ec576040805162461bcd60e51b81526020600482015260086024820152670636f6d70204331360c41b604482015290519081900360640190fd5b60038101805460ff19166001908117909155604080516001600160a01b0385168152602081019290925280517f93c1f3e36ed71139f466a4ce8c9751790e2e33f5afb2df0dcfb3aeabe55d5aa29281900390910190a16001600160a01b0382166000908152601060205260409020546001600160e01b031615801561529457506001600160a01b038216600090815260106020526040902054600160e01b900463ffffffff16155b156153495760405180604001604052806ec097ce7bc90715b34b9f10000000006001600160e01b031681526020016152ee6152cd611dd8565b6040518060400160405280600381526020016243323160e81b8152506155b1565b63ffffffff9081169091526001600160a01b0384166000908152601060209081526040909120835181549490920151909216600160e01b026001600160e01b039182166001600160e01b031990941693909317169190911790555b6001600160a01b0382166000908152601160205260409020546001600160e01b031615801561539b57506001600160a01b038216600090815260116020526040902054600160e01b900463ffffffff16155b15611c3e5760405180604001604052806ec097ce7bc90715b34b9f10000000006001600160e01b031681526020016153d46152cd611dd8565b63ffffffff9081169091526001600160a01b0384166000908152601160209081526040909120835181549490920151909216600160e01b026001600160e01b039182166001600160e01b031990941693909317169190911790555050565b5190511090565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa084601181111561546857fe5b84601381111561547457fe5b604080519283526020830191909152818101859052519081900360600190a18360118111156117a457fe5b6000611a966154b684670de0b6b3a7640000614dd2565b835161593e565b6154c56159ce565b604051806020016040528061512b6154ec866ec097ce7bc90715b34b9f1000000000614dd2565b8561593e565b6154fa6159ce565b604051806020016040528061512b85600001518560000151614e14565b600081600160e01b84106155a95760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561556e578181015183820152602001615556565b50505050905090810190601f16801561559b5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b509192915050565b600081600160201b84106155a95760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561556e578181015183820152602001615556565b61560e6159ce565b604051806020016040528061512b85600001518560000151614d98565b60006ec097ce7bc90715b34b9f100000000061564b848460000151614dd2565b8161565257fe5b049392505050565b600081831015801561566c5750600083115b1561579757600061567b612a39565b604080516370a0823160e01b815230600482015290519192506000916001600160a01b038416916370a08231916024808301926020929190829003018186803b1580156156c757600080fd5b505afa1580156156db573d6000803e3d6000fd5b505050506040513d60208110156156f157600080fd5b5051905080851161579457816001600160a01b031663a9059cbb87876040518363ffffffff1660e01b815260040180836001600160a01b03166001600160a01b0316815260200182815260200192505050602060405180830381600087803b15801561575c57600080fd5b505af1158015615770573d6000803e3d6000fd5b505050506040513d602081101561578657600080fd5b5060009350611a9692505050565b50505b509092915050565b6157a76159ce565b604051806020016040528061512b856000015185614dd2565b6000670de0b6b3a764000061564b848460000151614dd2565b60006157e36159ce565b6157ed858561579f565b905061237d6157fb82615801565b84614e14565b51670de0b6b3a7640000900490565b600081848411156158625760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561556e578181015183820152602001615556565b505050900390565b6000831580615877575082155b1561588457506000611a96565b8383028385828161589157fe5b041483906158e05760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561556e578181015183820152602001615556565b50949350505050565b600083830182858210156158e05760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561556e578181015183820152602001615556565b6000611a9683836040518060400160405280600e81526020016d646976696465206279207a65726f60901b815250600081836159bb5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561556e578181015183820152602001615556565b508284816159c557fe5b04949350505050565b6040518060200160405280600081525090565b81548183558181111561156d5760008381526020902061156d918101908301615a6f565b604051806101400160405280600081526020016000815260200160008152602001600081526020016000815260200160008152602001615a436159ce565b8152602001615a506159ce565b8152602001615a5d6159ce565b8152602001615a6a6159ce565b905290565b611dda91905b80821115615a895760008155600101615a75565b509056fea265627a7a723158203b572cbde865aef8c70a29acf721afae5a2cbedbbe10de7ba62cec611fdc181064736f6c63430005100032";
var linkReferences$6 = {
};
var deployedLinkReferences$6 = {
};
var ComptrollerArtifact = {
	_format: _format$6,
	contractName: contractName$6,
	sourceName: sourceName$6,
	abi: abi$6,
	bytecode: bytecode$6,
	deployedBytecode: deployedBytecode$6,
	linkReferences: linkReferences$6,
	deployedLinkReferences: deployedLinkReferences$6
};

var Comptroller = function () {
  function Comptroller(contractAddress, tropykus) {
    _classCallCheck(this, Comptroller);
    this.tropykus = tropykus;
    this.instance = new ethers.Contract(contractAddress, ComptrollerArtifact.abi, this.tropykus.ethersProvider);
  }
  _createClass(Comptroller, [{
    key: "allMarkets",
    value: function allMarkets() {
      var _this = this;
      return new Promise(function (resolve, reject) {
        _this.instance.callStatic.getAllMarkets().then(resolve)["catch"](reject);
      });
    }
  }, {
    key: "getAssetsIn",
    value: function getAssetsIn(account) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        _this2.instance.callStatic.getAssetsIn(account.address).then(resolve)["catch"](reject);
      });
    }
  }, {
    key: "enterMarkets",
    value: function enterMarkets(account, marketAddresses) {
      var _this3 = this;
      return new Promise(function (resolve, reject) {
        _this3.instance.connect(account).enterMarkets(marketAddresses).then(resolve)["catch"](reject);
      });
    }
  }, {
    key: "supportMarket",
    value: function supportMarket(marketAddresses) {
      var _this4 = this;
      return new Promise(function (resolve, reject) {
        _this4.instance.connect(_this4.tropykus.account)._supportMarket(marketAddresses).then(resolve)["catch"](reject);
      });
    }
  }, {
    key: "setCollateralFactor",
    value: function setCollateralFactor(marketAddresses, collateralFactor) {
      var _this5 = this;
      return new Promise(function (resolve, reject) {
        _this5.instance.connect(_this5.tropykus.account)._setCollateralFactor(marketAddresses, ethers.utils.parseEther(collateralFactor.toString())).then(resolve)["catch"](reject);
      });
    }
  }, {
    key: "become",
    value: function become(unitrollerAddress) {
      var _this6 = this;
      return new Promise(function (resolve, reject) {
        _this6.instance.connect(_this6.tropykus.account)._become(unitrollerAddress).then(resolve)["catch"](reject);
      });
    }
  }, {
    key: "setOracle",
    value: function setOracle(priceOracleAddress) {
      var _this7 = this;
      return new Promise(function (resolve, reject) {
        _this7.instance.connect(_this7.tropykus.account)._setPriceOracle(priceOracleAddress).then(resolve)["catch"](reject);
      });
    }
  }, {
    key: "setCloseFactor",
    value: function setCloseFactor(closeFactor) {
      var _this8 = this;
      return new Promise(function (resolve, reject) {
        _this8.instance.connect(_this8.tropykus.account)._setCloseFactor(ethers.utils.parseEther(closeFactor.toString())).then(resolve)["catch"](reject);
      });
    }
  }, {
    key: "setLiquidationIncentive",
    value: function setLiquidationIncentive(liquidationIncentive) {
      var _this9 = this;
      return new Promise(function (resolve, reject) {
        _this9.instance.connect(_this9.tropykus.account)._setLiquidationIncentive(ethers.utils.parseEther(liquidationIncentive.toString())).then(resolve)["catch"](reject);
      });
    }
  }]);
  return Comptroller;
}();

var _format$5 = "hh-sol-artifact-1";
var contractName$5 = "PriceOracleProxy";
var sourceName$5 = "contracts/PriceOracleProxy.sol";
var abi$5 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "guardian_",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldGuardian",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newGuardian",
				type: "address"
			}
		],
		name: "NewGuardian",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldPendingGuardian",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newPendingGuardian",
				type: "address"
			}
		],
		name: "NewPendingGuardian",
		type: "event"
	},
	{
		constant: false,
		inputs: [
		],
		name: "_acceptAdmin",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "newPendingGuardian",
				type: "address"
			}
		],
		name: "_setPendingAdmin",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "cTokenArrayCount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "cTokensArray",
		outputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "string",
				name: "cTokenName",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			}
		],
		name: "getUnderlyingPrice",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "guardian",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "isPriceOracle",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "pendingGuardian",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "addressToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "addressAdapter",
				type: "address"
			}
		],
		name: "setAdapterToToken",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "tokenAdapter",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];
var bytecode$5 = "0x608060405234801561001057600080fd5b50604051610b79380380610b798339818101604052602081101561003357600080fd5b5051600080546001600160a01b039092166001600160a01b0319909216919091179055610b14806100656000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c8063762c31ba11610066578063762c31ba146101db5780637bdef09d146101e3578063b71d1a0c14610209578063e9c714f21461022f578063fc57d4df146102375761009e565b8063452a9320146100a3578063540399da146100c7578063639a0df7146100e157806366331bba1461018f57806372a74ed5146101ab575b600080fd5b6100ab61025d565b604080516001600160a01b039092168252519081900360200190f35b6100cf61026c565b60408051918252519081900360200190f35b6100fe600480360360208110156100f757600080fd5b5035610273565b60405180836001600160a01b03166001600160a01b0316815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561015357818101518382015260200161013b565b50505050905090810190601f1680156101805780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b610197610335565b604080519115158252519081900360200190f35b6101d9600480360360408110156101c157600080fd5b506001600160a01b038135811691602001351661033a565b005b6100ab610641565b6100ab600480360360208110156101f957600080fd5b50356001600160a01b0316610650565b6101d96004803603602081101561021f57600080fd5b50356001600160a01b031661066b565b6101d961075e565b6100cf6004803603602081101561024d57600080fd5b50356001600160a01b031661089a565b6000546001600160a01b031681565b6003545b90565b6003818154811061028057fe5b600091825260209182902060029182020180546001808301805460408051601f600019958416156101000295909501909216969096049283018790048702810187019095528185526001600160a01b039092169550919390919083018282801561032b5780601f106103005761010080835404028352916020019161032b565b820191906000526020600020905b81548152906001019060200180831161030e57829003601f168201915b5050505050905082565b600181565b6000546001600160a01b031633146103835760405162461bcd60e51b8152600401808060200182810382526033815260200180610a2e6033913960400191505060405180910390fd5b6001600160a01b0382166103c85760405162461bcd60e51b815260040180806020018281038252602c815260200180610a02602c913960400191505060405180910390fd5b6001600160a01b03811661040d5760405162461bcd60e51b815260040180806020018281038252602e815260200180610a8d602e913960400191505060405180910390fd5b6001600160a01b038281166000908152600260205260409020541661061357610434610951565b6040518060400160405280846001600160a01b03168152602001846001600160a01b03166395d89b416040518163ffffffff1660e01b815260040160006040518083038186803b15801561048757600080fd5b505afa15801561049b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405260208110156104c457600080fd5b81019080805160405193929190846401000000008211156104e457600080fd5b9083019060208201858111156104f957600080fd5b825164010000000081118282018810171561051357600080fd5b82525081516020918201929091019080838360005b83811015610540578181015183820152602001610528565b50505050905090810190601f16801561056d5780820380516001836020036101000a031916815260200191505b5060405250505090526003805460018101808355600092909252825160029091027fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b810180546001600160a01b039093166001600160a01b031990931692909217825560208085015180519596509394869461060d937fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85c01920190610969565b50505050505b6001600160a01b03918216600090815260026020526040902080546001600160a01b03191691909216179055565b6001546001600160a01b031681565b6002602052600090815260409020546001600160a01b031681565b6000546001600160a01b031633146106b45760405162461bcd60e51b8152600401808060200182810382526033815260200180610a2e6033913960400191505060405180910390fd5b6001600160a01b0381166106f95760405162461bcd60e51b815260040180806020018281038252602c815260200180610a61602c913960400191505060405180910390fd5b600054600180546001600160a01b0319166001600160a01b0384811691821790925560408051929093168083526020830191909152825190927f82b7d5b540b091a495b35b109d1fff4d3128e7c81e8b8277c9167628f10a0e0b928290030190a15050565b6001546001600160a01b031633146107a75760405162461bcd60e51b8152600401808060200182810382526033815260200180610a2e6033913960400191505060405180910390fd5b336107e35760405162461bcd60e51b8152600401808060200182810382526025815260200180610abb6025913960400191505060405180910390fd5b60008054600180546001600160a01b038082166001600160a01b031980861682179687905590921690925560408051938316808552949092166020840152815190927f08fdaf06427a2010e5958f4329b566993472d14ce81d3f16ce7f2a2660da98e392908290030190a1600154604080516001600160a01b038085168252909216602083015280517f82b7d5b540b091a495b35b109d1fff4d3128e7c81e8b8277c9167628f10a0e0b9281900390910190a15050565b6001600160a01b03808216600090815260026020526040812054909116806108c657600091505061094c565b806001600160a01b0316635e9a523c846040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060206040518083038186803b15801561091c57600080fd5b505afa158015610930573d6000803e3d6000fd5b505050506040513d602081101561094657600080fd5b50519150505b919050565b60408051808201909152600081526060602082015290565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106109aa57805160ff19168380011785556109d7565b828001600101855582156109d7579182015b828111156109d75782518255916020019190600101906109bc565b506109e39291506109e7565b5090565b61027091905b808211156109e357600081556001016109ed56fe50726963654f7261636c6550726f78793a206164647265737320746f6b656e2063616e206e6f74206265203050726963654f7261636c6550726f78793a206f6e6c7920677561726469616e206d61792073657420746865206164647265737350726963654f7261636c6550726f78793a20616464726573732061646d696e2063616e206e6f74206265203050726963654f7261636c6550726f78793a206164647265737320616461707465722063616e206e6f74206265203050726963654f7261636c6550726f78793a2073656e6465722063616e206e6f742062652030a265627a7a72315820157d36da2ce29ca22955acf3aa333261f286037704abd5b9dce43129917ca2e764736f6c63430005100032";
var deployedBytecode$5 = "0x608060405234801561001057600080fd5b506004361061009e5760003560e01c8063762c31ba11610066578063762c31ba146101db5780637bdef09d146101e3578063b71d1a0c14610209578063e9c714f21461022f578063fc57d4df146102375761009e565b8063452a9320146100a3578063540399da146100c7578063639a0df7146100e157806366331bba1461018f57806372a74ed5146101ab575b600080fd5b6100ab61025d565b604080516001600160a01b039092168252519081900360200190f35b6100cf61026c565b60408051918252519081900360200190f35b6100fe600480360360208110156100f757600080fd5b5035610273565b60405180836001600160a01b03166001600160a01b0316815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561015357818101518382015260200161013b565b50505050905090810190601f1680156101805780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b610197610335565b604080519115158252519081900360200190f35b6101d9600480360360408110156101c157600080fd5b506001600160a01b038135811691602001351661033a565b005b6100ab610641565b6100ab600480360360208110156101f957600080fd5b50356001600160a01b0316610650565b6101d96004803603602081101561021f57600080fd5b50356001600160a01b031661066b565b6101d961075e565b6100cf6004803603602081101561024d57600080fd5b50356001600160a01b031661089a565b6000546001600160a01b031681565b6003545b90565b6003818154811061028057fe5b600091825260209182902060029182020180546001808301805460408051601f600019958416156101000295909501909216969096049283018790048702810187019095528185526001600160a01b039092169550919390919083018282801561032b5780601f106103005761010080835404028352916020019161032b565b820191906000526020600020905b81548152906001019060200180831161030e57829003601f168201915b5050505050905082565b600181565b6000546001600160a01b031633146103835760405162461bcd60e51b8152600401808060200182810382526033815260200180610a2e6033913960400191505060405180910390fd5b6001600160a01b0382166103c85760405162461bcd60e51b815260040180806020018281038252602c815260200180610a02602c913960400191505060405180910390fd5b6001600160a01b03811661040d5760405162461bcd60e51b815260040180806020018281038252602e815260200180610a8d602e913960400191505060405180910390fd5b6001600160a01b038281166000908152600260205260409020541661061357610434610951565b6040518060400160405280846001600160a01b03168152602001846001600160a01b03166395d89b416040518163ffffffff1660e01b815260040160006040518083038186803b15801561048757600080fd5b505afa15801561049b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405260208110156104c457600080fd5b81019080805160405193929190846401000000008211156104e457600080fd5b9083019060208201858111156104f957600080fd5b825164010000000081118282018810171561051357600080fd5b82525081516020918201929091019080838360005b83811015610540578181015183820152602001610528565b50505050905090810190601f16801561056d5780820380516001836020036101000a031916815260200191505b5060405250505090526003805460018101808355600092909252825160029091027fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b810180546001600160a01b039093166001600160a01b031990931692909217825560208085015180519596509394869461060d937fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85c01920190610969565b50505050505b6001600160a01b03918216600090815260026020526040902080546001600160a01b03191691909216179055565b6001546001600160a01b031681565b6002602052600090815260409020546001600160a01b031681565b6000546001600160a01b031633146106b45760405162461bcd60e51b8152600401808060200182810382526033815260200180610a2e6033913960400191505060405180910390fd5b6001600160a01b0381166106f95760405162461bcd60e51b815260040180806020018281038252602c815260200180610a61602c913960400191505060405180910390fd5b600054600180546001600160a01b0319166001600160a01b0384811691821790925560408051929093168083526020830191909152825190927f82b7d5b540b091a495b35b109d1fff4d3128e7c81e8b8277c9167628f10a0e0b928290030190a15050565b6001546001600160a01b031633146107a75760405162461bcd60e51b8152600401808060200182810382526033815260200180610a2e6033913960400191505060405180910390fd5b336107e35760405162461bcd60e51b8152600401808060200182810382526025815260200180610abb6025913960400191505060405180910390fd5b60008054600180546001600160a01b038082166001600160a01b031980861682179687905590921690925560408051938316808552949092166020840152815190927f08fdaf06427a2010e5958f4329b566993472d14ce81d3f16ce7f2a2660da98e392908290030190a1600154604080516001600160a01b038085168252909216602083015280517f82b7d5b540b091a495b35b109d1fff4d3128e7c81e8b8277c9167628f10a0e0b9281900390910190a15050565b6001600160a01b03808216600090815260026020526040812054909116806108c657600091505061094c565b806001600160a01b0316635e9a523c846040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060206040518083038186803b15801561091c57600080fd5b505afa158015610930573d6000803e3d6000fd5b505050506040513d602081101561094657600080fd5b50519150505b919050565b60408051808201909152600081526060602082015290565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106109aa57805160ff19168380011785556109d7565b828001600101855582156109d7579182015b828111156109d75782518255916020019190600101906109bc565b506109e39291506109e7565b5090565b61027091905b808211156109e357600081556001016109ed56fe50726963654f7261636c6550726f78793a206164647265737320746f6b656e2063616e206e6f74206265203050726963654f7261636c6550726f78793a206f6e6c7920677561726469616e206d61792073657420746865206164647265737350726963654f7261636c6550726f78793a20616464726573732061646d696e2063616e206e6f74206265203050726963654f7261636c6550726f78793a206164647265737320616461707465722063616e206e6f74206265203050726963654f7261636c6550726f78793a2073656e6465722063616e206e6f742062652030a265627a7a72315820157d36da2ce29ca22955acf3aa333261f286037704abd5b9dce43129917ca2e764736f6c63430005100032";
var linkReferences$5 = {
};
var deployedLinkReferences$5 = {
};
var PriceOracleProxyArtifact = {
	_format: _format$5,
	contractName: contractName$5,
	sourceName: sourceName$5,
	abi: abi$5,
	bytecode: bytecode$5,
	deployedBytecode: deployedBytecode$5,
	linkReferences: linkReferences$5,
	deployedLinkReferences: deployedLinkReferences$5
};

var PriceOracle = function () {
  function PriceOracle(contractAddress, tropykus) {
    _classCallCheck(this, PriceOracle);
    this.tropykus = tropykus;
    this.instance = new ethers.Contract(contractAddress, PriceOracleProxyArtifact.abi, this.tropykus.ethersProvider);
  }
  _createClass(PriceOracle, [{
    key: "setAdapterToToken",
    value: function setAdapterToToken(marketAddress, adapterMarketAddress) {
      var _this = this;
      return new Promise(function (resolve, reject) {
        _this.instance.connect(_this.tropykus.account).setAdapterToToken(marketAddress, adapterMarketAddress).then(resolve)["catch"](reject);
      });
    }
  }]);
  return PriceOracle;
}();

var _format$4 = "hh-sol-artifact-1";
var contractName$4 = "CRBTC";
var sourceName$4 = "contracts/CRBTC.sol";
var abi$4 = [
	{
		inputs: [
			{
				internalType: "contract ComptrollerInterface",
				name: "comptroller_",
				type: "address"
			},
			{
				internalType: "contract InterestRateModel",
				name: "interestRateModel_",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "initialExchangeRateMantissa_",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "name_",
				type: "string"
			},
			{
				internalType: "string",
				name: "symbol_",
				type: "string"
			},
			{
				internalType: "uint8",
				name: "decimals_",
				type: "uint8"
			},
			{
				internalType: "address payable",
				name: "admin_",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "cashPrior",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "interestAccumulated",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "borrowIndex",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "totalBorrows",
				type: "uint256"
			}
		],
		name: "AccrueInterest",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "borrowAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "accountBorrows",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "totalBorrows",
				type: "uint256"
			}
		],
		name: "Borrow",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "error",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "info",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "detail",
				type: "uint256"
			}
		],
		name: "Failure",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "liquidator",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "repayAmount",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "cTokenCollateral",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "seizeTokens",
				type: "uint256"
			}
		],
		name: "LiquidateBorrow",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "minter",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "mintAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "mintTokens",
				type: "uint256"
			}
		],
		name: "Mint",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldAdmin",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newAdmin",
				type: "address"
			}
		],
		name: "NewAdmin",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract ComptrollerInterface",
				name: "oldComptroller",
				type: "address"
			},
			{
				indexed: false,
				internalType: "contract ComptrollerInterface",
				name: "newComptroller",
				type: "address"
			}
		],
		name: "NewComptroller",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract InterestRateModel",
				name: "oldInterestRateModel",
				type: "address"
			},
			{
				indexed: false,
				internalType: "contract InterestRateModel",
				name: "newInterestRateModel",
				type: "address"
			}
		],
		name: "NewMarketInterestRateModel",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldPendingAdmin",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newPendingAdmin",
				type: "address"
			}
		],
		name: "NewPendingAdmin",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "oldReserveFactorMantissa",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newReserveFactorMantissa",
				type: "uint256"
			}
		],
		name: "NewReserveFactor",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "redeemer",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "redeemAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "redeemTokens",
				type: "uint256"
			}
		],
		name: "Redeem",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "payer",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "repayAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "accountBorrows",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "totalBorrows",
				type: "uint256"
			}
		],
		name: "RepayBorrow",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "benefactor",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "addAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newTotalReserves",
				type: "uint256"
			}
		],
		name: "ReservesAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "admin",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "reduceAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newTotalReserves",
				type: "uint256"
			}
		],
		name: "ReservesReduced",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "benefactor",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "addAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newSubsidyFund",
				type: "uint256"
			}
		],
		name: "SubsidyAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		payable: true,
		stateMutability: "payable",
		type: "fallback"
	},
	{
		constant: false,
		inputs: [
		],
		name: "_acceptAdmin",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "reduceAmount",
				type: "uint256"
			}
		],
		name: "_reduceReserves",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract ComptrollerInterface",
				name: "newComptroller",
				type: "address"
			}
		],
		name: "_setComptroller",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract InterestRateModel",
				name: "newInterestRateModel",
				type: "address"
			}
		],
		name: "_setInterestRateModel",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address payable",
				name: "newPendingAdmin",
				type: "address"
			}
		],
		name: "_setPendingAdmin",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "newReserveFactorMantissa",
				type: "uint256"
			}
		],
		name: "_setReserveFactor",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "accrualBlockNumber",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "accrueInterest",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "addSubsidy",
		outputs: [
		],
		payable: true,
		stateMutability: "payable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "admin",
		outputs: [
			{
				internalType: "address payable",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOfUnderlying",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "borrowAmount",
				type: "uint256"
			}
		],
		name: "borrow",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "borrowBalanceCurrent",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "borrowBalanceStored",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "borrowIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "borrowRatePerBlock",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "comptroller",
		outputs: [
			{
				internalType: "contract ComptrollerInterface",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "exchangeRateCurrent",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "exchangeRateStored",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "getAccountSnapshot",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "getBorrowerPrincipalStored",
		outputs: [
			{
				internalType: "uint256",
				name: "borrowed",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getCash",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "getSupplierSnapshotStored",
		outputs: [
			{
				internalType: "uint256",
				name: "tokens",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "underlyingAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "suppliedAt",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "promisedSupplyRate",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "initialExchangeRateMantissa",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract ComptrollerInterface",
				name: "comptroller_",
				type: "address"
			},
			{
				internalType: "contract InterestRateModel",
				name: "interestRateModel_",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "initialExchangeRateMantissa_",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "name_",
				type: "string"
			},
			{
				internalType: "string",
				name: "symbol_",
				type: "string"
			},
			{
				internalType: "uint8",
				name: "decimals_",
				type: "uint8"
			}
		],
		name: "initialize",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "interestRateModel",
		outputs: [
			{
				internalType: "contract InterestRateModel",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "isCToken",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "contract CToken",
				name: "cTokenCollateral",
				type: "address"
			}
		],
		name: "liquidateBorrow",
		outputs: [
		],
		payable: true,
		stateMutability: "payable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "mint",
		outputs: [
		],
		payable: true,
		stateMutability: "payable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "pendingAdmin",
		outputs: [
			{
				internalType: "address payable",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "redeemTokens",
				type: "uint256"
			}
		],
		name: "redeem",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "redeemAmount",
				type: "uint256"
			}
		],
		name: "redeemUnderlying",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "repayBorrow",
		outputs: [
		],
		payable: true,
		stateMutability: "payable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "repayBorrowAll",
		outputs: [
		],
		payable: true,
		stateMutability: "payable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			}
		],
		name: "repayBorrowBehalf",
		outputs: [
		],
		payable: true,
		stateMutability: "payable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "reserveFactorMantissa",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "liquidator",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "seizeTokens",
				type: "uint256"
			}
		],
		name: "seize",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "crbtcCompanion_",
				type: "address"
			}
		],
		name: "setCompanion",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "subsidyFund",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "supplyRatePerBlock",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalBorrows",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "totalBorrowsCurrent",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalReserves",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "dst",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "src",
				type: "address"
			},
			{
				internalType: "address",
				name: "dst",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "tropykusInterestAccrued",
		outputs: [
			{
				internalType: "enum CarefulMath.MathError",
				name: "",
				type: "uint8"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];
var bytecode$4 = "0x60806040523480156200001157600080fd5b506040516200639638038062006396833981810160405260e08110156200003757600080fd5b8151602083015160408085015160608601805192519496939591949391820192846401000000008211156200006b57600080fd5b9083019060208201858111156200008157600080fd5b82516401000000008111828201881017156200009c57600080fd5b82525081516020918201929091019080838360005b83811015620000cb578181015183820152602001620000b1565b50505050905090810190601f168015620000f95780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200011d57600080fd5b9083019060208201858111156200013357600080fd5b82516401000000008111828201881017156200014e57600080fd5b82525081516020918201929091019080838360005b838110156200017d57818101518382015260200162000163565b50505050905090810190601f168015620001ab5780820380516001836020036101000a031916815260200191505b506040908152602082015191015160038054610100600160a81b03191633610100021790559092509050620001e587878787878762000218565b600380546001600160a01b0390921661010002610100600160a81b031990921691909117905550620007ec945050505050565b60035461010090046001600160a01b0316331462000262576040805162461bcd60e51b8152602060048201526002602482015261543160f01b604482015290519081900360640190fd5b600954158015620002735750600a54155b620002aa576040805162461bcd60e51b81526020600482015260026024820152612a1960f11b604482015290519081900360640190fd5b600784905583620002e7576040805162461bcd60e51b8152602060048201526002602482015261543360f01b604482015290519081900360640190fd5b6000620002fd876001600160e01b03620003fb16565b9050801562000338576040805162461bcd60e51b8152602060048201526002602482015261150d60f21b604482015290519081900360640190fd5b6200034b6001600160e01b036200054916565b600955670de0b6b3a7640000600a556200036e866001600160e01b036200054e16565b90508015620003a9576040805162461bcd60e51b8152602060048201526002602482015261543560f01b604482015290519081900360640190fd5b8351620003be9060019060208701906200074a565b508251620003d49060029060208601906200074a565b50506003805460ff90921660ff199283161790556000805490911660011790555050505050565b60035460009061010090046001600160a01b0316331462000435576200042d6001603f6001600160e01b03620006da16565b905062000544565b60055460408051623f1ee960e11b815290516001600160a01b0392831692851691627e3dd2916004808301926020929190829003018186803b1580156200047b57600080fd5b505afa15801562000490573d6000803e3d6000fd5b505050506040513d6020811015620004a757600080fd5b5051620004e1576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600580546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517f7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d9281900390910190a160005b9150505b919050565b435b90565b600354600090819061010090046001600160a01b031633146200058b5762000582600160426001600160e01b03620006da16565b91505062000544565b6200059e6001600160e01b036200054916565b60095414620005be5762000582600a60416001600160e01b03620006da16565b600660009054906101000a90046001600160a01b03169050826001600160a01b0316632191f92a6040518163ffffffff1660e01b815260040160206040518083038186803b1580156200061057600080fd5b505afa15801562000625573d6000803e3d6000fd5b505050506040513d60208110156200063c57600080fd5b505162000676576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600680546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517fedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f9269281900390910190a1600062000540565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa08360108111156200070a57fe5b8360528111156200071757fe5b604080519283526020830191909152600082820152519081900360600190a18260108111156200074357fe5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200078d57805160ff1916838001178555620007bd565b82800160010185558215620007bd579182015b82811115620007bd578251825591602001919060010190620007a0565b50620007cb929150620007cf565b5090565b6200054b91905b80821115620007cb5760008155600101620007d6565b615b9a80620007fc6000396000f3fe60806040526004361061031a5760003560e01c8063852a12e3116101ab578063c139562b116100f7578063f2b3abbd11610095578063f8f9da281161006f578063f8f9da2814610bfa578063fc610b3d14610c0f578063fca7820b14610c82578063fe9c44ae14610cac5761031a565b8063f2b3abbd14610b9d578063f3fdb15a14610bd0578063f851a44014610be55761031a565b8063db006a75116100d1578063db006a7514610afd578063dd62ed3e14610b27578063e597461914610b62578063e9c714f214610b885761031a565b8063c139562b14610a6d578063c37f68e214610aa0578063c5ebeaec14610ad35761031a565b8063a9059cbb11610164578063ae9d70b01161013e578063ae9d70b0146109cd578063b2a02ff1146109e2578063b71d1a0c14610a25578063bd6d894d14610a585761031a565b8063a9059cbb14610951578063aa5af0fd1461098a578063aae40a2a1461099f5761031a565b8063852a12e3146107565780638f840ddd1461078057806395d89b411461079557806395dd9193146107aa57806399d8c1b4146107dd578063a6afed951461093c5761031a565b80634576b5db1161026a5780636653d464116102235780636c865c4f116101fd5780636c865c4f146106fe57806370a082311461070657806373acee98146107395780637f78fe161461074e5761031a565b80636653d464146106a1578063675d972c146106d45780636c540baf146106e95761031a565b80634576b5db146105b957806347bd3718146105ec5780634e4d9fea14610601578063524fe4b5146106095780635fe3b56714610662578063601a0bf1146106775761031a565b8063182df0f5116102d757806326782247116102b15780632678224714610515578063313ce567146105465780633af9e669146105715780633b1d21a2146105a45761031a565b8063182df0f5146104a85780631df0ba9d146104bd57806323b872dd146104d25761031a565b806306fdde0314610358578063095ea7b3146103e25780631249c58b1461042f578063173b99041461043957806317bfdfbc1461046057806318160ddd14610493575b600061032534610cc1565b509050610355816040518060400160405280600b81526020016a1b5a5b9d0819985a5b195960aa1b815250610d62565b50005b34801561036457600080fd5b5061036d610f62565b6040805160208082528351818301528351919283929083019185019080838360005b838110156103a757818101518382015260200161038f565b50505050905090810190601f1680156103d45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156103ee57600080fd5b5061041b6004803603604081101561040557600080fd5b506001600160a01b038135169060200135610fef565b604080519115158252519081900360200190f35b61043761105c565b005b34801561044557600080fd5b5061044e61109a565b60408051918252519081900360200190f35b34801561046c57600080fd5b5061044e6004803603602081101561048357600080fd5b50356001600160a01b03166110a0565b34801561049f57600080fd5b5061044e611145565b3480156104b457600080fd5b5061044e61114b565b3480156104c957600080fd5b5061044e6111a9565b3480156104de57600080fd5b5061041b600480360360608110156104f557600080fd5b506001600160a01b038135811691602081013590911690604001356111af565b34801561052157600080fd5b5061052a61121a565b604080516001600160a01b039092168252519081900360200190f35b34801561055257600080fd5b5061055b611229565b6040805160ff9092168252519081900360200190f35b34801561057d57600080fd5b5061044e6004803603602081101561059457600080fd5b50356001600160a01b0316611232565b3480156105b057600080fd5b5061044e6112cf565b3480156105c557600080fd5b5061044e600480360360208110156105dc57600080fd5b50356001600160a01b03166112de565b3480156105f857600080fd5b5061044e611419565b61043761141f565b34801561061557600080fd5b5061063c6004803603602081101561062c57600080fd5b50356001600160a01b0316611461565b604080519485526020850193909352838301919091526060830152519081900360800190f35b34801561066e57600080fd5b5061052a611492565b34801561068357600080fd5b5061044e6004803603602081101561069a57600080fd5b50356114a1565b3480156106ad57600080fd5b50610437600480360360208110156106c457600080fd5b50356001600160a01b0316611535565b3480156106e057600080fd5b5061044e6115bb565b3480156106f557600080fd5b5061044e6115c1565b6104376115c7565b34801561071257600080fd5b5061044e6004803603602081101561072957600080fd5b50356001600160a01b03166115d4565b34801561074557600080fd5b5061044e6115ef565b61043761168a565b34801561076257600080fd5b5061044e6004803603602081101561077957600080fd5b5035611693565b34801561078c57600080fd5b5061044e61169e565b3480156107a157600080fd5b5061036d6116a4565b3480156107b657600080fd5b5061044e600480360360208110156107cd57600080fd5b50356001600160a01b03166116fc565b3480156107e957600080fd5b50610437600480360360c081101561080057600080fd5b6001600160a01b0382358116926020810135909116916040820135919081019060808101606082013564010000000081111561083b57600080fd5b82018360208201111561084d57600080fd5b8035906020019184600183028401116401000000008311171561086f57600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092959493602081019350359150506401000000008111156108c257600080fd5b8201836020820111156108d457600080fd5b803590602001918460018302840111640100000000831117156108f657600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505050903560ff1691506117549050565b34801561094857600080fd5b5061044e61190c565b34801561095d57600080fd5b5061041b6004803603604081101561097457600080fd5b506001600160a01b038135169060200135611ce7565b34801561099657600080fd5b5061044e611d51565b610437600480360360408110156109b557600080fd5b506001600160a01b0381358116916020013516611d57565b3480156109d957600080fd5b5061044e611da4565b3480156109ee57600080fd5b5061044e60048036036060811015610a0557600080fd5b506001600160a01b03813581169160208101359091169060400135611e43565b348015610a3157600080fd5b5061044e60048036036020811015610a4857600080fd5b50356001600160a01b0316611ead565b348015610a6457600080fd5b5061044e611f39565b348015610a7957600080fd5b5061044e60048036036020811015610a9057600080fd5b50356001600160a01b0316611fda565b348015610aac57600080fd5b5061063c60048036036020811015610ac357600080fd5b50356001600160a01b0316611ff5565b348015610adf57600080fd5b5061044e60048036036020811015610af657600080fd5b503561208a565b348015610b0957600080fd5b5061044e60048036036020811015610b2057600080fd5b5035612095565b348015610b3357600080fd5b5061044e60048036036040811015610b4a57600080fd5b506001600160a01b03813581169160200135166120a0565b61043760048036036020811015610b7857600080fd5b50356001600160a01b03166120cb565b348015610b9457600080fd5b5061044e612119565b348015610ba957600080fd5b5061044e60048036036020811015610bc057600080fd5b50356001600160a01b031661221c565b348015610bdc57600080fd5b5061052a612256565b348015610bf157600080fd5b5061052a612265565b348015610c0657600080fd5b5061044e612279565b348015610c1b57600080fd5b50610c4260048036036020811015610c3257600080fd5b50356001600160a01b03166122dd565b60405180866003811115610c5257fe5b60ff1681526020018581526020018481526020018381526020018281526020019550505050505060405180910390f35b348015610c8e57600080fd5b5061044e60048036036020811015610ca557600080fd5b50356123ff565b348015610cb857600080fd5b5061041b612476565b60008054819060ff16610d01576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155610d1361190c565b90508015610d3e57610d31816010811115610d2a57fe5b601e61247b565b925060009150610d4e9050565b610d4833856124e1565b92509250505b6000805460ff191660011790559092909150565b81610d6c57610f5e565b606081516005016040519080825280601f01601f191660200182016040528015610d9d576020820181803883390190505b50905060005b8251811015610dee57828181518110610db857fe5b602001015160f81c60f81b828281518110610dcf57fe5b60200101906001600160f81b031916908160001a905350600101610da3565b8151600160fd1b90839083908110610e0257fe5b60200101906001600160f81b031916908160001a905350602860f81b828260010181518110610e2d57fe5b60200101906001600160f81b031916908160001a905350600a840460300160f81b828260020181518110610e5d57fe5b60200101906001600160f81b031916908160001a905350600a840660300160f81b828260030181518110610e8d57fe5b60200101906001600160f81b031916908160001a905350602960f81b828260040181518110610eb857fe5b60200101906001600160f81b031916908160001a905350818415610f5a5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610f1f578181015183820152602001610f07565b50505050905090810190601f168015610f4c5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5050505b5050565b60018054604080516020600284861615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015610fe75780601f10610fbc57610100808354040283529160200191610fe7565b820191906000526020600020905b815481529060010190602001808311610fca57829003601f168201915b505050505081565b3360008181526010602090815260408083206001600160a01b03871680855290835281842086905581518681529151939493909284927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a360019150505b92915050565b600061106734610cc1565b509050611097816040518060400160405280600b81526020016a1b5a5b9d0819985a5b195960aa1b815250610d62565b50565b60085481565b6000805460ff166110de576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556110f061190c565b14611127576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b611130826116fc565b90505b6000805460ff19166001179055919050565b600d5481565b6000806000611158612b1a565b9092509050600082600381111561116b57fe5b146111a2576040805162461bcd60e51b8152602060048201526002602482015261543960f01b604482015290519081900360640190fd5b9150505b90565b600e5481565b6000805460ff166111ed576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561120333868686612cb2565b1490506000805460ff191660011790559392505050565b6004546001600160a01b031681565b60035460ff1681565b600061123c615a2b565b604051806020016040528061124f611f39565b90526001600160a01b0384166000908152600f602052604081205491925090819061127b908490612f40565b9092509050600082600381111561128e57fe5b146112c5576040805162461bcd60e51b81526020600482015260026024820152612a1b60f11b604482015290519081900360640190fd5b925050505b919050565b60006112d9612f93565b905090565b60035460009061010090046001600160a01b0316331461130b576113046001603f61247b565b90506112ca565b60055460408051623f1ee960e11b815290516001600160a01b0392831692851691627e3dd2916004808301926020929190829003018186803b15801561135057600080fd5b505afa158015611364573d6000803e3d6000fd5b505050506040513d602081101561137a57600080fd5b50516113b3576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600580546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517f7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d9281900390910190a160005b9392505050565b600b5481565b600061142a34613084565b50905061109781604051806040016040528060128152602001711c995c185e509bdc9c9bddc819985a5b195960721b815250610d62565b6001600160a01b03166000908152600f60205260409020805460018201546002830154600390930154919390929190565b6005546001600160a01b031681565b6000805460ff166114df576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556114f161190c565b905080156115175761150f81601081111561150857fe5b603061247b565b915050611133565b611520836130ff565b9150506000805460ff19166001179055919050565b60035461010090046001600160a01b03163314611599576040805162461bcd60e51b815260206004820181905260248201527f6f6e6c792061646d696e206d6179207365742074686520636f6d70616e696f6e604482015290519081900360640190fd5b601280546001600160a01b0319166001600160a01b0392909216919091179055565b60075481565b60095481565b600061142a600019613084565b6001600160a01b03166000908152600f602052604090205490565b6000805460ff1661162d576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561163f61190c565b14611676576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b50600b546000805460ff1916600117905590565b6110973461322e565b6000611056826132bb565b600c5481565b6002805460408051602060018416156101000260001901909316849004601f81018490048402820184019092528181529291830182828015610fe75780601f10610fbc57610100808354040283529160200191610fe7565b600080600061170a84613335565b9092509050600082600381111561171d57fe5b14611412576040805162461bcd60e51b81526020600482015260026024820152610a8760f31b604482015290519081900360640190fd5b60035461010090046001600160a01b0316331461179d576040805162461bcd60e51b8152602060048201526002602482015261543160f01b604482015290519081900360640190fd5b6009541580156117ad5750600a54155b6117e3576040805162461bcd60e51b81526020600482015260026024820152612a1960f11b604482015290519081900360640190fd5b60078490558361181f576040805162461bcd60e51b8152602060048201526002602482015261543360f01b604482015290519081900360640190fd5b600061182a876112de565b90508015611864576040805162461bcd60e51b8152602060048201526002602482015261150d60f21b604482015290519081900360640190fd5b61186c6133e9565b600955670de0b6b3a7640000600a55611884866133ed565b905080156118be576040805162461bcd60e51b8152602060048201526002602482015261543560f01b604482015290519081900360640190fd5b83516118d1906001906020870190615a3e565b5082516118e5906002906020860190615a3e565b50506003805460ff90921660ff199283161790556000805490911660011790555050505050565b6000806119176133e9565b60095490915080821415611930576000925050506111a6565b600061193a612f93565b600b54600c54600a54600654604080516315f2405360e01b815260048101879052602481018690526044810185905290519596509394929391926000926001600160a01b03909216916315f24053916064808301926020929190829003018186803b1580156119a857600080fd5b505afa1580156119bc573d6000803e3d6000fd5b505050506040513d60208110156119d257600080fd5b5051905065048c27395000811115611a17576040805162461bcd60e51b815260206004820152600360248201526205431360ec1b604482015290519081900360640190fd5b600080611a248989613548565b90925090506000826003811115611a3757fe5b14611a6f576040805162461bcd60e51b815260206004820152600360248201526254313160e81b604482015290519081900360640190fd5b611a77615a2b565b600080600080611a9560405180602001604052808a8152508761356b565b90975094506000876003811115611aa857fe5b14611ada57611ac560096006896003811115611ac057fe5b6135d3565b9e5050505050505050505050505050506111a6565b611ae4858c612f40565b90975093506000876003811115611af757fe5b14611b0f57611ac560096001896003811115611ac057fe5b611b19848c613639565b90975092506000876003811115611b2c57fe5b14611b4457611ac560096004896003811115611ac057fe5b611b5f6040518060200160405280600854815250858c61365f565b90975091506000876003811115611b7257fe5b14611b8a57611ac560096005896003811115611ac057fe5b600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b158015611bd857600080fd5b505afa158015611bec573d6000803e3d6000fd5b505050506040513d6020811015611c0257600080fd5b505115611c4157611c16888d8d8d886136bb565b90975091506000876003811115611c2957fe5b14611c4157611ac560096005896003811115611ac057fe5b611c4c858a8b61365f565b90975090506000876003811115611c5f57fe5b14611c7757611ac560096003896003811115611ac057fe5b60098e9055600a819055600b839055600c829055604080518d8152602081018690528082018390526060810185905290517f4dec04e750ca11537cabcd8a9eab06494de08da3735bc8871cd41250e190bc049181900360800190a160009e50505050505050505050505050505090565b6000805460ff16611d25576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155611d3b33338686612cb2565b1490506000805460ff1916600117905592915050565b600a5481565b6000611d64833484613930565b509050611d9f81604051806040016040528060168152602001751b1a5c5d5a59185d19509bdc9c9bddc819985a5b195960521b815250610d62565b505050565b6006546000906001600160a01b031663b8168816611dc0612f93565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b158015611e1257600080fd5b505afa158015611e26573d6000803e3d6000fd5b505050506040513d6020811015611e3c57600080fd5b5051905090565b6000805460ff16611e81576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19169055611e9733858585613a5b565b90506000805460ff191660011790559392505050565b60035460009061010090046001600160a01b03163314611ed3576113046001604561247b565b600480546001600160a01b038481166001600160a01b0319831681179093556040805191909216808252602082019390935281517fca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9929181900390910190a16000611412565b6000805460ff16611f77576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155611f8961190c565b14611fc0576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b611fc861114b565b90506000805460ff1916600117905590565b6001600160a01b031660009081526011602052604090205490565b6001600160a01b0381166000908152600f602052604081205481908190819081808061202089613335565b93509050600081600381111561203257fe5b146120505760095b9750600096508695508594506120839350505050565b612058612b1a565b92509050600081600381111561206a57fe5b1461207657600961203a565b5060009650919450925090505b9193509193565b600061105682613c37565b600061105682613caf565b6001600160a01b03918216600090815260106020908152604080832093909416825291909152205490565b60006120d78234613d22565b509050610f5e816040518060400160405280601881526020017f7265706179426f72726f77426568616c66206661696c65640000000000000000815250610d62565b6004546000906001600160a01b031633141580612134575033155b1561214c576121456001600061247b565b90506111a6565b60038054600480546001600160a01b03818116610100818102610100600160a81b0319871617968790556001600160a01b031990931690935560408051948390048216808652929095041660208401528351909391927ff9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc92908290030190a1600454604080516001600160a01b038085168252909216602083015280517fca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a99281900390910190a160009250505090565b60008061222761190c565b9050801561224d5761224581601081111561223e57fe5b604061247b565b9150506112ca565b611412836133ed565b6006546001600160a01b031681565b60035461010090046001600160a01b031681565b6006546000906001600160a01b03166315f24053612295612f93565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b158015611e1257600080fd5b6001600160a01b0381166000908152600f602052604081206003810154829182918291829161230a615a2b565b6040518060200160405280838152509050600061232d6009548560020154613548565b915050612338615a2b565b612342838361356b565b91505061234d615a2b565b61236d6040518060200160405280670de0b6b3a764000081525083613dc6565b6001880154909250905061237f615a2b565b506040805160208101909152818152612396615a2b565b6123a08483613e00565b91505060006123b3826000015185613548565b9150506123be615a2b565b82518b546123cc9190613ee9565b9150506000866000015183836000015186600001519f509f509f509f509f50505050505050505050505091939590929450565b6000805460ff1661243d576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561244f61190c565b9050801561246d5761150f81601081111561246657fe5b604661247b565b61152083613f99565b600181565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa08360108111156124aa57fe5b8360528111156124b657fe5b604080519283526020830191909152600082820152519081900360600190a182601081111561141257fe5b6001600160a01b038216600090815260116020526040812054819015612534576040805162461bcd60e51b81526020600482015260036024820152622a189960e91b604482015290519081900360640190fd5b60055460408051634ef4c3e160e01b81523060048201526001600160a01b0387811660248301526044820187905291516000939290921691634ef4c3e19160648082019260209290919082900301818787803b15801561259357600080fd5b505af11580156125a7573d6000803e3d6000fd5b505050506040513d60208110156125bd57600080fd5b5051905080156125e1576125d46003601f836135d3565b925060009150612b139050565b6125e96133e9565b600954146125fd576125d4600a602261247b565b612605615abc565b61260d612b1a565b604083018190526020830182600381111561262457fe5b600381111561262f57fe5b905250600090508160200151600381111561264657fe5b14612670576126626009602183602001516003811115611ac057fe5b935060009250612b13915050565b608081018590526126818682614041565b61268b86866141c9565b60e08201819052604080516020810182529083015181526126ac9190614265565b60608301819052602083018260038111156126c357fe5b60038111156126ce57fe5b90525060009050816020015160038111156126e557fe5b1461271d576040805162461bcd60e51b815260206004820152600360248201526254313360e81b604482015290519081900360640190fd5b61272d600d548260600151613639565b60a083018190526020830182600381111561274457fe5b600381111561274f57fe5b905250600090508160200151600381111561276657fe5b1461279e576040805162461bcd60e51b8152602060048201526003602482015262150c4d60ea1b604482015290519081900360640190fd5b6001600160a01b0386166000908152600f602052604090205460608201516127c69190613639565b60c08301819052602083018260038111156127dd57fe5b60038111156127e857fe5b90525060009050816020015160038111156127ff57fe5b14612837576040805162461bcd60e51b815260206004820152600360248201526254313560e81b604482015290519081900360640190fd5b6006546000906001600160a01b031663b8168816612853612f93565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b1580156128a557600080fd5b505afa1580156128b9573d6000803e3d6000fd5b505050506040513d60208110156128cf57600080fd5b5051600654604080516338db09b960e21b815290519293506000926001600160a01b039092169163e36c26e491600480820192602092909190829003018186803b15801561291c57600080fd5b505afa158015612930573d6000803e3d6000fd5b505050506040513d602081101561294657600080fd5b50516001600160a01b0389166000908152600f602052604090205490915015612a2d57612971615a2b565b811561299d5760006129828a6122dd565b60408051602081019091529081529550612a1c945050505050565b6001600160a01b0389166000908152600f6020908152604080832054815180840183528181528251938401835291880151835292916129dc9190613e00565b9350905060008160038111156129ee57fe5b14612a1957612a0660096020836003811115611ac057fe5b985060009750612b139650505050505050565b50505b8051612a289089613639565b985050505b60a0830151600d556040805160808101825260c0850151815260208082018a815260095483850190815260608085018881526001600160a01b038f166000818152600f8752889020965187559351600187015591516002860155905160039094019390935560e087015192870151845193845291830191909152825190927f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f928290030190a2606083015160408051918252516001600160a01b038a16913091600080516020615b468339815191529181900360200190a3505060e00151600093509150505b9250929050565b600d54600090819080612b3557505060075460009150612cae565b6000806000612b42612f93565b9050600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b158015612b9257600080fd5b505afa158015612ba6573d6000803e3d6000fd5b505050506040513d6020811015612bbc57600080fd5b505115612c0657612bcc3361427c565b90935091506000836003811115612bdf57fe5b1415612bf45750600094509250612cae915050565b60006007549550955050505050612cae565b600654600b54600c54600d5460408051639dc8bea760e01b81526004810187905260248101949094526044840192909252606483015280516001600160a01b0390931692639dc8bea7926084808201939291829003018186803b158015612c6c57600080fd5b505afa158015612c80573d6000803e3d6000fd5b505050506040513d6040811015612c9657600080fd5b5080516020909101519096509450612cae9350505050565b9091565b600554604080516317b9b84b60e31b81523060048201526001600160a01b03868116602483015285811660448301526064820185905291516000938493169163bdcdc25891608480830192602092919082900301818787803b158015612d1757600080fd5b505af1158015612d2b573d6000803e3d6000fd5b505050506040513d6020811015612d4157600080fd5b505190508015612d6057612d586003604a836135d3565b915050612f38565b836001600160a01b0316856001600160a01b03161415612d8657612d586002604b61247b565b60006001600160a01b038781169087161415612da55750600019612dcd565b506001600160a01b038086166000908152601060209081526040808320938a16835292905220545b600080600080612ddd8589613548565b90945092506000846003811115612df057fe5b14612e0e57612e016009604b61247b565b9650505050505050612f38565b6001600160a01b038a166000908152600f6020526040902054612e319089613548565b90945091506000846003811115612e4457fe5b14612e5557612e016009604c61247b565b6001600160a01b0389166000908152600f6020526040902054612e789089613639565b90945090506000846003811115612e8b57fe5b14612e9c57612e016009604d61247b565b6001600160a01b03808b166000908152600f6020526040808220859055918b168152208190556000198514612ef4576001600160a01b03808b166000908152601060209081526040808320938f168352929052208390555b886001600160a01b03168a6001600160a01b0316600080516020615b468339815191528a6040518082815260200191505060405180910390a3600096505050505050505b949350505050565b6000806000612f4d615a2b565b612f57868661356b565b90925090506000826003811115612f6a57fe5b14612f7b5750915060009050612b13565b6000612f868261435e565b9350935050509250929050565b6000806000612fa24734613548565b91509150600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b158015612ff457600080fd5b505afa158015613008573d6000803e3d6000fd5b505050506040513d602081101561301e57600080fd5b5051156130375761303181600e54613548565b90925090505b600082600381111561304557fe5b146111a2576040805162461bcd60e51b815260206004820152600a60248201526926b0ba341032b93937b960b11b604482015290519081900360640190fd5b60008054819060ff166130c4576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556130d661190c565b905080156130f457610d318160108111156130ed57fe5b603661247b565b610d4833338661436d565b600354600090819061010090046001600160a01b03163314613127576122456001603161247b565b61312f6133e9565b6009541461314357612245600a603361247b565b8261314c612f93565b101561315e57612245600e603261247b565b600c54831115613174576122456002603461247b565b50600c54828103908111156131b6576040805162461bcd60e51b815260206004820152600360248201526254323560e81b604482015290519081900360640190fd5b600c8190556003546131d69061010090046001600160a01b0316846146b7565b600354604080516101009092046001600160a01b0316825260208201859052818101839052517f3bad0c59cf2f06e7314077049f48a93578cd16f5ef92329f1dab1420a99c177e916060908290030190a16000611412565b6000805460ff1661326c576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561327e61190c565b9050801561329c5761150f81601081111561329557fe5b605161247b565b6132a5836146ed565b509150506000805460ff19166001179055919050565b6000805460ff166132f9576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561330b61190c565b905080156133295761150f81601081111561332257fe5b602761247b565b611520336000856147bb565b6001600160a01b03811660009081526011602052604081208054829182918291829161336c5750600094508493506133e492505050565b61337c8160000154600a54615167565b9094509250600084600381111561338f57fe5b146133a45750919350600092506133e4915050565b6133b28382600101546151a6565b909450915060008460038111156133c557fe5b146133da5750919350600092506133e4915050565b5060009450925050505b915091565b4390565b600354600090819061010090046001600160a01b03163314613415576122456001604261247b565b61341d6133e9565b6009541461343157612245600a604161247b565b600660009054906101000a90046001600160a01b03169050826001600160a01b0316632191f92a6040518163ffffffff1660e01b815260040160206040518083038186803b15801561348257600080fd5b505afa158015613496573d6000803e3d6000fd5b505050506040513d60208110156134ac57600080fd5b50516134e5576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600680546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517fedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f9269281900390910190a16000611412565b60008083831161355f575060009050818303612b13565b50600390506000612b13565b6000613575615a2b565b600080613586866000015186615167565b9092509050600082600381111561359957fe5b146135b857506040805160208101909152600081529092509050612b13565b60408051602081019091529081526000969095509350505050565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa084601081111561360257fe5b84605281111561360e57fe5b604080519283526020830191909152818101859052519081900360600190a1836010811115612f3857fe5b60008083830184811061365157600092509050612b13565b506002915060009050612b13565b600080600061366c615a2b565b613676878761356b565b9092509050600082600381111561368957fe5b1461369a57509150600090506136b3565b6136ac6136a68261435e565b86613639565b9350935050505b935093915050565b60065460408051630dce3c5b60e31b815260048101879052602481018690526044810185905290516000928392839283926001600160a01b031691636e71e2d8916064808301926020929190829003018186803b15801561371b57600080fd5b505afa15801561372f573d6000803e3d6000fd5b505050506040513d602081101561374557600080fd5b505160065460085460408051635c0b440b60e11b8152600481018d9052602481018c9052604481018b90526064810192909252519293506000926001600160a01b039092169163b816881691608480820192602092909190829003018186803b1580156137b157600080fd5b505afa1580156137c5573d6000803e3d6000fd5b505050506040513d60208110156137db57600080fd5b50516006546040805163327a176d60e11b8152600481018d9052602481018c9052604481018b905290519293506001600160a01b03909116916364f42eda91606480820192602092909190829003018186803b15801561383a57600080fd5b505afa15801561384e573d6000803e3d6000fd5b505050506040513d602081101561386457600080fd5b50511561391a576138836040518060200160405280848152508b612f40565b9095509250600085600381111561389657fe5b146138a8575060009250613926915050565b6138b28382613548565b909550925060008560038111156138c557fe5b146138d7575060009250613926915050565b6138f0604051806020016040528085815250878961365f565b9095509350600085600381111561390357fe5b14613915575060009250613926915050565b613922565b600094508693505b5050505b9550959350505050565b60008054819060ff16613970576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561398261190c565b905080156139ad576139a081601081111561399957fe5b600f61247b565b925060009150613a449050565b836001600160a01b031663a6afed956040518163ffffffff1660e01b8152600401602060405180830381600087803b1580156139e857600080fd5b505af11580156139fc573d6000803e3d6000fd5b505050506040513d6020811015613a1257600080fd5b505190508015613a32576139a0816010811115613a2b57fe5b601061247b565b613a3e338787876151d1565b92509250505b6000805460ff191660011790559094909350915050565b6005546040805163d02f735160e01b81523060048201526001600160a01b038781166024830152868116604483015285811660648301526084820185905291516000938493169163d02f73519160a480830192602092919082900301818787803b158015613ac857600080fd5b505af1158015613adc573d6000803e3d6000fd5b505050506040513d6020811015613af257600080fd5b505190508015613b0957612d586003601b836135d3565b846001600160a01b0316846001600160a01b03161415613b2f57612d586006601c61247b565b6001600160a01b0384166000908152600f602052604081205481908190613b569087613548565b90935091506000836003811115613b6957fe5b14613b8c57613b816009601a856003811115611ac057fe5b945050505050612f38565b6001600160a01b0388166000908152600f6020526040902054613baf9087613639565b90935090506000836003811115613bc257fe5b14613bda57613b8160096019856003811115611ac057fe5b6001600160a01b038088166000818152600f60209081526040808320879055938c168083529184902085905583518a815293519193600080516020615b46833981519152929081900390910190a360009998505050505050505050565b6000805460ff16613c75576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155613c8761190c565b90508015613ca55761150f816010811115613c9e57fe5b600861247b565b6115203384615698565b6000805460ff16613ced576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155613cff61190c565b90508015613d165761150f81601081111561332257fe5b611520338460006147bb565b60008054819060ff16613d62576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155613d7461190c565b90508015613d9f57613d92816010811115613d8b57fe5b603561247b565b925060009150613db09050565b613daa33868661436d565b92509250505b6000805460ff1916600117905590939092509050565b6000613dd0615a2b565b600080613de586600001518660000151613639565b60408051602081019091529081529097909650945050505050565b6000613e0a615a2b565b600080613e1f86600001518660000151615167565b90925090506000826003811115613e3257fe5b14613e5157506040805160208101909152600081529092509050612b13565b600080613e666706f05b59d3b2000084613639565b90925090506000826003811115613e7957fe5b14613e9b57506040805160208101909152600081529094509250612b13915050565b600080613eb083670de0b6b3a76400006151a6565b90925090506000826003811115613ec357fe5b14613eca57fe5b604080516020810190915290815260009a909950975050505050505050565b6000613ef3615a2b565b600080613f0886670de0b6b3a7640000615167565b90925090506000826003811115613f1b57fe5b14613f3a57506040805160208101909152600081529092509050612b13565b600080613f4783886151a6565b90925090506000826003811115613f5a57fe5b14613f7c57506040805160208101909152600081529094509250612b13915050565b604080516020810190915290815260009890975095505050505050565b60035460009061010090046001600160a01b03163314613fbf576113046001604761247b565b613fc76133e9565b60095414613fdb57611304600a604861247b565b670de0b6b3a7640000821115613ff7576113046002604961247b565b6008805490839055604080518281526020810185905281517faaa68312e2ea9d50e16af5068410ab56e1a1fd06037b1a35664812c30f821460929181900390910190a16000611412565b600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b15801561408f57600080fd5b505afa1580156140a3573d6000803e3d6000fd5b505050506040513d60208110156140b957600080fd5b505115610f5e576001600160a01b038083166000908152600f60205260408082206012546001820154608087015184516306d3af0d60e51b81526004810192909252602482015292519194169263da75e1a0926044808201939182900301818387803b15801561412857600080fd5b505af115801561413c573d6000803e3d6000fd5b5050601254600d546080860151604080880151815160016235be3960e21b03198152600481019490945260248401929092526044830191909152516001600160a01b03909216935063ff29071c925060648082019260009290919082900301818387803b1580156141ac57600080fd5b505af11580156141c0573d6000803e3d6000fd5b50505050505050565b6000336001600160a01b0384161461421a576040805162461bcd60e51b815260206004820152600f60248201526e0e6cadcc8cae440dad2e6dac2e8c6d608b1b604482015290519081900360640190fd5b81341461425f576040805162461bcd60e51b815260206004820152600e60248201526d0ecc2d8eaca40dad2e6dac2e8c6d60931b604482015290519081900360640190fd5b50919050565b6000806000614272615a2b565b612f578686615930565b600080600d54600014156142975750506007546000906133e4565b6001600160a01b0383166000908152600f6020526040902060028101546142c6575060019150600090506133e4565b80546142da575050600754600091506133e4565b60006142e5856122dd565b5050509150506142f3615a2b565b506040805160208101909152818152600183015461430f615a2b565b506040805160208101909152818152614326615a2b565b6143308483613e00565b91505061433b615a2b565b815187546143499190613ee9565b5160009a5098506133e4975050505050505050565b51670de0b6b3a7640000900490565b60055460408051631200453160e11b81523060048201526001600160a01b0386811660248301528581166044830152606482018590529151600093849384939116916324008a629160848082019260209290919082900301818787803b1580156143d657600080fd5b505af11580156143ea573d6000803e3d6000fd5b505050506040513d602081101561440057600080fd5b5051905080156144245761441760036038836135d3565b9250600091506136b39050565b61442c6133e9565b6009541461444057614417600a603961247b565b614448615abc565b6001600160a01b038616600090815260116020526040902060010154606082015261447286613335565b608083018190526020830182600381111561448957fe5b600381111561449457fe5b90525060009050816020015160038111156144ab57fe5b146144d5576144c76009603783602001516003811115611ac057fe5b9350600092506136b3915050565b600019851415614502576080810151604082018190526144f8908890600161598f565b60e0820152614519565b6040810185905261451387866141c9565b60e08201525b61452b81608001518260e00151613548565b60a083018190526020830182600381111561454257fe5b600381111561454d57fe5b905250600090508160200151600381111561456457fe5b1461459c576040805162461bcd60e51b815260206004820152600360248201526254313760e81b604482015290519081900360640190fd5b6145ac600b548260e00151613548565b60c08301819052602083018260038111156145c357fe5b60038111156145ce57fe5b90525060009050816020015160038111156145e557fe5b1461461d576040805162461bcd60e51b81526020600482015260036024820152620a862760eb1b604482015290519081900360640190fd5b60a0810180516001600160a01b03808916600081815260116020908152604091829020948555600a5460019095019490945560c0860151600b81905560e087015195518251968752948601949094528481019390935291519192908a16917f1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a19181900360600190a360e00151600097909650945050505050565b6040516001600160a01b0383169082156108fc029083906000818181858888f19350505050158015611d9f573d6000803e3d6000fd5b6000806000806146fb6133e9565b6009541461471a5761470f600a605261247b565b935091506133e49050565b61472433866141c9565b905080600e54019150600e5482101561476a576040805162461bcd60e51b8152602060048201526003602482015262150c8d60ea1b604482015290519081900360640190fd5b600e829055604080513381526020810183905280820184905290517f3b1f8ad9af3f4b191c8118fa7e5ff5c809518c2c9c8b091de2378057f646bbe29181900360600190a160009350915050915091565b60008215806147c8575081155b6147ff576040805162461bcd60e51b81526020600482015260036024820152622a189b60e91b604482015290519081900360640190fd5b614807615abc565b6001600160a01b0385166000908152600f60205260409020614827612b1a565b604084018190526020840182600381111561483e57fe5b600381111561484957fe5b905250600090508260200151600381111561486057fe5b146148855761487c6009602b84602001516003811115611ac057fe5b92505050611412565b6000806000806000600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b1580156148db57600080fd5b505afa1580156148ef573d6000803e3d6000fd5b505050506040513d602081101561490557600080fd5b50519050801561492c576149188b6122dd565b60018b018190559198509095508594505050505b6006546001600160a01b031663b8168816614945612f93565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b15801561499757600080fd5b505afa1580156149ab573d6000803e3d6000fd5b505050506040513d60208110156149c157600080fd5b50516003870155808015614a5f57506006546001600160a01b03166364f42eda6149e9612f93565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b158015614a3157600080fd5b505afa158015614a45573d6000803e3d6000fd5b505050506040513d6020811015614a5b57600080fd5b5051155b15614be5576006546000906001600160a01b03166315f24053614a80612f93565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b158015614ac857600080fd5b505afa158015614adc573d6000803e3d6000fd5b505050506040513d6020811015614af257600080fd5b50516006549091506000906001600160a01b0316636e71e2d8614b13612f93565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b158015614b5b57600080fd5b505afa158015614b6f573d6000803e3d6000fd5b505050506040513d6020811015614b8557600080fd5b50516040805160208101909152838152909150600090614ba59083612f40565b915050614bb6896003015482613548565b9750614bc29050615a2b565b614bd0888b60030154613ee9565b915050614bdd818a612f40565b985050505050505b600019891415614c1b57604080516020810182529088015181528654614c0b9190612f40565b608089018190529950614c239050565b608087018990525b8915614d1057606087018a90528015614c8c5785548a1415614c4e5760018601546080880152614c87565b614c56615a2b565b614c648860600151846159e8565b915050614c6f615a2b565b81518854614c7d9190613ee9565b5160808b01525050505b614d0b565b614ca8604051806020016040528089604001518152508b612f40565b6080890181905260208901826003811115614cbf57fe5b6003811115614cca57fe5b9052506000905087602001516003811115614ce157fe5b14614d0b57614cfd6009602989602001516003811115611ac057fe5b975050505050505050611412565b614dce565b608087018990528015614d5d57614d25615a2b565b614d37886080015188600001546159e8565b915050614d42615a2b565b8151614d4e9085613ee9565b5160608b015250614dce915050565b614d798960405180602001604052808a60400151815250614265565b6060890181905260208901826003811115614d9057fe5b6003811115614d9b57fe5b9052506000905087602001516003811115614db257fe5b14614dce57614cfd6009602a89602001516003811115611ac057fe5b60055460608801516040805163eabe7d9160e01b81523060048201526001600160a01b038f8116602483015260448201939093529051600093929092169163eabe7d919160648082019260209290919082900301818787803b158015614e3357600080fd5b505af1158015614e47573d6000803e3d6000fd5b505050506040513d6020811015614e5d57600080fd5b505190508015614e8357614e7460036028836135d3565b98505050505050505050611412565b614e8b6133e9565b60095414614e9f57614e74600a602c61247b565b614eaf600d548960600151613548565b60a08a0181905260208a01826003811115614ec657fe5b6003811115614ed157fe5b9052506000905088602001516003811115614ee857fe5b14614f0457614e746009602e8a602001516003811115611ac057fe5b614f10600e5486613548565b60e08a01525086546060890151614f279190613548565b60c08a0181905260208a01826003811115614f3e57fe5b6003811115614f4957fe5b9052506000905088602001516003811115614f6057fe5b14614f7c57614e746009602d8a602001516003811115611ac057fe5b6000614f86612f93565b90508215614f915750475b8860800151811015614fb957614fa9600e602f61247b565b9950505050505050505050611412565b614fc78d8a608001516146b7565b60a0890151600d5560e0890151600e5560c089015188556009546002890155600188015460808a0151614ffa9190613548565b9050886001016000829190505550306001600160a01b03168d6001600160a01b0316600080516020615b468339815191528b606001516040518082815260200191505060405180910390a38c6001600160a01b03167fe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a9298a608001518b60600151604051808381526020018281526020019250505060405180910390a2600560009054906101000a90046001600160a01b03166001600160a01b03166351dff989308f8c608001518d606001516040518563ffffffff1660e01b815260040180856001600160a01b03166001600160a01b03168152602001846001600160a01b03166001600160a01b03168152602001838152602001828152602001945050505050600060405180830381600087803b15801561513557600080fd5b505af1158015615149573d6000803e3d6000fd5b5060009250615156915050565b9d9c50505050505050505050505050565b6000808361517a57506000905080612b13565b8383028385828161518757fe5b041461519b57506002915060009050612b13565b600092509050612b13565b600080826151ba5750600190506000612b13565b60008385816151c557fe5b04915091509250929050565b60055460408051632fe3f38f60e11b81523060048201526001600160a01b0384811660248301528781166044830152868116606483015260848201869052915160009384938493911691635fc7e71e9160a48082019260209290919082900301818787803b15801561524257600080fd5b505af1158015615256573d6000803e3d6000fd5b505050506040513d602081101561526c57600080fd5b5051905080156152905761528360036012836135d3565b92506000915061568f9050565b6152986133e9565b600954146152ac57615283600a601661247b565b6152b46133e9565b846001600160a01b0316636c540baf6040518163ffffffff1660e01b815260040160206040518083038186803b1580156152ed57600080fd5b505afa158015615301573d6000803e3d6000fd5b505050506040513d602081101561531757600080fd5b50511461532a57615283600a601161247b565b866001600160a01b0316866001600160a01b03161415615350576152836006601761247b565b84615361576152836007601561247b565b600019851415615377576152836007601461247b565b60008061538589898961436d565b909250905081156153b5576153a682601081111561539f57fe5b601861247b565b94506000935061568f92505050565b6005546040805163c488847b60e01b81523060048201526001600160a01b038981166024830152604482018590528251600094859492169263c488847b926064808301939192829003018186803b15801561540f57600080fd5b505afa158015615423573d6000803e3d6000fd5b505050506040513d604081101561543957600080fd5b50805160209091015190925090508115615480576040805162461bcd60e51b815260206004820152600360248201526254313960e81b604482015290519081900360640190fd5b80886001600160a01b03166370a082318c6040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060206040518083038186803b1580156154d757600080fd5b505afa1580156154eb573d6000803e3d6000fd5b505050506040513d602081101561550157600080fd5b5051101561553c576040805162461bcd60e51b815260206004820152600360248201526205432360ec1b604482015290519081900360640190fd5b60006001600160a01b0389163014156155625761555b308d8d85613a5b565b90506155ec565b6040805163b2a02ff160e01b81526001600160a01b038e811660048301528d81166024830152604482018590529151918b169163b2a02ff1916064808201926020929091908290030181600087803b1580156155bd57600080fd5b505af11580156155d1573d6000803e3d6000fd5b505050506040513d60208110156155e757600080fd5b505190505b8015615625576040805162461bcd60e51b815260206004820152600360248201526254323160e81b604482015290519081900360640190fd5b886001600160a01b03168b6001600160a01b03168d6001600160a01b03167f298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb528786604051808381526020018281526020019250505060405180910390a46000975092955050505050505b94509492505050565b6005546040805163368f515360e21b81523060048201526001600160a01b0385811660248301526044820185905291516000938493169163da3d454c91606480830192602092919082900301818787803b1580156156f557600080fd5b505af1158015615709573d6000803e3d6000fd5b505050506040513d602081101561571f57600080fd5b50519050801561573e576157366003600e836135d3565b915050611056565b6157466133e9565b6009541461575957615736600a8061247b565b82615762612f93565b101561577457615736600e600961247b565b61577c615b02565b61578585613335565b602083018190528282600381111561579957fe5b60038111156157a457fe5b90525060009050815160038111156157b857fe5b146157dd576157d46009600783600001516003811115611ac057fe5b92505050611056565b6157eb816020015185613639565b60408301819052828260038111156157ff57fe5b600381111561580a57fe5b905250600090508151600381111561581e57fe5b1461583a576157d46009600c83600001516003811115611ac057fe5b615846600b5485613639565b606083018190528282600381111561585a57fe5b600381111561586557fe5b905250600090508151600381111561587957fe5b14615895576157d46009600b83600001516003811115611ac057fe5b61589f8582615a23565b90506158ab85856146b7565b604080820180516001600160a01b03881660008181526011602090815290859020928355600a54600190930192909255606080860151600b819055935185518a8152938401528285019390935292517f13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80929181900390910190a2600095945050505050565b600061593a615a2b565b60008061594f670de0b6b3a764000087615167565b9092509050600082600381111561596257fe5b1461598157506040805160208101909152600081529092509050612b13565b612f86818660000151613ee9565b6000336001600160a01b038516146159e0576040805162461bcd60e51b815260206004820152600f60248201526e0e6cadcc8cae440dad2e6dac2e8c6d608b1b604482015290519081900360640190fd5b509092915050565b60006159f2615a2b565b615a18604051806020016040528086815250604051806020016040528086815250613e00565b915091509250929050565b61425f615b02565b6040518060200160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10615a7f57805160ff1916838001178555615aac565b82800160010185558215615aac579182015b82811115615aac578251825591602001919060010190615a91565b50615ab8929150615b2b565b5090565b6040805161010081019091528060008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b604080516080810190915280600081526020016000815260200160008152602001600081525090565b6111a691905b80821115615ab85760008155600101615b3156feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa265627a7a72315820a09d4270163a2a7da6fe3e4ea6155e92d6212f7a19bbe3c16e70edc651d069db64736f6c63430005100032";
var deployedBytecode$4 = "0x60806040526004361061031a5760003560e01c8063852a12e3116101ab578063c139562b116100f7578063f2b3abbd11610095578063f8f9da281161006f578063f8f9da2814610bfa578063fc610b3d14610c0f578063fca7820b14610c82578063fe9c44ae14610cac5761031a565b8063f2b3abbd14610b9d578063f3fdb15a14610bd0578063f851a44014610be55761031a565b8063db006a75116100d1578063db006a7514610afd578063dd62ed3e14610b27578063e597461914610b62578063e9c714f214610b885761031a565b8063c139562b14610a6d578063c37f68e214610aa0578063c5ebeaec14610ad35761031a565b8063a9059cbb11610164578063ae9d70b01161013e578063ae9d70b0146109cd578063b2a02ff1146109e2578063b71d1a0c14610a25578063bd6d894d14610a585761031a565b8063a9059cbb14610951578063aa5af0fd1461098a578063aae40a2a1461099f5761031a565b8063852a12e3146107565780638f840ddd1461078057806395d89b411461079557806395dd9193146107aa57806399d8c1b4146107dd578063a6afed951461093c5761031a565b80634576b5db1161026a5780636653d464116102235780636c865c4f116101fd5780636c865c4f146106fe57806370a082311461070657806373acee98146107395780637f78fe161461074e5761031a565b80636653d464146106a1578063675d972c146106d45780636c540baf146106e95761031a565b80634576b5db146105b957806347bd3718146105ec5780634e4d9fea14610601578063524fe4b5146106095780635fe3b56714610662578063601a0bf1146106775761031a565b8063182df0f5116102d757806326782247116102b15780632678224714610515578063313ce567146105465780633af9e669146105715780633b1d21a2146105a45761031a565b8063182df0f5146104a85780631df0ba9d146104bd57806323b872dd146104d25761031a565b806306fdde0314610358578063095ea7b3146103e25780631249c58b1461042f578063173b99041461043957806317bfdfbc1461046057806318160ddd14610493575b600061032534610cc1565b509050610355816040518060400160405280600b81526020016a1b5a5b9d0819985a5b195960aa1b815250610d62565b50005b34801561036457600080fd5b5061036d610f62565b6040805160208082528351818301528351919283929083019185019080838360005b838110156103a757818101518382015260200161038f565b50505050905090810190601f1680156103d45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156103ee57600080fd5b5061041b6004803603604081101561040557600080fd5b506001600160a01b038135169060200135610fef565b604080519115158252519081900360200190f35b61043761105c565b005b34801561044557600080fd5b5061044e61109a565b60408051918252519081900360200190f35b34801561046c57600080fd5b5061044e6004803603602081101561048357600080fd5b50356001600160a01b03166110a0565b34801561049f57600080fd5b5061044e611145565b3480156104b457600080fd5b5061044e61114b565b3480156104c957600080fd5b5061044e6111a9565b3480156104de57600080fd5b5061041b600480360360608110156104f557600080fd5b506001600160a01b038135811691602081013590911690604001356111af565b34801561052157600080fd5b5061052a61121a565b604080516001600160a01b039092168252519081900360200190f35b34801561055257600080fd5b5061055b611229565b6040805160ff9092168252519081900360200190f35b34801561057d57600080fd5b5061044e6004803603602081101561059457600080fd5b50356001600160a01b0316611232565b3480156105b057600080fd5b5061044e6112cf565b3480156105c557600080fd5b5061044e600480360360208110156105dc57600080fd5b50356001600160a01b03166112de565b3480156105f857600080fd5b5061044e611419565b61043761141f565b34801561061557600080fd5b5061063c6004803603602081101561062c57600080fd5b50356001600160a01b0316611461565b604080519485526020850193909352838301919091526060830152519081900360800190f35b34801561066e57600080fd5b5061052a611492565b34801561068357600080fd5b5061044e6004803603602081101561069a57600080fd5b50356114a1565b3480156106ad57600080fd5b50610437600480360360208110156106c457600080fd5b50356001600160a01b0316611535565b3480156106e057600080fd5b5061044e6115bb565b3480156106f557600080fd5b5061044e6115c1565b6104376115c7565b34801561071257600080fd5b5061044e6004803603602081101561072957600080fd5b50356001600160a01b03166115d4565b34801561074557600080fd5b5061044e6115ef565b61043761168a565b34801561076257600080fd5b5061044e6004803603602081101561077957600080fd5b5035611693565b34801561078c57600080fd5b5061044e61169e565b3480156107a157600080fd5b5061036d6116a4565b3480156107b657600080fd5b5061044e600480360360208110156107cd57600080fd5b50356001600160a01b03166116fc565b3480156107e957600080fd5b50610437600480360360c081101561080057600080fd5b6001600160a01b0382358116926020810135909116916040820135919081019060808101606082013564010000000081111561083b57600080fd5b82018360208201111561084d57600080fd5b8035906020019184600183028401116401000000008311171561086f57600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092959493602081019350359150506401000000008111156108c257600080fd5b8201836020820111156108d457600080fd5b803590602001918460018302840111640100000000831117156108f657600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505050903560ff1691506117549050565b34801561094857600080fd5b5061044e61190c565b34801561095d57600080fd5b5061041b6004803603604081101561097457600080fd5b506001600160a01b038135169060200135611ce7565b34801561099657600080fd5b5061044e611d51565b610437600480360360408110156109b557600080fd5b506001600160a01b0381358116916020013516611d57565b3480156109d957600080fd5b5061044e611da4565b3480156109ee57600080fd5b5061044e60048036036060811015610a0557600080fd5b506001600160a01b03813581169160208101359091169060400135611e43565b348015610a3157600080fd5b5061044e60048036036020811015610a4857600080fd5b50356001600160a01b0316611ead565b348015610a6457600080fd5b5061044e611f39565b348015610a7957600080fd5b5061044e60048036036020811015610a9057600080fd5b50356001600160a01b0316611fda565b348015610aac57600080fd5b5061063c60048036036020811015610ac357600080fd5b50356001600160a01b0316611ff5565b348015610adf57600080fd5b5061044e60048036036020811015610af657600080fd5b503561208a565b348015610b0957600080fd5b5061044e60048036036020811015610b2057600080fd5b5035612095565b348015610b3357600080fd5b5061044e60048036036040811015610b4a57600080fd5b506001600160a01b03813581169160200135166120a0565b61043760048036036020811015610b7857600080fd5b50356001600160a01b03166120cb565b348015610b9457600080fd5b5061044e612119565b348015610ba957600080fd5b5061044e60048036036020811015610bc057600080fd5b50356001600160a01b031661221c565b348015610bdc57600080fd5b5061052a612256565b348015610bf157600080fd5b5061052a612265565b348015610c0657600080fd5b5061044e612279565b348015610c1b57600080fd5b50610c4260048036036020811015610c3257600080fd5b50356001600160a01b03166122dd565b60405180866003811115610c5257fe5b60ff1681526020018581526020018481526020018381526020018281526020019550505050505060405180910390f35b348015610c8e57600080fd5b5061044e60048036036020811015610ca557600080fd5b50356123ff565b348015610cb857600080fd5b5061041b612476565b60008054819060ff16610d01576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155610d1361190c565b90508015610d3e57610d31816010811115610d2a57fe5b601e61247b565b925060009150610d4e9050565b610d4833856124e1565b92509250505b6000805460ff191660011790559092909150565b81610d6c57610f5e565b606081516005016040519080825280601f01601f191660200182016040528015610d9d576020820181803883390190505b50905060005b8251811015610dee57828181518110610db857fe5b602001015160f81c60f81b828281518110610dcf57fe5b60200101906001600160f81b031916908160001a905350600101610da3565b8151600160fd1b90839083908110610e0257fe5b60200101906001600160f81b031916908160001a905350602860f81b828260010181518110610e2d57fe5b60200101906001600160f81b031916908160001a905350600a840460300160f81b828260020181518110610e5d57fe5b60200101906001600160f81b031916908160001a905350600a840660300160f81b828260030181518110610e8d57fe5b60200101906001600160f81b031916908160001a905350602960f81b828260040181518110610eb857fe5b60200101906001600160f81b031916908160001a905350818415610f5a5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610f1f578181015183820152602001610f07565b50505050905090810190601f168015610f4c5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5050505b5050565b60018054604080516020600284861615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015610fe75780601f10610fbc57610100808354040283529160200191610fe7565b820191906000526020600020905b815481529060010190602001808311610fca57829003601f168201915b505050505081565b3360008181526010602090815260408083206001600160a01b03871680855290835281842086905581518681529151939493909284927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a360019150505b92915050565b600061106734610cc1565b509050611097816040518060400160405280600b81526020016a1b5a5b9d0819985a5b195960aa1b815250610d62565b50565b60085481565b6000805460ff166110de576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556110f061190c565b14611127576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b611130826116fc565b90505b6000805460ff19166001179055919050565b600d5481565b6000806000611158612b1a565b9092509050600082600381111561116b57fe5b146111a2576040805162461bcd60e51b8152602060048201526002602482015261543960f01b604482015290519081900360640190fd5b9150505b90565b600e5481565b6000805460ff166111ed576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561120333868686612cb2565b1490506000805460ff191660011790559392505050565b6004546001600160a01b031681565b60035460ff1681565b600061123c615a2b565b604051806020016040528061124f611f39565b90526001600160a01b0384166000908152600f602052604081205491925090819061127b908490612f40565b9092509050600082600381111561128e57fe5b146112c5576040805162461bcd60e51b81526020600482015260026024820152612a1b60f11b604482015290519081900360640190fd5b925050505b919050565b60006112d9612f93565b905090565b60035460009061010090046001600160a01b0316331461130b576113046001603f61247b565b90506112ca565b60055460408051623f1ee960e11b815290516001600160a01b0392831692851691627e3dd2916004808301926020929190829003018186803b15801561135057600080fd5b505afa158015611364573d6000803e3d6000fd5b505050506040513d602081101561137a57600080fd5b50516113b3576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600580546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517f7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d9281900390910190a160005b9392505050565b600b5481565b600061142a34613084565b50905061109781604051806040016040528060128152602001711c995c185e509bdc9c9bddc819985a5b195960721b815250610d62565b6001600160a01b03166000908152600f60205260409020805460018201546002830154600390930154919390929190565b6005546001600160a01b031681565b6000805460ff166114df576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556114f161190c565b905080156115175761150f81601081111561150857fe5b603061247b565b915050611133565b611520836130ff565b9150506000805460ff19166001179055919050565b60035461010090046001600160a01b03163314611599576040805162461bcd60e51b815260206004820181905260248201527f6f6e6c792061646d696e206d6179207365742074686520636f6d70616e696f6e604482015290519081900360640190fd5b601280546001600160a01b0319166001600160a01b0392909216919091179055565b60075481565b60095481565b600061142a600019613084565b6001600160a01b03166000908152600f602052604090205490565b6000805460ff1661162d576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561163f61190c565b14611676576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b50600b546000805460ff1916600117905590565b6110973461322e565b6000611056826132bb565b600c5481565b6002805460408051602060018416156101000260001901909316849004601f81018490048402820184019092528181529291830182828015610fe75780601f10610fbc57610100808354040283529160200191610fe7565b600080600061170a84613335565b9092509050600082600381111561171d57fe5b14611412576040805162461bcd60e51b81526020600482015260026024820152610a8760f31b604482015290519081900360640190fd5b60035461010090046001600160a01b0316331461179d576040805162461bcd60e51b8152602060048201526002602482015261543160f01b604482015290519081900360640190fd5b6009541580156117ad5750600a54155b6117e3576040805162461bcd60e51b81526020600482015260026024820152612a1960f11b604482015290519081900360640190fd5b60078490558361181f576040805162461bcd60e51b8152602060048201526002602482015261543360f01b604482015290519081900360640190fd5b600061182a876112de565b90508015611864576040805162461bcd60e51b8152602060048201526002602482015261150d60f21b604482015290519081900360640190fd5b61186c6133e9565b600955670de0b6b3a7640000600a55611884866133ed565b905080156118be576040805162461bcd60e51b8152602060048201526002602482015261543560f01b604482015290519081900360640190fd5b83516118d1906001906020870190615a3e565b5082516118e5906002906020860190615a3e565b50506003805460ff90921660ff199283161790556000805490911660011790555050505050565b6000806119176133e9565b60095490915080821415611930576000925050506111a6565b600061193a612f93565b600b54600c54600a54600654604080516315f2405360e01b815260048101879052602481018690526044810185905290519596509394929391926000926001600160a01b03909216916315f24053916064808301926020929190829003018186803b1580156119a857600080fd5b505afa1580156119bc573d6000803e3d6000fd5b505050506040513d60208110156119d257600080fd5b5051905065048c27395000811115611a17576040805162461bcd60e51b815260206004820152600360248201526205431360ec1b604482015290519081900360640190fd5b600080611a248989613548565b90925090506000826003811115611a3757fe5b14611a6f576040805162461bcd60e51b815260206004820152600360248201526254313160e81b604482015290519081900360640190fd5b611a77615a2b565b600080600080611a9560405180602001604052808a8152508761356b565b90975094506000876003811115611aa857fe5b14611ada57611ac560096006896003811115611ac057fe5b6135d3565b9e5050505050505050505050505050506111a6565b611ae4858c612f40565b90975093506000876003811115611af757fe5b14611b0f57611ac560096001896003811115611ac057fe5b611b19848c613639565b90975092506000876003811115611b2c57fe5b14611b4457611ac560096004896003811115611ac057fe5b611b5f6040518060200160405280600854815250858c61365f565b90975091506000876003811115611b7257fe5b14611b8a57611ac560096005896003811115611ac057fe5b600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b158015611bd857600080fd5b505afa158015611bec573d6000803e3d6000fd5b505050506040513d6020811015611c0257600080fd5b505115611c4157611c16888d8d8d886136bb565b90975091506000876003811115611c2957fe5b14611c4157611ac560096005896003811115611ac057fe5b611c4c858a8b61365f565b90975090506000876003811115611c5f57fe5b14611c7757611ac560096003896003811115611ac057fe5b60098e9055600a819055600b839055600c829055604080518d8152602081018690528082018390526060810185905290517f4dec04e750ca11537cabcd8a9eab06494de08da3735bc8871cd41250e190bc049181900360800190a160009e50505050505050505050505050505090565b6000805460ff16611d25576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155611d3b33338686612cb2565b1490506000805460ff1916600117905592915050565b600a5481565b6000611d64833484613930565b509050611d9f81604051806040016040528060168152602001751b1a5c5d5a59185d19509bdc9c9bddc819985a5b195960521b815250610d62565b505050565b6006546000906001600160a01b031663b8168816611dc0612f93565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b158015611e1257600080fd5b505afa158015611e26573d6000803e3d6000fd5b505050506040513d6020811015611e3c57600080fd5b5051905090565b6000805460ff16611e81576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19169055611e9733858585613a5b565b90506000805460ff191660011790559392505050565b60035460009061010090046001600160a01b03163314611ed3576113046001604561247b565b600480546001600160a01b038481166001600160a01b0319831681179093556040805191909216808252602082019390935281517fca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9929181900390910190a16000611412565b6000805460ff16611f77576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155611f8961190c565b14611fc0576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b611fc861114b565b90506000805460ff1916600117905590565b6001600160a01b031660009081526011602052604090205490565b6001600160a01b0381166000908152600f602052604081205481908190819081808061202089613335565b93509050600081600381111561203257fe5b146120505760095b9750600096508695508594506120839350505050565b612058612b1a565b92509050600081600381111561206a57fe5b1461207657600961203a565b5060009650919450925090505b9193509193565b600061105682613c37565b600061105682613caf565b6001600160a01b03918216600090815260106020908152604080832093909416825291909152205490565b60006120d78234613d22565b509050610f5e816040518060400160405280601881526020017f7265706179426f72726f77426568616c66206661696c65640000000000000000815250610d62565b6004546000906001600160a01b031633141580612134575033155b1561214c576121456001600061247b565b90506111a6565b60038054600480546001600160a01b03818116610100818102610100600160a81b0319871617968790556001600160a01b031990931690935560408051948390048216808652929095041660208401528351909391927ff9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc92908290030190a1600454604080516001600160a01b038085168252909216602083015280517fca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a99281900390910190a160009250505090565b60008061222761190c565b9050801561224d5761224581601081111561223e57fe5b604061247b565b9150506112ca565b611412836133ed565b6006546001600160a01b031681565b60035461010090046001600160a01b031681565b6006546000906001600160a01b03166315f24053612295612f93565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b158015611e1257600080fd5b6001600160a01b0381166000908152600f602052604081206003810154829182918291829161230a615a2b565b6040518060200160405280838152509050600061232d6009548560020154613548565b915050612338615a2b565b612342838361356b565b91505061234d615a2b565b61236d6040518060200160405280670de0b6b3a764000081525083613dc6565b6001880154909250905061237f615a2b565b506040805160208101909152818152612396615a2b565b6123a08483613e00565b91505060006123b3826000015185613548565b9150506123be615a2b565b82518b546123cc9190613ee9565b9150506000866000015183836000015186600001519f509f509f509f509f50505050505050505050505091939590929450565b6000805460ff1661243d576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561244f61190c565b9050801561246d5761150f81601081111561246657fe5b604661247b565b61152083613f99565b600181565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa08360108111156124aa57fe5b8360528111156124b657fe5b604080519283526020830191909152600082820152519081900360600190a182601081111561141257fe5b6001600160a01b038216600090815260116020526040812054819015612534576040805162461bcd60e51b81526020600482015260036024820152622a189960e91b604482015290519081900360640190fd5b60055460408051634ef4c3e160e01b81523060048201526001600160a01b0387811660248301526044820187905291516000939290921691634ef4c3e19160648082019260209290919082900301818787803b15801561259357600080fd5b505af11580156125a7573d6000803e3d6000fd5b505050506040513d60208110156125bd57600080fd5b5051905080156125e1576125d46003601f836135d3565b925060009150612b139050565b6125e96133e9565b600954146125fd576125d4600a602261247b565b612605615abc565b61260d612b1a565b604083018190526020830182600381111561262457fe5b600381111561262f57fe5b905250600090508160200151600381111561264657fe5b14612670576126626009602183602001516003811115611ac057fe5b935060009250612b13915050565b608081018590526126818682614041565b61268b86866141c9565b60e08201819052604080516020810182529083015181526126ac9190614265565b60608301819052602083018260038111156126c357fe5b60038111156126ce57fe5b90525060009050816020015160038111156126e557fe5b1461271d576040805162461bcd60e51b815260206004820152600360248201526254313360e81b604482015290519081900360640190fd5b61272d600d548260600151613639565b60a083018190526020830182600381111561274457fe5b600381111561274f57fe5b905250600090508160200151600381111561276657fe5b1461279e576040805162461bcd60e51b8152602060048201526003602482015262150c4d60ea1b604482015290519081900360640190fd5b6001600160a01b0386166000908152600f602052604090205460608201516127c69190613639565b60c08301819052602083018260038111156127dd57fe5b60038111156127e857fe5b90525060009050816020015160038111156127ff57fe5b14612837576040805162461bcd60e51b815260206004820152600360248201526254313560e81b604482015290519081900360640190fd5b6006546000906001600160a01b031663b8168816612853612f93565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b1580156128a557600080fd5b505afa1580156128b9573d6000803e3d6000fd5b505050506040513d60208110156128cf57600080fd5b5051600654604080516338db09b960e21b815290519293506000926001600160a01b039092169163e36c26e491600480820192602092909190829003018186803b15801561291c57600080fd5b505afa158015612930573d6000803e3d6000fd5b505050506040513d602081101561294657600080fd5b50516001600160a01b0389166000908152600f602052604090205490915015612a2d57612971615a2b565b811561299d5760006129828a6122dd565b60408051602081019091529081529550612a1c945050505050565b6001600160a01b0389166000908152600f6020908152604080832054815180840183528181528251938401835291880151835292916129dc9190613e00565b9350905060008160038111156129ee57fe5b14612a1957612a0660096020836003811115611ac057fe5b985060009750612b139650505050505050565b50505b8051612a289089613639565b985050505b60a0830151600d556040805160808101825260c0850151815260208082018a815260095483850190815260608085018881526001600160a01b038f166000818152600f8752889020965187559351600187015591516002860155905160039094019390935560e087015192870151845193845291830191909152825190927f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f928290030190a2606083015160408051918252516001600160a01b038a16913091600080516020615b468339815191529181900360200190a3505060e00151600093509150505b9250929050565b600d54600090819080612b3557505060075460009150612cae565b6000806000612b42612f93565b9050600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b158015612b9257600080fd5b505afa158015612ba6573d6000803e3d6000fd5b505050506040513d6020811015612bbc57600080fd5b505115612c0657612bcc3361427c565b90935091506000836003811115612bdf57fe5b1415612bf45750600094509250612cae915050565b60006007549550955050505050612cae565b600654600b54600c54600d5460408051639dc8bea760e01b81526004810187905260248101949094526044840192909252606483015280516001600160a01b0390931692639dc8bea7926084808201939291829003018186803b158015612c6c57600080fd5b505afa158015612c80573d6000803e3d6000fd5b505050506040513d6040811015612c9657600080fd5b5080516020909101519096509450612cae9350505050565b9091565b600554604080516317b9b84b60e31b81523060048201526001600160a01b03868116602483015285811660448301526064820185905291516000938493169163bdcdc25891608480830192602092919082900301818787803b158015612d1757600080fd5b505af1158015612d2b573d6000803e3d6000fd5b505050506040513d6020811015612d4157600080fd5b505190508015612d6057612d586003604a836135d3565b915050612f38565b836001600160a01b0316856001600160a01b03161415612d8657612d586002604b61247b565b60006001600160a01b038781169087161415612da55750600019612dcd565b506001600160a01b038086166000908152601060209081526040808320938a16835292905220545b600080600080612ddd8589613548565b90945092506000846003811115612df057fe5b14612e0e57612e016009604b61247b565b9650505050505050612f38565b6001600160a01b038a166000908152600f6020526040902054612e319089613548565b90945091506000846003811115612e4457fe5b14612e5557612e016009604c61247b565b6001600160a01b0389166000908152600f6020526040902054612e789089613639565b90945090506000846003811115612e8b57fe5b14612e9c57612e016009604d61247b565b6001600160a01b03808b166000908152600f6020526040808220859055918b168152208190556000198514612ef4576001600160a01b03808b166000908152601060209081526040808320938f168352929052208390555b886001600160a01b03168a6001600160a01b0316600080516020615b468339815191528a6040518082815260200191505060405180910390a3600096505050505050505b949350505050565b6000806000612f4d615a2b565b612f57868661356b565b90925090506000826003811115612f6a57fe5b14612f7b5750915060009050612b13565b6000612f868261435e565b9350935050509250929050565b6000806000612fa24734613548565b91509150600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b158015612ff457600080fd5b505afa158015613008573d6000803e3d6000fd5b505050506040513d602081101561301e57600080fd5b5051156130375761303181600e54613548565b90925090505b600082600381111561304557fe5b146111a2576040805162461bcd60e51b815260206004820152600a60248201526926b0ba341032b93937b960b11b604482015290519081900360640190fd5b60008054819060ff166130c4576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556130d661190c565b905080156130f457610d318160108111156130ed57fe5b603661247b565b610d4833338661436d565b600354600090819061010090046001600160a01b03163314613127576122456001603161247b565b61312f6133e9565b6009541461314357612245600a603361247b565b8261314c612f93565b101561315e57612245600e603261247b565b600c54831115613174576122456002603461247b565b50600c54828103908111156131b6576040805162461bcd60e51b815260206004820152600360248201526254323560e81b604482015290519081900360640190fd5b600c8190556003546131d69061010090046001600160a01b0316846146b7565b600354604080516101009092046001600160a01b0316825260208201859052818101839052517f3bad0c59cf2f06e7314077049f48a93578cd16f5ef92329f1dab1420a99c177e916060908290030190a16000611412565b6000805460ff1661326c576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561327e61190c565b9050801561329c5761150f81601081111561329557fe5b605161247b565b6132a5836146ed565b509150506000805460ff19166001179055919050565b6000805460ff166132f9576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561330b61190c565b905080156133295761150f81601081111561332257fe5b602761247b565b611520336000856147bb565b6001600160a01b03811660009081526011602052604081208054829182918291829161336c5750600094508493506133e492505050565b61337c8160000154600a54615167565b9094509250600084600381111561338f57fe5b146133a45750919350600092506133e4915050565b6133b28382600101546151a6565b909450915060008460038111156133c557fe5b146133da5750919350600092506133e4915050565b5060009450925050505b915091565b4390565b600354600090819061010090046001600160a01b03163314613415576122456001604261247b565b61341d6133e9565b6009541461343157612245600a604161247b565b600660009054906101000a90046001600160a01b03169050826001600160a01b0316632191f92a6040518163ffffffff1660e01b815260040160206040518083038186803b15801561348257600080fd5b505afa158015613496573d6000803e3d6000fd5b505050506040513d60208110156134ac57600080fd5b50516134e5576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600680546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517fedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f9269281900390910190a16000611412565b60008083831161355f575060009050818303612b13565b50600390506000612b13565b6000613575615a2b565b600080613586866000015186615167565b9092509050600082600381111561359957fe5b146135b857506040805160208101909152600081529092509050612b13565b60408051602081019091529081526000969095509350505050565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa084601081111561360257fe5b84605281111561360e57fe5b604080519283526020830191909152818101859052519081900360600190a1836010811115612f3857fe5b60008083830184811061365157600092509050612b13565b506002915060009050612b13565b600080600061366c615a2b565b613676878761356b565b9092509050600082600381111561368957fe5b1461369a57509150600090506136b3565b6136ac6136a68261435e565b86613639565b9350935050505b935093915050565b60065460408051630dce3c5b60e31b815260048101879052602481018690526044810185905290516000928392839283926001600160a01b031691636e71e2d8916064808301926020929190829003018186803b15801561371b57600080fd5b505afa15801561372f573d6000803e3d6000fd5b505050506040513d602081101561374557600080fd5b505160065460085460408051635c0b440b60e11b8152600481018d9052602481018c9052604481018b90526064810192909252519293506000926001600160a01b039092169163b816881691608480820192602092909190829003018186803b1580156137b157600080fd5b505afa1580156137c5573d6000803e3d6000fd5b505050506040513d60208110156137db57600080fd5b50516006546040805163327a176d60e11b8152600481018d9052602481018c9052604481018b905290519293506001600160a01b03909116916364f42eda91606480820192602092909190829003018186803b15801561383a57600080fd5b505afa15801561384e573d6000803e3d6000fd5b505050506040513d602081101561386457600080fd5b50511561391a576138836040518060200160405280848152508b612f40565b9095509250600085600381111561389657fe5b146138a8575060009250613926915050565b6138b28382613548565b909550925060008560038111156138c557fe5b146138d7575060009250613926915050565b6138f0604051806020016040528085815250878961365f565b9095509350600085600381111561390357fe5b14613915575060009250613926915050565b613922565b600094508693505b5050505b9550959350505050565b60008054819060ff16613970576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561398261190c565b905080156139ad576139a081601081111561399957fe5b600f61247b565b925060009150613a449050565b836001600160a01b031663a6afed956040518163ffffffff1660e01b8152600401602060405180830381600087803b1580156139e857600080fd5b505af11580156139fc573d6000803e3d6000fd5b505050506040513d6020811015613a1257600080fd5b505190508015613a32576139a0816010811115613a2b57fe5b601061247b565b613a3e338787876151d1565b92509250505b6000805460ff191660011790559094909350915050565b6005546040805163d02f735160e01b81523060048201526001600160a01b038781166024830152868116604483015285811660648301526084820185905291516000938493169163d02f73519160a480830192602092919082900301818787803b158015613ac857600080fd5b505af1158015613adc573d6000803e3d6000fd5b505050506040513d6020811015613af257600080fd5b505190508015613b0957612d586003601b836135d3565b846001600160a01b0316846001600160a01b03161415613b2f57612d586006601c61247b565b6001600160a01b0384166000908152600f602052604081205481908190613b569087613548565b90935091506000836003811115613b6957fe5b14613b8c57613b816009601a856003811115611ac057fe5b945050505050612f38565b6001600160a01b0388166000908152600f6020526040902054613baf9087613639565b90935090506000836003811115613bc257fe5b14613bda57613b8160096019856003811115611ac057fe5b6001600160a01b038088166000818152600f60209081526040808320879055938c168083529184902085905583518a815293519193600080516020615b46833981519152929081900390910190a360009998505050505050505050565b6000805460ff16613c75576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155613c8761190c565b90508015613ca55761150f816010811115613c9e57fe5b600861247b565b6115203384615698565b6000805460ff16613ced576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155613cff61190c565b90508015613d165761150f81601081111561332257fe5b611520338460006147bb565b60008054819060ff16613d62576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155613d7461190c565b90508015613d9f57613d92816010811115613d8b57fe5b603561247b565b925060009150613db09050565b613daa33868661436d565b92509250505b6000805460ff1916600117905590939092509050565b6000613dd0615a2b565b600080613de586600001518660000151613639565b60408051602081019091529081529097909650945050505050565b6000613e0a615a2b565b600080613e1f86600001518660000151615167565b90925090506000826003811115613e3257fe5b14613e5157506040805160208101909152600081529092509050612b13565b600080613e666706f05b59d3b2000084613639565b90925090506000826003811115613e7957fe5b14613e9b57506040805160208101909152600081529094509250612b13915050565b600080613eb083670de0b6b3a76400006151a6565b90925090506000826003811115613ec357fe5b14613eca57fe5b604080516020810190915290815260009a909950975050505050505050565b6000613ef3615a2b565b600080613f0886670de0b6b3a7640000615167565b90925090506000826003811115613f1b57fe5b14613f3a57506040805160208101909152600081529092509050612b13565b600080613f4783886151a6565b90925090506000826003811115613f5a57fe5b14613f7c57506040805160208101909152600081529094509250612b13915050565b604080516020810190915290815260009890975095505050505050565b60035460009061010090046001600160a01b03163314613fbf576113046001604761247b565b613fc76133e9565b60095414613fdb57611304600a604861247b565b670de0b6b3a7640000821115613ff7576113046002604961247b565b6008805490839055604080518281526020810185905281517faaa68312e2ea9d50e16af5068410ab56e1a1fd06037b1a35664812c30f821460929181900390910190a16000611412565b600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b15801561408f57600080fd5b505afa1580156140a3573d6000803e3d6000fd5b505050506040513d60208110156140b957600080fd5b505115610f5e576001600160a01b038083166000908152600f60205260408082206012546001820154608087015184516306d3af0d60e51b81526004810192909252602482015292519194169263da75e1a0926044808201939182900301818387803b15801561412857600080fd5b505af115801561413c573d6000803e3d6000fd5b5050601254600d546080860151604080880151815160016235be3960e21b03198152600481019490945260248401929092526044830191909152516001600160a01b03909216935063ff29071c925060648082019260009290919082900301818387803b1580156141ac57600080fd5b505af11580156141c0573d6000803e3d6000fd5b50505050505050565b6000336001600160a01b0384161461421a576040805162461bcd60e51b815260206004820152600f60248201526e0e6cadcc8cae440dad2e6dac2e8c6d608b1b604482015290519081900360640190fd5b81341461425f576040805162461bcd60e51b815260206004820152600e60248201526d0ecc2d8eaca40dad2e6dac2e8c6d60931b604482015290519081900360640190fd5b50919050565b6000806000614272615a2b565b612f578686615930565b600080600d54600014156142975750506007546000906133e4565b6001600160a01b0383166000908152600f6020526040902060028101546142c6575060019150600090506133e4565b80546142da575050600754600091506133e4565b60006142e5856122dd565b5050509150506142f3615a2b565b506040805160208101909152818152600183015461430f615a2b565b506040805160208101909152818152614326615a2b565b6143308483613e00565b91505061433b615a2b565b815187546143499190613ee9565b5160009a5098506133e4975050505050505050565b51670de0b6b3a7640000900490565b60055460408051631200453160e11b81523060048201526001600160a01b0386811660248301528581166044830152606482018590529151600093849384939116916324008a629160848082019260209290919082900301818787803b1580156143d657600080fd5b505af11580156143ea573d6000803e3d6000fd5b505050506040513d602081101561440057600080fd5b5051905080156144245761441760036038836135d3565b9250600091506136b39050565b61442c6133e9565b6009541461444057614417600a603961247b565b614448615abc565b6001600160a01b038616600090815260116020526040902060010154606082015261447286613335565b608083018190526020830182600381111561448957fe5b600381111561449457fe5b90525060009050816020015160038111156144ab57fe5b146144d5576144c76009603783602001516003811115611ac057fe5b9350600092506136b3915050565b600019851415614502576080810151604082018190526144f8908890600161598f565b60e0820152614519565b6040810185905261451387866141c9565b60e08201525b61452b81608001518260e00151613548565b60a083018190526020830182600381111561454257fe5b600381111561454d57fe5b905250600090508160200151600381111561456457fe5b1461459c576040805162461bcd60e51b815260206004820152600360248201526254313760e81b604482015290519081900360640190fd5b6145ac600b548260e00151613548565b60c08301819052602083018260038111156145c357fe5b60038111156145ce57fe5b90525060009050816020015160038111156145e557fe5b1461461d576040805162461bcd60e51b81526020600482015260036024820152620a862760eb1b604482015290519081900360640190fd5b60a0810180516001600160a01b03808916600081815260116020908152604091829020948555600a5460019095019490945560c0860151600b81905560e087015195518251968752948601949094528481019390935291519192908a16917f1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a19181900360600190a360e00151600097909650945050505050565b6040516001600160a01b0383169082156108fc029083906000818181858888f19350505050158015611d9f573d6000803e3d6000fd5b6000806000806146fb6133e9565b6009541461471a5761470f600a605261247b565b935091506133e49050565b61472433866141c9565b905080600e54019150600e5482101561476a576040805162461bcd60e51b8152602060048201526003602482015262150c8d60ea1b604482015290519081900360640190fd5b600e829055604080513381526020810183905280820184905290517f3b1f8ad9af3f4b191c8118fa7e5ff5c809518c2c9c8b091de2378057f646bbe29181900360600190a160009350915050915091565b60008215806147c8575081155b6147ff576040805162461bcd60e51b81526020600482015260036024820152622a189b60e91b604482015290519081900360640190fd5b614807615abc565b6001600160a01b0385166000908152600f60205260409020614827612b1a565b604084018190526020840182600381111561483e57fe5b600381111561484957fe5b905250600090508260200151600381111561486057fe5b146148855761487c6009602b84602001516003811115611ac057fe5b92505050611412565b6000806000806000600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b1580156148db57600080fd5b505afa1580156148ef573d6000803e3d6000fd5b505050506040513d602081101561490557600080fd5b50519050801561492c576149188b6122dd565b60018b018190559198509095508594505050505b6006546001600160a01b031663b8168816614945612f93565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b15801561499757600080fd5b505afa1580156149ab573d6000803e3d6000fd5b505050506040513d60208110156149c157600080fd5b50516003870155808015614a5f57506006546001600160a01b03166364f42eda6149e9612f93565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b158015614a3157600080fd5b505afa158015614a45573d6000803e3d6000fd5b505050506040513d6020811015614a5b57600080fd5b5051155b15614be5576006546000906001600160a01b03166315f24053614a80612f93565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b158015614ac857600080fd5b505afa158015614adc573d6000803e3d6000fd5b505050506040513d6020811015614af257600080fd5b50516006549091506000906001600160a01b0316636e71e2d8614b13612f93565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b158015614b5b57600080fd5b505afa158015614b6f573d6000803e3d6000fd5b505050506040513d6020811015614b8557600080fd5b50516040805160208101909152838152909150600090614ba59083612f40565b915050614bb6896003015482613548565b9750614bc29050615a2b565b614bd0888b60030154613ee9565b915050614bdd818a612f40565b985050505050505b600019891415614c1b57604080516020810182529088015181528654614c0b9190612f40565b608089018190529950614c239050565b608087018990525b8915614d1057606087018a90528015614c8c5785548a1415614c4e5760018601546080880152614c87565b614c56615a2b565b614c648860600151846159e8565b915050614c6f615a2b565b81518854614c7d9190613ee9565b5160808b01525050505b614d0b565b614ca8604051806020016040528089604001518152508b612f40565b6080890181905260208901826003811115614cbf57fe5b6003811115614cca57fe5b9052506000905087602001516003811115614ce157fe5b14614d0b57614cfd6009602989602001516003811115611ac057fe5b975050505050505050611412565b614dce565b608087018990528015614d5d57614d25615a2b565b614d37886080015188600001546159e8565b915050614d42615a2b565b8151614d4e9085613ee9565b5160608b015250614dce915050565b614d798960405180602001604052808a60400151815250614265565b6060890181905260208901826003811115614d9057fe5b6003811115614d9b57fe5b9052506000905087602001516003811115614db257fe5b14614dce57614cfd6009602a89602001516003811115611ac057fe5b60055460608801516040805163eabe7d9160e01b81523060048201526001600160a01b038f8116602483015260448201939093529051600093929092169163eabe7d919160648082019260209290919082900301818787803b158015614e3357600080fd5b505af1158015614e47573d6000803e3d6000fd5b505050506040513d6020811015614e5d57600080fd5b505190508015614e8357614e7460036028836135d3565b98505050505050505050611412565b614e8b6133e9565b60095414614e9f57614e74600a602c61247b565b614eaf600d548960600151613548565b60a08a0181905260208a01826003811115614ec657fe5b6003811115614ed157fe5b9052506000905088602001516003811115614ee857fe5b14614f0457614e746009602e8a602001516003811115611ac057fe5b614f10600e5486613548565b60e08a01525086546060890151614f279190613548565b60c08a0181905260208a01826003811115614f3e57fe5b6003811115614f4957fe5b9052506000905088602001516003811115614f6057fe5b14614f7c57614e746009602d8a602001516003811115611ac057fe5b6000614f86612f93565b90508215614f915750475b8860800151811015614fb957614fa9600e602f61247b565b9950505050505050505050611412565b614fc78d8a608001516146b7565b60a0890151600d5560e0890151600e5560c089015188556009546002890155600188015460808a0151614ffa9190613548565b9050886001016000829190505550306001600160a01b03168d6001600160a01b0316600080516020615b468339815191528b606001516040518082815260200191505060405180910390a38c6001600160a01b03167fe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a9298a608001518b60600151604051808381526020018281526020019250505060405180910390a2600560009054906101000a90046001600160a01b03166001600160a01b03166351dff989308f8c608001518d606001516040518563ffffffff1660e01b815260040180856001600160a01b03166001600160a01b03168152602001846001600160a01b03166001600160a01b03168152602001838152602001828152602001945050505050600060405180830381600087803b15801561513557600080fd5b505af1158015615149573d6000803e3d6000fd5b5060009250615156915050565b9d9c50505050505050505050505050565b6000808361517a57506000905080612b13565b8383028385828161518757fe5b041461519b57506002915060009050612b13565b600092509050612b13565b600080826151ba5750600190506000612b13565b60008385816151c557fe5b04915091509250929050565b60055460408051632fe3f38f60e11b81523060048201526001600160a01b0384811660248301528781166044830152868116606483015260848201869052915160009384938493911691635fc7e71e9160a48082019260209290919082900301818787803b15801561524257600080fd5b505af1158015615256573d6000803e3d6000fd5b505050506040513d602081101561526c57600080fd5b5051905080156152905761528360036012836135d3565b92506000915061568f9050565b6152986133e9565b600954146152ac57615283600a601661247b565b6152b46133e9565b846001600160a01b0316636c540baf6040518163ffffffff1660e01b815260040160206040518083038186803b1580156152ed57600080fd5b505afa158015615301573d6000803e3d6000fd5b505050506040513d602081101561531757600080fd5b50511461532a57615283600a601161247b565b866001600160a01b0316866001600160a01b03161415615350576152836006601761247b565b84615361576152836007601561247b565b600019851415615377576152836007601461247b565b60008061538589898961436d565b909250905081156153b5576153a682601081111561539f57fe5b601861247b565b94506000935061568f92505050565b6005546040805163c488847b60e01b81523060048201526001600160a01b038981166024830152604482018590528251600094859492169263c488847b926064808301939192829003018186803b15801561540f57600080fd5b505afa158015615423573d6000803e3d6000fd5b505050506040513d604081101561543957600080fd5b50805160209091015190925090508115615480576040805162461bcd60e51b815260206004820152600360248201526254313960e81b604482015290519081900360640190fd5b80886001600160a01b03166370a082318c6040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060206040518083038186803b1580156154d757600080fd5b505afa1580156154eb573d6000803e3d6000fd5b505050506040513d602081101561550157600080fd5b5051101561553c576040805162461bcd60e51b815260206004820152600360248201526205432360ec1b604482015290519081900360640190fd5b60006001600160a01b0389163014156155625761555b308d8d85613a5b565b90506155ec565b6040805163b2a02ff160e01b81526001600160a01b038e811660048301528d81166024830152604482018590529151918b169163b2a02ff1916064808201926020929091908290030181600087803b1580156155bd57600080fd5b505af11580156155d1573d6000803e3d6000fd5b505050506040513d60208110156155e757600080fd5b505190505b8015615625576040805162461bcd60e51b815260206004820152600360248201526254323160e81b604482015290519081900360640190fd5b886001600160a01b03168b6001600160a01b03168d6001600160a01b03167f298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb528786604051808381526020018281526020019250505060405180910390a46000975092955050505050505b94509492505050565b6005546040805163368f515360e21b81523060048201526001600160a01b0385811660248301526044820185905291516000938493169163da3d454c91606480830192602092919082900301818787803b1580156156f557600080fd5b505af1158015615709573d6000803e3d6000fd5b505050506040513d602081101561571f57600080fd5b50519050801561573e576157366003600e836135d3565b915050611056565b6157466133e9565b6009541461575957615736600a8061247b565b82615762612f93565b101561577457615736600e600961247b565b61577c615b02565b61578585613335565b602083018190528282600381111561579957fe5b60038111156157a457fe5b90525060009050815160038111156157b857fe5b146157dd576157d46009600783600001516003811115611ac057fe5b92505050611056565b6157eb816020015185613639565b60408301819052828260038111156157ff57fe5b600381111561580a57fe5b905250600090508151600381111561581e57fe5b1461583a576157d46009600c83600001516003811115611ac057fe5b615846600b5485613639565b606083018190528282600381111561585a57fe5b600381111561586557fe5b905250600090508151600381111561587957fe5b14615895576157d46009600b83600001516003811115611ac057fe5b61589f8582615a23565b90506158ab85856146b7565b604080820180516001600160a01b03881660008181526011602090815290859020928355600a54600190930192909255606080860151600b819055935185518a8152938401528285019390935292517f13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80929181900390910190a2600095945050505050565b600061593a615a2b565b60008061594f670de0b6b3a764000087615167565b9092509050600082600381111561596257fe5b1461598157506040805160208101909152600081529092509050612b13565b612f86818660000151613ee9565b6000336001600160a01b038516146159e0576040805162461bcd60e51b815260206004820152600f60248201526e0e6cadcc8cae440dad2e6dac2e8c6d608b1b604482015290519081900360640190fd5b509092915050565b60006159f2615a2b565b615a18604051806020016040528086815250604051806020016040528086815250613e00565b915091509250929050565b61425f615b02565b6040518060200160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10615a7f57805160ff1916838001178555615aac565b82800160010185558215615aac579182015b82811115615aac578251825591602001919060010190615a91565b50615ab8929150615b2b565b5090565b6040805161010081019091528060008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b604080516080810190915280600081526020016000815260200160008152602001600081525090565b6111a691905b80821115615ab85760008155600101615b3156feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa265627a7a72315820a09d4270163a2a7da6fe3e4ea6155e92d6212f7a19bbe3c16e70edc651d069db64736f6c63430005100032";
var linkReferences$4 = {
};
var deployedLinkReferences$4 = {
};
var CRBTCArtifact = {
	_format: _format$4,
	contractName: contractName$4,
	sourceName: sourceName$4,
	abi: abi$4,
	bytecode: bytecode$4,
	deployedBytecode: deployedBytecode$4,
	linkReferences: linkReferences$4,
	deployedLinkReferences: deployedLinkReferences$4
};

var Market = function () {
  function Market(tropykus, abi, marketAddress) {
    _classCallCheck(this, Market);
    this.tropykus = tropykus;
    this.address = marketAddress;
    this.instance = new ethers.Contract(marketAddress, abi, this.tropykus.ethersProvider);
  }
  _createClass(Market, [{
    key: "balanceOfUnderlying",
    value: function balanceOfUnderlying(account) {
      var _this = this;
      return new Promise(function (resolve, reject) {
        _this.instance.connect(account).callStatic.balanceOfUnderlying(account.address).then(function (balance) {
          return Number(balance) / 1e18;
        }).then(resolve)["catch"](reject);
      });
    }
  }, {
    key: "balanceOf",
    value: function balanceOf(account) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        _this2.instance.connect(account).callStatic.balanceOf(account.address).then(function (balance) {
          return Number(balance) / 1e18;
        }).then(resolve)["catch"](reject);
      });
    }
  }, {
    key: "borrowBalanceCurrent",
    value: function () {
      var _borrowBalanceCurrent = _asyncToGenerator( regeneratorRuntime.mark(function _callee(account) {
        var _this3 = this;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  _this3.instance.connect(account).callStatic.borrowBalanceCurrent(account.address).then(function (balance) {
                    return Number(balance) / 1e18;
                  }).then(resolve)["catch"](reject);
                }));
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function borrowBalanceCurrent(_x) {
        return _borrowBalanceCurrent.apply(this, arguments);
      }
      return borrowBalanceCurrent;
    }()
  }, {
    key: "mint",
    value: function mint(account, amount) {
      var _this4 = this;
      return new Promise(function (resolve, reject) {
        _this4.instance.connect(account).mint({
          value: ethers.utils.parseEther(amount.toString()),
          gasLimit: _this4.tropykus.gasLimit
        }).then(resolve)["catch"](reject);
      });
    }
  }, {
    key: "borrow",
    value: function borrow(account, amount) {
      var _this5 = this;
      return new Promise(function (resolve, reject) {
        _this5.instance.connect(account).borrow(ethers.utils.parseEther(amount.toString()), {
          gasLimit: _this5.tropykus.gasLimit
        }).then(resolve)["catch"](reject);
      });
    }
  }, {
    key: "setReserveFactor",
    value: function setReserveFactor(reserveFactor) {
      var _this6 = this;
      return new Promise(function (resolve, reject) {
        _this6.instance.connect(_this6.tropykus.account)._setReserveFactor(ethers.utils.parseEther(reserveFactor.toString())).then(resolve)["catch"](reject);
      });
    }
  }]);
  return Market;
}();

var CRBTC = function (_Market) {
  _inherits(CRBTC, _Market);
  var _super = _createSuper(CRBTC);
  function CRBTC(tropykus, contractAddress) {
    _classCallCheck(this, CRBTC);
    return _super.call(this, tropykus, CRBTCArtifact.abi, contractAddress);
  }
  return CRBTC;
}(Market);

var _format$3 = "hh-sol-artifact-1";
var contractName$3 = "CRDOC";
var sourceName$3 = "contracts/CRDOC.sol";
var abi$3 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "underlying_",
				type: "address"
			},
			{
				internalType: "contract ComptrollerInterface",
				name: "comptroller_",
				type: "address"
			},
			{
				internalType: "contract InterestRateModel",
				name: "interestRateModel_",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "initialExchangeRateMantissa_",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "name_",
				type: "string"
			},
			{
				internalType: "string",
				name: "symbol_",
				type: "string"
			},
			{
				internalType: "uint8",
				name: "decimals_",
				type: "uint8"
			},
			{
				internalType: "address payable",
				name: "admin_",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "cashPrior",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "interestAccumulated",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "borrowIndex",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "totalBorrows",
				type: "uint256"
			}
		],
		name: "AccrueInterest",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "borrowAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "accountBorrows",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "totalBorrows",
				type: "uint256"
			}
		],
		name: "Borrow",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "error",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "info",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "detail",
				type: "uint256"
			}
		],
		name: "Failure",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "liquidator",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "repayAmount",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "cTokenCollateral",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "seizeTokens",
				type: "uint256"
			}
		],
		name: "LiquidateBorrow",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "minter",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "mintAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "mintTokens",
				type: "uint256"
			}
		],
		name: "Mint",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldAdmin",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newAdmin",
				type: "address"
			}
		],
		name: "NewAdmin",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract ComptrollerInterface",
				name: "oldComptroller",
				type: "address"
			},
			{
				indexed: false,
				internalType: "contract ComptrollerInterface",
				name: "newComptroller",
				type: "address"
			}
		],
		name: "NewComptroller",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract InterestRateModel",
				name: "oldInterestRateModel",
				type: "address"
			},
			{
				indexed: false,
				internalType: "contract InterestRateModel",
				name: "newInterestRateModel",
				type: "address"
			}
		],
		name: "NewMarketInterestRateModel",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldPendingAdmin",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newPendingAdmin",
				type: "address"
			}
		],
		name: "NewPendingAdmin",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "oldReserveFactorMantissa",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newReserveFactorMantissa",
				type: "uint256"
			}
		],
		name: "NewReserveFactor",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "redeemer",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "redeemAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "redeemTokens",
				type: "uint256"
			}
		],
		name: "Redeem",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "payer",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "repayAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "accountBorrows",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "totalBorrows",
				type: "uint256"
			}
		],
		name: "RepayBorrow",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "benefactor",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "addAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newTotalReserves",
				type: "uint256"
			}
		],
		name: "ReservesAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "admin",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "reduceAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newTotalReserves",
				type: "uint256"
			}
		],
		name: "ReservesReduced",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "benefactor",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "addAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newSubsidyFund",
				type: "uint256"
			}
		],
		name: "SubsidyAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		constant: false,
		inputs: [
		],
		name: "_acceptAdmin",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "addAmount",
				type: "uint256"
			}
		],
		name: "_addReserves",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "reduceAmount",
				type: "uint256"
			}
		],
		name: "_reduceReserves",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract ComptrollerInterface",
				name: "newComptroller",
				type: "address"
			}
		],
		name: "_setComptroller",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract InterestRateModel",
				name: "newInterestRateModel",
				type: "address"
			}
		],
		name: "_setInterestRateModel",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address payable",
				name: "newPendingAdmin",
				type: "address"
			}
		],
		name: "_setPendingAdmin",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "newReserveFactorMantissa",
				type: "uint256"
			}
		],
		name: "_setReserveFactor",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "accrualBlockNumber",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "accrueInterest",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "admin",
		outputs: [
			{
				internalType: "address payable",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOfUnderlying",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "borrowAmount",
				type: "uint256"
			}
		],
		name: "borrow",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "borrowBalanceCurrent",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "borrowBalanceStored",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "borrowIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "borrowRatePerBlock",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "comptroller",
		outputs: [
			{
				internalType: "contract ComptrollerInterface",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "exchangeRateCurrent",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "exchangeRateStored",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "getAccountSnapshot",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "getBorrowerPrincipalStored",
		outputs: [
			{
				internalType: "uint256",
				name: "borrowed",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getCash",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "getSupplierSnapshotStored",
		outputs: [
			{
				internalType: "uint256",
				name: "tokens",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "underlyingAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "suppliedAt",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "promisedSupplyRate",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "initialExchangeRateMantissa",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "underlying_",
				type: "address"
			},
			{
				internalType: "contract ComptrollerInterface",
				name: "comptroller_",
				type: "address"
			},
			{
				internalType: "contract InterestRateModel",
				name: "interestRateModel_",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "initialExchangeRateMantissa_",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "name_",
				type: "string"
			},
			{
				internalType: "string",
				name: "symbol_",
				type: "string"
			},
			{
				internalType: "uint8",
				name: "decimals_",
				type: "uint8"
			}
		],
		name: "initialize",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract ComptrollerInterface",
				name: "comptroller_",
				type: "address"
			},
			{
				internalType: "contract InterestRateModel",
				name: "interestRateModel_",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "initialExchangeRateMantissa_",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "name_",
				type: "string"
			},
			{
				internalType: "string",
				name: "symbol_",
				type: "string"
			},
			{
				internalType: "uint8",
				name: "decimals_",
				type: "uint8"
			}
		],
		name: "initialize",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "interestRateModel",
		outputs: [
			{
				internalType: "contract InterestRateModel",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "isCToken",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "repayAmount",
				type: "uint256"
			},
			{
				internalType: "contract CTokenInterface",
				name: "cTokenCollateral",
				type: "address"
			}
		],
		name: "liquidateBorrow",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "mintAmount",
				type: "uint256"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "pendingAdmin",
		outputs: [
			{
				internalType: "address payable",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "redeemTokens",
				type: "uint256"
			}
		],
		name: "redeem",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "redeemAmount",
				type: "uint256"
			}
		],
		name: "redeemUnderlying",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "repayAmount",
				type: "uint256"
			}
		],
		name: "repayBorrow",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "repayAmount",
				type: "uint256"
			}
		],
		name: "repayBorrowBehalf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "reserveFactorMantissa",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "liquidator",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "seizeTokens",
				type: "uint256"
			}
		],
		name: "seize",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "subsidyFund",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "supplyRatePerBlock",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract EIP20NonStandardInterface",
				name: "token",
				type: "address"
			}
		],
		name: "sweepToken",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalBorrows",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "totalBorrowsCurrent",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalReserves",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "dst",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "src",
				type: "address"
			},
			{
				internalType: "address",
				name: "dst",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "tropykusInterestAccrued",
		outputs: [
			{
				internalType: "enum CarefulMath.MathError",
				name: "",
				type: "uint8"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "underlying",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];
var bytecode$3 = "0x60806040523480156200001157600080fd5b50604051620062253803806200622583398181016040526101008110156200003857600080fd5b81516020830151604080850151606086015160808701805193519597949692959194919392820192846401000000008211156200007457600080fd5b9083019060208201858111156200008a57600080fd5b8251640100000000811182820188101715620000a557600080fd5b82525081516020918201929091019080838360005b83811015620000d4578181015183820152602001620000ba565b50505050905090810190601f168015620001025780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200012657600080fd5b9083019060208201858111156200013c57600080fd5b82516401000000008111828201881017156200015757600080fd5b82525081516020918201929091019080838360005b83811015620001865781810151838201526020016200016c565b50505050905090810190601f168015620001b45780820380516001836020036101000a031916815260200191505b506040908152602082015191015160038054610100600160a81b03191633610100021790559092509050620001ef8888888888888862000223565b600380546001600160a01b0390921661010002610100600160a81b031990921691909117905550620008a695505050505050565b6200023e868686868686620002d260201b620014dc1760201c565b601280546001600160a01b0319166001600160a01b038981169190911791829055604080516318160ddd60e01b8152905192909116916318160ddd91600480820192602092909190829003018186803b1580156200029b57600080fd5b505afa158015620002b0573d6000803e3d6000fd5b505050506040513d6020811015620002c757600080fd5b505050505050505050565b60035461010090046001600160a01b031633146200031c576040805162461bcd60e51b8152602060048201526002602482015261543160f01b604482015290519081900360640190fd5b6009541580156200032d5750600a54155b62000364576040805162461bcd60e51b81526020600482015260026024820152612a1960f11b604482015290519081900360640190fd5b600784905583620003a1576040805162461bcd60e51b8152602060048201526002602482015261543360f01b604482015290519081900360640190fd5b6000620003b7876001600160e01b03620004b516565b90508015620003f2576040805162461bcd60e51b8152602060048201526002602482015261150d60f21b604482015290519081900360640190fd5b620004056001600160e01b036200060316565b600955670de0b6b3a7640000600a5562000428866001600160e01b036200060816565b9050801562000463576040805162461bcd60e51b8152602060048201526002602482015261543560f01b604482015290519081900360640190fd5b83516200047890600190602087019062000804565b5082516200048e90600290602086019062000804565b50506003805460ff90921660ff199283161790556000805490911660011790555050505050565b60035460009061010090046001600160a01b03163314620004ef57620004e76001603f6001600160e01b036200079416565b9050620005fe565b60055460408051623f1ee960e11b815290516001600160a01b0392831692851691627e3dd2916004808301926020929190829003018186803b1580156200053557600080fd5b505afa1580156200054a573d6000803e3d6000fd5b505050506040513d60208110156200056157600080fd5b50516200059b576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600580546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517f7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d9281900390910190a160005b9150505b919050565b435b90565b600354600090819061010090046001600160a01b0316331462000645576200063c600160426001600160e01b036200079416565b915050620005fe565b620006586001600160e01b036200060316565b6009541462000678576200063c600a60416001600160e01b036200079416565b600660009054906101000a90046001600160a01b03169050826001600160a01b0316632191f92a6040518163ffffffff1660e01b815260040160206040518083038186803b158015620006ca57600080fd5b505afa158015620006df573d6000803e3d6000fd5b505050506040513d6020811015620006f657600080fd5b505162000730576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600680546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517fedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f9269281900390910190a16000620005fa565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0836010811115620007c457fe5b836052811115620007d157fe5b604080519283526020830191909152600082820152519081900360600190a1826010811115620007fd57fe5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200084757805160ff191683800117855562000877565b8280016001018555821562000877579182015b82811115620008775782518255916020019190600101906200085a565b506200088592915062000889565b5090565b6200060591905b8082111562000885576000815560010162000890565b61596f80620008b66000396000f3fe608060405234801561001057600080fd5b50600436106103425760003560e01c8063852a12e3116101b8578063c139562b11610104578063f3fdb15a116100a2578063f8f9da281161007c578063f8f9da2814610b59578063fc610b3d14610b61578063fca7820b14610bc7578063fe9c44ae14610be457610342565b8063f3fdb15a14610b13578063f5e3c46214610b1b578063f851a44014610b5157610342565b8063db006a75116100de578063db006a7514610a9a578063dd62ed3e14610ab7578063e9c714f214610ae5578063f2b3abbd14610aed57610342565b8063c139562b14610a31578063c37f68e214610a57578063c5ebeaec14610a7d57610342565b8063a6afed9511610171578063ae9d70b01161014b578063ae9d70b0146109c5578063b2a02ff1146109cd578063b71d1a0c14610a03578063bd6d894d14610a2957610342565b8063a6afed9514610989578063a9059cbb14610991578063aa5af0fd146109bd57610342565b8063852a12e3146107cb5780638f840ddd146107e857806395d89b41146107f057806395dd9193146107f857806399d8c1b41461081e578063a0712d681461096c57610342565b8063313ce567116102925780635fe3b567116102305780636c540baf1161020a5780636c540baf1461078d5780636f307dc31461079557806370a082311461079d57806373acee98146107c357610342565b80635fe3b56714610760578063601a0bf114610768578063675d972c1461078557610342565b80633e9410101161026c5780633e941010146106c95780634576b5db146106e657806347bd37181461070c578063524fe4b51461071457610342565b8063313ce5671461067d5780633af9e6691461069b5780633b1d21a2146106c157610342565b8063182df0f5116102ff5780631df0ba9d116102d95780631df0ba9d146105ef57806323b872dd146105f75780632608f8181461062d578063267822471461065957610342565b8063182df0f5146104695780631a31d465146104715780631be19560146105c957610342565b806306fdde0314610347578063095ea7b3146103c45780630e75270214610404578063173b99041461043357806317bfdfbc1461043b57806318160ddd14610461575b600080fd5b61034f610bec565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610389578181015183820152602001610371565b50505050905090810190601f1680156103b65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6103f0600480360360408110156103da57600080fd5b506001600160a01b038135169060200135610c79565b604080519115158252519081900360200190f35b6104216004803603602081101561041a57600080fd5b5035610ce6565b60408051918252519081900360200190f35b610421610cfc565b6104216004803603602081101561045157600080fd5b50356001600160a01b0316610d02565b610421610da7565b610421610dad565b6105c7600480360360e081101561048757600080fd5b6001600160a01b03823581169260208101358216926040820135909216916060820135919081019060a081016080820135600160201b8111156104c957600080fd5b8201836020820111156104db57600080fd5b803590602001918460018302840111600160201b831117156104fc57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b81111561054e57600080fd5b82018360208201111561056057600080fd5b803590602001918460018302840111600160201b8311171561058157600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505050903560ff169150610e0b9050565b005b6105c7600480360360208110156105df57600080fd5b50356001600160a01b0316610eaa565b610421610fe1565b6103f06004803603606081101561060d57600080fd5b506001600160a01b03813581169160208101359091169060400135610fe7565b6104216004803603604081101561064357600080fd5b506001600160a01b038135169060200135611052565b610661611068565b604080516001600160a01b039092168252519081900360200190f35b610685611077565b6040805160ff9092168252519081900360200190f35b610421600480360360208110156106b157600080fd5b50356001600160a01b0316611080565b61042161111b565b610421600480360360208110156106df57600080fd5b503561112a565b610421600480360360208110156106fc57600080fd5b50356001600160a01b0316611135565b610421611270565b61073a6004803603602081101561072a57600080fd5b50356001600160a01b0316611276565b604080519485526020850193909352838301919091526060830152519081900360800190f35b6106616112a7565b6104216004803603602081101561077e57600080fd5b50356112b6565b61042161134a565b610421611350565b610661611356565b610421600480360360208110156107b357600080fd5b50356001600160a01b0316611365565b610421611380565b610421600480360360208110156107e157600080fd5b503561141b565b610421611426565b61034f61142c565b6104216004803603602081101561080e57600080fd5b50356001600160a01b0316611484565b6105c7600480360360c081101561083457600080fd5b6001600160a01b03823581169260208101359091169160408201359190810190608081016060820135600160201b81111561086e57600080fd5b82018360208201111561088057600080fd5b803590602001918460018302840111600160201b831117156108a157600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b8111156108f357600080fd5b82018360208201111561090557600080fd5b803590602001918460018302840111600160201b8311171561092657600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505050903560ff1691506114dc9050565b6104216004803603602081101561098257600080fd5b5035611694565b6104216116a0565b6103f0600480360360408110156109a757600080fd5b506001600160a01b038135169060200135611a7b565b610421611ae5565b610421611aeb565b610421600480360360608110156109e357600080fd5b506001600160a01b03813581169160208101359091169060400135611b8a565b61042160048036036020811015610a1957600080fd5b50356001600160a01b0316611bf4565b610421611c80565b61042160048036036020811015610a4757600080fd5b50356001600160a01b0316611d21565b61073a60048036036020811015610a6d57600080fd5b50356001600160a01b0316611d3c565b61042160048036036020811015610a9357600080fd5b5035611dd1565b61042160048036036020811015610ab057600080fd5b5035611ddc565b61042160048036036040811015610acd57600080fd5b506001600160a01b0381358116916020013516611de7565b610421611e12565b61042160048036036020811015610b0357600080fd5b50356001600160a01b0316611f15565b610661611f4f565b61042160048036036060811015610b3157600080fd5b506001600160a01b03813581169160208101359160409091013516611f5e565b610661611f76565b610421611f8a565b610b8760048036036020811015610b7757600080fd5b50356001600160a01b0316611fee565b60405180866003811115610b9757fe5b60ff1681526020018581526020018481526020018381526020018281526020019550505050505060405180910390f35b61042160048036036020811015610bdd57600080fd5b5035612110565b6103f0612187565b60018054604080516020600284861615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015610c715780601f10610c4657610100808354040283529160200191610c71565b820191906000526020600020905b815481529060010190602001808311610c5457829003601f168201915b505050505081565b3360008181526010602090815260408083206001600160a01b03871680855290835281842086905581518681529151939493909284927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a360019150505b92915050565b600080610cf28361218c565b509150505b919050565b60085481565b6000805460ff16610d40576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155610d526116a0565b14610d89576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b610d9282611484565b90505b6000805460ff19166001179055919050565b600d5481565b6000806000610dba61222e565b90925090506000826003811115610dcd57fe5b14610e04576040805162461bcd60e51b8152602060048201526002602482015261543960f01b604482015290519081900360640190fd5b9150505b90565b610e198686868686866114dc565b601280546001600160a01b0319166001600160a01b038981169190911791829055604080516318160ddd60e01b8152905192909116916318160ddd91600480820192602092909190829003018186803b158015610e7557600080fd5b505afa158015610e89573d6000803e3d6000fd5b505050506040513d6020811015610e9f57600080fd5b505050505050505050565b6012546001600160a01b0382811691161415610ef2576040805162461bcd60e51b8152602060048201526002602482015261453160f01b604482015290519081900360640190fd5b604080516370a0823160e01b815230600482015290516000916001600160a01b038416916370a0823191602480820192602092909190829003018186803b158015610f3c57600080fd5b505afa158015610f50573d6000803e3d6000fd5b505050506040513d6020811015610f6657600080fd5b50516003546040805163a9059cbb60e01b81526101009092046001600160a01b03908116600484015260248301849052905192935084169163a9059cbb9160448082019260009290919082900301818387803b158015610fc557600080fd5b505af1158015610fd9573d6000803e3d6000fd5b505050505050565b600e5481565b6000805460ff16611025576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561103b338686866123c6565b1490506000805460ff191660011790559392505050565b60008061105f8484612652565b50949350505050565b6004546001600160a01b031681565b60035460ff1681565b600061108a615800565b604051806020016040528061109d611c80565b90526001600160a01b0384166000908152600f60205260408120549192509081906110c99084906126f6565b909250905060008260038111156110dc57fe5b14611113576040805162461bcd60e51b81526020600482015260026024820152612a1b60f11b604482015290519081900360640190fd5b949350505050565b600061112561274a565b905090565b6000610ce0826127ca565b60035460009061010090046001600160a01b031633146111625761115b6001603f612857565b9050610cf7565b60055460408051623f1ee960e11b815290516001600160a01b0392831692851691627e3dd2916004808301926020929190829003018186803b1580156111a757600080fd5b505afa1580156111bb573d6000803e3d6000fd5b505050506040513d60208110156111d157600080fd5b505161120a576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600580546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517f7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d9281900390910190a160005b9392505050565b600b5481565b6001600160a01b03166000908152600f60205260409020805460018201546002830154600390930154919390929190565b6005546001600160a01b031681565b6000805460ff166112f4576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556113066116a0565b9050801561132c5761132481601081111561131d57fe5b6030612857565b915050610d95565b611335836128bd565b9150506000805460ff19166001179055919050565b60075481565b60095481565b6012546001600160a01b031681565b6001600160a01b03166000908152600f602052604090205490565b6000805460ff166113be576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556113d06116a0565b14611407576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b50600b546000805460ff1916600117905590565b6000610ce0826129ec565b600c5481565b6002805460408051602060018416156101000260001901909316849004601f81018490048402820184019092528181529291830182828015610c715780601f10610c4657610100808354040283529160200191610c71565b600080600061149284612a66565b909250905060008260038111156114a557fe5b14611269576040805162461bcd60e51b81526020600482015260026024820152610a8760f31b604482015290519081900360640190fd5b60035461010090046001600160a01b03163314611525576040805162461bcd60e51b8152602060048201526002602482015261543160f01b604482015290519081900360640190fd5b6009541580156115355750600a54155b61156b576040805162461bcd60e51b81526020600482015260026024820152612a1960f11b604482015290519081900360640190fd5b6007849055836115a7576040805162461bcd60e51b8152602060048201526002602482015261543360f01b604482015290519081900360640190fd5b60006115b287611135565b905080156115ec576040805162461bcd60e51b8152602060048201526002602482015261150d60f21b604482015290519081900360640190fd5b6115f4612b1a565b600955670de0b6b3a7640000600a5561160c86612b1e565b90508015611646576040805162461bcd60e51b8152602060048201526002602482015261543560f01b604482015290519081900360640190fd5b8351611659906001906020870190615813565b50825161166d906002906020860190615813565b50506003805460ff90921660ff199283161790556000805490911660011790555050505050565b600080610cf283612c79565b6000806116ab612b1a565b600954909150808214156116c457600092505050610e08565b60006116ce61274a565b600b54600c54600a54600654604080516315f2405360e01b815260048101879052602481018690526044810185905290519596509394929391926000926001600160a01b03909216916315f24053916064808301926020929190829003018186803b15801561173c57600080fd5b505afa158015611750573d6000803e3d6000fd5b505050506040513d602081101561176657600080fd5b5051905065048c273950008111156117ab576040805162461bcd60e51b815260206004820152600360248201526205431360ec1b604482015290519081900360640190fd5b6000806117b88989612cf3565b909250905060008260038111156117cb57fe5b14611803576040805162461bcd60e51b815260206004820152600360248201526254313160e81b604482015290519081900360640190fd5b61180b615800565b60008060008061182960405180602001604052808a81525087612d16565b9097509450600087600381111561183c57fe5b1461186e576118596009600689600381111561185457fe5b612d7e565b9e505050505050505050505050505050610e08565b611878858c6126f6565b9097509350600087600381111561188b57fe5b146118a3576118596009600189600381111561185457fe5b6118ad848c612de4565b909750925060008760038111156118c057fe5b146118d8576118596009600489600381111561185457fe5b6118f36040518060200160405280600854815250858c612e0a565b9097509150600087600381111561190657fe5b1461191e576118596009600589600381111561185457fe5b600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b15801561196c57600080fd5b505afa158015611980573d6000803e3d6000fd5b505050506040513d602081101561199657600080fd5b5051156119d5576119aa888d8d8d88612e66565b909750915060008760038111156119bd57fe5b146119d5576118596009600589600381111561185457fe5b6119e0858a8b612e0a565b909750905060008760038111156119f357fe5b14611a0b576118596009600389600381111561185457fe5b60098e9055600a819055600b839055600c829055604080518d8152602081018690528082018390526060810185905290517f4dec04e750ca11537cabcd8a9eab06494de08da3735bc8871cd41250e190bc049181900360800190a160009e50505050505050505050505050505090565b6000805460ff16611ab9576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155611acf333386866123c6565b1490506000805460ff1916600117905592915050565b600a5481565b6006546000906001600160a01b031663b8168816611b0761274a565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b158015611b5957600080fd5b505afa158015611b6d573d6000803e3d6000fd5b505050506040513d6020811015611b8357600080fd5b5051905090565b6000805460ff16611bc8576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19169055611bde338585856130db565b90506000805460ff191660011790559392505050565b60035460009061010090046001600160a01b03163314611c1a5761115b60016045612857565b600480546001600160a01b038481166001600160a01b0319831681179093556040805191909216808252602082019390935281517fca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9929181900390910190a16000611269565b6000805460ff16611cbe576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155611cd06116a0565b14611d07576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b611d0f610dad565b90506000805460ff1916600117905590565b6001600160a01b031660009081526011602052604090205490565b6001600160a01b0381166000908152600f6020526040812054819081908190818080611d6789612a66565b935090506000816003811115611d7957fe5b14611d975760095b975060009650869550859450611dca9350505050565b611d9f61222e565b925090506000816003811115611db157fe5b14611dbd576009611d81565b5060009650919450925090505b9193509193565b6000610ce0826132b7565b6000610ce08261332f565b6001600160a01b03918216600090815260106020908152604080832093909416825291909152205490565b6004546000906001600160a01b031633141580611e2d575033155b15611e4557611e3e60016000612857565b9050610e08565b60038054600480546001600160a01b03818116610100818102610100600160a81b0319871617968790556001600160a01b031990931690935560408051948390048216808652929095041660208401528351909391927ff9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc92908290030190a1600454604080516001600160a01b038085168252909216602083015280517fca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a99281900390910190a160009250505090565b600080611f206116a0565b90508015611f4657611f3e816010811115611f3757fe5b6040612857565b915050610cf7565b61126983612b1e565b6006546001600160a01b031681565b600080611f6c8585856133a2565b5095945050505050565b60035461010090046001600160a01b031681565b6006546000906001600160a01b03166315f24053611fa661274a565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b158015611b5957600080fd5b6001600160a01b0381166000908152600f602052604081206003810154829182918291829161201b615800565b6040518060200160405280838152509050600061203e6009548560020154612cf3565b915050612049615800565b6120538383612d16565b91505061205e615800565b61207e6040518060200160405280670de0b6b3a7640000815250836134cd565b60018801549092509050612090615800565b5060408051602081019091528181526120a7615800565b6120b18483613507565b91505060006120c4826000015185612cf3565b9150506120cf615800565b82518b546120dd91906135f0565b9150506000866000015183836000015186600001519f509f509f509f509f50505050505050505050505091939590929450565b6000805460ff1661214e576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556121606116a0565b9050801561217e5761132481601081111561217757fe5b6046612857565b611335836136a0565b600181565b60008054819060ff166121cc576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556121de6116a0565b90508015612209576121fc8160108111156121f557fe5b6036612857565b92506000915061221a9050565b612214333386613748565b92509250505b6000805460ff191660011790559092909150565b600d54600090819080612249575050600754600091506123c2565b600080600061225661274a565b9050600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b1580156122a657600080fd5b505afa1580156122ba573d6000803e3d6000fd5b505050506040513d60208110156122d057600080fd5b50511561231a576122e033613a92565b909350915060008360038111156122f357fe5b141561230857506000945092506123c2915050565b600060075495509550505050506123c2565b600654600b54600c54600d5460408051639dc8bea760e01b81526004810187905260248101949094526044840192909252606483015280516001600160a01b0390931692639dc8bea7926084808201939291829003018186803b15801561238057600080fd5b505afa158015612394573d6000803e3d6000fd5b505050506040513d60408110156123aa57600080fd5b50805160209091015190965094506123c29350505050565b9091565b600554604080516317b9b84b60e31b81523060048201526001600160a01b03868116602483015285811660448301526064820185905291516000938493169163bdcdc25891608480830192602092919082900301818787803b15801561242b57600080fd5b505af115801561243f573d6000803e3d6000fd5b505050506040513d602081101561245557600080fd5b5051905080156124745761246c6003604a83612d7e565b915050611113565b836001600160a01b0316856001600160a01b0316141561249a5761246c6002604b612857565b60006001600160a01b0387811690871614156124b957506000196124e1565b506001600160a01b038086166000908152601060209081526040808320938a16835292905220545b6000806000806124f18589612cf3565b9094509250600084600381111561250457fe5b14612522576125156009604b612857565b9650505050505050611113565b6001600160a01b038a166000908152600f60205260409020546125459089612cf3565b9094509150600084600381111561255857fe5b14612569576125156009604c612857565b6001600160a01b0389166000908152600f602052604090205461258c9089612de4565b9094509050600084600381111561259f57fe5b146125b0576125156009604d612857565b6001600160a01b03808b166000908152600f6020526040808220859055918b168152208190556000198514612608576001600160a01b03808b166000908152601060209081526040808320938f168352929052208390555b886001600160a01b03168a6001600160a01b031660008051602061591b8339815191528a6040518082815260200191505060405180910390a35060009a9950505050505050505050565b60008054819060ff16612692576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556126a46116a0565b905080156126cf576126c28160108111156126bb57fe5b6035612857565b9250600091506126e09050565b6126da338686613748565b92509250505b6000805460ff1916600117905590939092509050565b6000806000612703615800565b61270d8686612d16565b9092509050600082600381111561272057fe5b146127315750915060009050612743565b600061273c82613b74565b9350935050505b9250929050565b601254604080516370a0823160e01b815230600482015290516000926001600160a01b03169182916370a0823191602480820192602092909190829003018186803b15801561279857600080fd5b505afa1580156127ac573d6000803e3d6000fd5b505050506040513d60208110156127c257600080fd5b505191505090565b6000805460ff16612808576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561281a6116a0565b905080156128385761132481601081111561283157fe5b604e612857565b61284183613b83565b509150506000805460ff19166001179055919050565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa083601081111561288657fe5b83605281111561289257fe5b604080519283526020830191909152600082820152519081900360600190a182601081111561126957fe5b600354600090819061010090046001600160a01b031633146128e557611f3e60016031612857565b6128ed612b1a565b6009541461290157611f3e600a6033612857565b8261290a61274a565b101561291c57611f3e600e6032612857565b600c5483111561293257611f3e60026034612857565b50600c5482810390811115612974576040805162461bcd60e51b815260206004820152600360248201526254323560e81b604482015290519081900360640190fd5b600c8190556003546129949061010090046001600160a01b031684613c51565b600354604080516101009092046001600160a01b0316825260208201859052818101839052517f3bad0c59cf2f06e7314077049f48a93578cd16f5ef92329f1dab1420a99c177e916060908290030190a16000611269565b6000805460ff16612a2a576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155612a3c6116a0565b90508015612a5a57611324816010811115612a5357fe5b6027612857565b61133533600085613d2d565b6001600160a01b038116600090815260116020526040812080548291829182918291612a9d575060009450849350612b1592505050565b612aad8160000154600a546146d9565b90945092506000846003811115612ac057fe5b14612ad5575091935060009250612b15915050565b612ae3838260010154614718565b90945091506000846003811115612af657fe5b14612b0b575091935060009250612b15915050565b5060009450925050505b915091565b4390565b600354600090819061010090046001600160a01b03163314612b4657611f3e60016042612857565b612b4e612b1a565b60095414612b6257611f3e600a6041612857565b600660009054906101000a90046001600160a01b03169050826001600160a01b0316632191f92a6040518163ffffffff1660e01b815260040160206040518083038186803b158015612bb357600080fd5b505afa158015612bc7573d6000803e3d6000fd5b505050506040513d6020811015612bdd57600080fd5b5051612c16576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600680546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517fedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f9269281900390910190a16000611269565b60008054819060ff16612cb9576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155612ccb6116a0565b90508015612ce9576121fc816010811115612ce257fe5b601e612857565b6122143385614743565b600080838311612d0a575060009050818303612743565b50600390506000612743565b6000612d20615800565b600080612d318660000151866146d9565b90925090506000826003811115612d4457fe5b14612d6357506040805160208101909152600081529092509050612743565b60408051602081019091529081526000969095509350505050565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0846010811115612dad57fe5b846052811115612db957fe5b604080519283526020830191909152818101859052519081900360600190a183601081111561111357fe5b600080838301848110612dfc57600092509050612743565b506002915060009050612743565b6000806000612e17615800565b612e218787612d16565b90925090506000826003811115612e3457fe5b14612e455750915060009050612e5e565b612e57612e5182613b74565b86612de4565b9350935050505b935093915050565b60065460408051630dce3c5b60e31b815260048101879052602481018690526044810185905290516000928392839283926001600160a01b031691636e71e2d8916064808301926020929190829003018186803b158015612ec657600080fd5b505afa158015612eda573d6000803e3d6000fd5b505050506040513d6020811015612ef057600080fd5b505160065460085460408051635c0b440b60e11b8152600481018d9052602481018c9052604481018b90526064810192909252519293506000926001600160a01b039092169163b816881691608480820192602092909190829003018186803b158015612f5c57600080fd5b505afa158015612f70573d6000803e3d6000fd5b505050506040513d6020811015612f8657600080fd5b50516006546040805163327a176d60e11b8152600481018d9052602481018c9052604481018b905290519293506001600160a01b03909116916364f42eda91606480820192602092909190829003018186803b158015612fe557600080fd5b505afa158015612ff9573d6000803e3d6000fd5b505050506040513d602081101561300f57600080fd5b5051156130c55761302e6040518060200160405280848152508b6126f6565b9095509250600085600381111561304157fe5b146130535750600092506130d1915050565b61305d8382612cf3565b9095509250600085600381111561307057fe5b146130825750600092506130d1915050565b61309b6040518060200160405280858152508789612e0a565b909550935060008560038111156130ae57fe5b146130c05750600092506130d1915050565b6130cd565b600094508693505b5050505b9550959350505050565b6005546040805163d02f735160e01b81523060048201526001600160a01b038781166024830152868116604483015285811660648301526084820185905291516000938493169163d02f73519160a480830192602092919082900301818787803b15801561314857600080fd5b505af115801561315c573d6000803e3d6000fd5b505050506040513d602081101561317257600080fd5b5051905080156131895761246c6003601b83612d7e565b846001600160a01b0316846001600160a01b031614156131af5761246c6006601c612857565b6001600160a01b0384166000908152600f6020526040812054819081906131d69087612cf3565b909350915060008360038111156131e957fe5b1461320c576132016009601a85600381111561185457fe5b945050505050611113565b6001600160a01b0388166000908152600f602052604090205461322f9087612de4565b9093509050600083600381111561324257fe5b1461325a576132016009601985600381111561185457fe5b6001600160a01b038088166000818152600f60209081526040808320879055938c168083529184902085905583518a81529351919360008051602061591b833981519152929081900390910190a360009998505050505050505050565b6000805460ff166132f5576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556133076116a0565b905080156133255761132481601081111561331e57fe5b6008612857565b6113353384614d7a565b6000805460ff1661336d576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561337f6116a0565b9050801561339657611324816010811115612a5357fe5b61133533846000613d2d565b60008054819060ff166133e2576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556133f46116a0565b9050801561341f5761341281601081111561340b57fe5b600f612857565b9250600091506134b69050565b836001600160a01b031663a6afed956040518163ffffffff1660e01b8152600401602060405180830381600087803b15801561345a57600080fd5b505af115801561346e573d6000803e3d6000fd5b505050506040513d602081101561348457600080fd5b5051905080156134a45761341281601081111561349d57fe5b6010612857565b6134b033878787615012565b92509250505b6000805460ff191660011790559094909350915050565b60006134d7615800565b6000806134ec86600001518660000151612de4565b60408051602081019091529081529097909650945050505050565b6000613511615800565b600080613526866000015186600001516146d9565b9092509050600082600381111561353957fe5b1461355857506040805160208101909152600081529092509050612743565b60008061356d6706f05b59d3b2000084612de4565b9092509050600082600381111561358057fe5b146135a257506040805160208101909152600081529094509250612743915050565b6000806135b783670de0b6b3a7640000614718565b909250905060008260038111156135ca57fe5b146135d157fe5b604080516020810190915290815260009a909950975050505050505050565b60006135fa615800565b60008061360f86670de0b6b3a76400006146d9565b9092509050600082600381111561362257fe5b1461364157506040805160208101909152600081529092509050612743565b60008061364e8388614718565b9092509050600082600381111561366157fe5b1461368357506040805160208101909152600081529094509250612743915050565b604080516020810190915290815260009890975095505050505050565b60035460009061010090046001600160a01b031633146136c65761115b60016047612857565b6136ce612b1a565b600954146136e25761115b600a6048612857565b670de0b6b3a76400008211156136fe5761115b60026049612857565b6008805490839055604080518281526020810185905281517faaa68312e2ea9d50e16af5068410ab56e1a1fd06037b1a35664812c30f821460929181900390910190a16000611269565b60055460408051631200453160e11b81523060048201526001600160a01b0386811660248301528581166044830152606482018590529151600093849384939116916324008a629160848082019260209290919082900301818787803b1580156137b157600080fd5b505af11580156137c5573d6000803e3d6000fd5b505050506040513d60208110156137db57600080fd5b5051905080156137ff576137f26003603883612d7e565b925060009150612e5e9050565b613807612b1a565b6009541461381b576137f2600a6039612857565b613823615891565b6001600160a01b038616600090815260116020526040902060010154606082015261384d86612a66565b608083018190526020830182600381111561386457fe5b600381111561386f57fe5b905250600090508160200151600381111561388657fe5b146138b0576138a2600960378360200151600381111561185457fe5b935060009250612e5e915050565b6000198514156138dd576080810151604082018190526138d390889060016154d9565b60e08201526138f4565b604081018590526138ee87866154e1565b60e08201525b61390681608001518260e00151612cf3565b60a083018190526020830182600381111561391d57fe5b600381111561392857fe5b905250600090508160200151600381111561393f57fe5b14613977576040805162461bcd60e51b815260206004820152600360248201526254313760e81b604482015290519081900360640190fd5b613987600b548260e00151612cf3565b60c083018190526020830182600381111561399e57fe5b60038111156139a957fe5b90525060009050816020015160038111156139c057fe5b146139f8576040805162461bcd60e51b81526020600482015260036024820152620a862760eb1b604482015290519081900360640190fd5b60a0810180516001600160a01b03808916600081815260116020908152604091829020948555600a5460019095019490945560c0860151600b81905560e087015195518251968752948601949094528481019390935291519192908a16917f1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a19181900360600190a360e00151600097909650945050505050565b600080600d5460001415613aad575050600754600090612b15565b6001600160a01b0383166000908152600f602052604090206002810154613adc57506001915060009050612b15565b8054613af057505060075460009150612b15565b6000613afb85611fee565b505050915050613b09615800565b5060408051602081019091528181526001830154613b25615800565b506040805160208101909152818152613b3c615800565b613b468483613507565b915050613b51615800565b81518754613b5f91906135f0565b5160009a509850612b15975050505050505050565b51670de0b6b3a7640000900490565b600080600080613b91612b1a565b60095414613bb057613ba5600a604f612857565b93509150612b159050565b613bba33866154e1565b905080600c54019150600c54821015613c00576040805162461bcd60e51b815260206004820152600360248201526254323360e81b604482015290519081900360640190fd5b600c829055604080513381526020810183905280820184905290517fa91e67c5ea634cd43a12c5a482724b03de01e85ca68702a53d0c2f45cb7c1dc59181900360600190a160009350915050915091565b6012546040805163a9059cbb60e01b81526001600160a01b0385811660048301526024820185905291519190921691829163a9059cbb9160448082019260009290919082900301818387803b158015613ca957600080fd5b505af1158015613cbd573d6000803e3d6000fd5b5050505060003d60008114613cd95760208114613ce357600080fd5b6000199150613cef565b60206000803e60005191505b5080613d27576040805162461bcd60e51b8152602060048201526002602482015261114d60f21b604482015290519081900360640190fd5b50505050565b6000821580613d3a575081155b613d71576040805162461bcd60e51b81526020600482015260036024820152622a189b60e91b604482015290519081900360640190fd5b613d79615891565b6001600160a01b0385166000908152600f60205260409020613d9961222e565b6040840181905260208401826003811115613db057fe5b6003811115613dbb57fe5b9052506000905082602001516003811115613dd257fe5b14613df757613dee6009602b8460200151600381111561185457fe5b92505050611269565b6000806000806000600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b158015613e4d57600080fd5b505afa158015613e61573d6000803e3d6000fd5b505050506040513d6020811015613e7757600080fd5b505190508015613e9e57613e8a8b611fee565b60018b018190559198509095508594505050505b6006546001600160a01b031663b8168816613eb761274a565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b158015613f0957600080fd5b505afa158015613f1d573d6000803e3d6000fd5b505050506040513d6020811015613f3357600080fd5b50516003870155808015613fd157506006546001600160a01b03166364f42eda613f5b61274a565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b158015613fa357600080fd5b505afa158015613fb7573d6000803e3d6000fd5b505050506040513d6020811015613fcd57600080fd5b5051155b15614157576006546000906001600160a01b03166315f24053613ff261274a565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b15801561403a57600080fd5b505afa15801561404e573d6000803e3d6000fd5b505050506040513d602081101561406457600080fd5b50516006549091506000906001600160a01b0316636e71e2d861408561274a565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b1580156140cd57600080fd5b505afa1580156140e1573d6000803e3d6000fd5b505050506040513d60208110156140f757600080fd5b5051604080516020810190915283815290915060009061411790836126f6565b915050614128896003015482612cf3565b97506141349050615800565b614142888b600301546135f0565b91505061414f818a6126f6565b985050505050505b60001989141561418d5760408051602081018252908801518152865461417d91906126f6565b6080890181905299506141959050565b608087018990525b891561428257606087018a905280156141fe5785548a14156141c057600186015460808801526141f9565b6141c8615800565b6141d68860600151846156f5565b9150506141e1615800565b815188546141ef91906135f0565b5160808b01525050505b61427d565b61421a604051806020016040528089604001518152508b6126f6565b608089018190526020890182600381111561423157fe5b600381111561423c57fe5b905250600090508760200151600381111561425357fe5b1461427d5761426f600960298960200151600381111561185457fe5b975050505050505050611269565b614340565b6080870189905280156142cf57614297615800565b6142a9886080015188600001546156f5565b9150506142b4615800565b81516142c090856135f0565b5160608b015250614340915050565b6142eb8960405180602001604052808a60400151815250615730565b606089018190526020890182600381111561430257fe5b600381111561430d57fe5b905250600090508760200151600381111561432457fe5b146143405761426f6009602a8960200151600381111561185457fe5b60055460608801516040805163eabe7d9160e01b81523060048201526001600160a01b038f8116602483015260448201939093529051600093929092169163eabe7d919160648082019260209290919082900301818787803b1580156143a557600080fd5b505af11580156143b9573d6000803e3d6000fd5b505050506040513d60208110156143cf57600080fd5b5051905080156143f5576143e66003602883612d7e565b98505050505050505050611269565b6143fd612b1a565b60095414614411576143e6600a602c612857565b614421600d548960600151612cf3565b60a08a0181905260208a0182600381111561443857fe5b600381111561444357fe5b905250600090508860200151600381111561445a57fe5b14614476576143e66009602e8a60200151600381111561185457fe5b614482600e5486612cf3565b60e08a015250865460608901516144999190612cf3565b60c08a0181905260208a018260038111156144b057fe5b60038111156144bb57fe5b90525060009050886020015160038111156144d257fe5b146144ee576143e66009602d8a60200151600381111561185457fe5b60006144f861274a565b905082156145035750475b886080015181101561452b5761451b600e602f612857565b9950505050505050505050611269565b6145398d8a60800151613c51565b60a0890151600d5560e0890151600e5560c089015188556009546002890155600188015460808a015161456c9190612cf3565b9050886001016000829190505550306001600160a01b03168d6001600160a01b031660008051602061591b8339815191528b606001516040518082815260200191505060405180910390a38c6001600160a01b03167fe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a9298a608001518b60600151604051808381526020018281526020019250505060405180910390a2600560009054906101000a90046001600160a01b03166001600160a01b03166351dff989308f8c608001518d606001516040518563ffffffff1660e01b815260040180856001600160a01b03166001600160a01b03168152602001846001600160a01b03166001600160a01b03168152602001838152602001828152602001945050505050600060405180830381600087803b1580156146a757600080fd5b505af11580156146bb573d6000803e3d6000fd5b50600092506146c8915050565b9d9c50505050505050505050505050565b600080836146ec57506000905080612743565b838302838582816146f957fe5b041461470d57506002915060009050612743565b600092509050612743565b6000808261472c5750600190506000612743565b600083858161473757fe5b04915091509250929050565b6001600160a01b038216600090815260116020526040812054819015614796576040805162461bcd60e51b81526020600482015260036024820152622a189960e91b604482015290519081900360640190fd5b60055460408051634ef4c3e160e01b81523060048201526001600160a01b0387811660248301526044820187905291516000939290921691634ef4c3e19160648082019260209290919082900301818787803b1580156147f557600080fd5b505af1158015614809573d6000803e3d6000fd5b505050506040513d602081101561481f57600080fd5b505190508015614843576148366003601f83612d7e565b9250600091506127439050565b61484b612b1a565b6009541461485f57614836600a6022612857565b614867615891565b61486f61222e565b604083018190526020830182600381111561488657fe5b600381111561489157fe5b90525060009050816020015160038111156148a857fe5b146148d2576148c4600960218360200151600381111561185457fe5b935060009250612743915050565b608081018590526148e38682615747565b6148ed86866154e1565b60e082018190526040805160208101825290830151815261490e9190615730565b606083018190526020830182600381111561492557fe5b600381111561493057fe5b905250600090508160200151600381111561494757fe5b1461497f576040805162461bcd60e51b815260206004820152600360248201526254313360e81b604482015290519081900360640190fd5b61498f600d548260600151612de4565b60a08301819052602083018260038111156149a657fe5b60038111156149b157fe5b90525060009050816020015160038111156149c857fe5b14614a00576040805162461bcd60e51b8152602060048201526003602482015262150c4d60ea1b604482015290519081900360640190fd5b6001600160a01b0386166000908152600f60205260409020546060820151614a289190612de4565b60c0830181905260208301826003811115614a3f57fe5b6003811115614a4a57fe5b9052506000905081602001516003811115614a6157fe5b14614a99576040805162461bcd60e51b815260206004820152600360248201526254313560e81b604482015290519081900360640190fd5b6006546000906001600160a01b031663b8168816614ab561274a565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b158015614b0757600080fd5b505afa158015614b1b573d6000803e3d6000fd5b505050506040513d6020811015614b3157600080fd5b5051600654604080516338db09b960e21b815290519293506000926001600160a01b039092169163e36c26e491600480820192602092909190829003018186803b158015614b7e57600080fd5b505afa158015614b92573d6000803e3d6000fd5b505050506040513d6020811015614ba857600080fd5b50516001600160a01b0389166000908152600f602052604090205490915015614c8f57614bd3615800565b8115614bff576000614be48a611fee565b60408051602081019091529081529550614c7e945050505050565b6001600160a01b0389166000908152600f602090815260408083205481518084018352818152825193840183529188015183529291614c3e9190613507565b935090506000816003811115614c5057fe5b14614c7b57614c686009602083600381111561185457fe5b9850600097506127439650505050505050565b50505b8051614c8a9089612de4565b985050505b60a0830151600d556040805160808101825260c0850151815260208082018a815260095483850190815260608085018881526001600160a01b038f166000818152600f8752889020965187559351600187015591516002860155905160039094019390935560e087015192870151845193845291830191909152825190927f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f928290030190a2606083015160408051918252516001600160a01b038a1691309160008051602061591b8339815191529181900360200190a3505060e001516000969095509350505050565b6005546040805163368f515360e21b81523060048201526001600160a01b0385811660248301526044820185905291516000938493169163da3d454c91606480830192602092919082900301818787803b158015614dd757600080fd5b505af1158015614deb573d6000803e3d6000fd5b505050506040513d6020811015614e0157600080fd5b505190508015614e2057614e186003600e83612d7e565b915050610ce0565b614e28612b1a565b60095414614e3b57614e18600a80612857565b82614e4461274a565b1015614e5657614e18600e6009612857565b614e5e6158d7565b614e6785612a66565b6020830181905282826003811115614e7b57fe5b6003811115614e8657fe5b9052506000905081516003811115614e9a57fe5b14614ebf57614eb6600960078360000151600381111561185457fe5b92505050610ce0565b614ecd816020015185612de4565b6040830181905282826003811115614ee157fe5b6003811115614eec57fe5b9052506000905081516003811115614f0057fe5b14614f1c57614eb66009600c8360000151600381111561185457fe5b614f28600b5485612de4565b6060830181905282826003811115614f3c57fe5b6003811115614f4757fe5b9052506000905081516003811115614f5b57fe5b14614f7757614eb66009600b8360000151600381111561185457fe5b614f81858261574b565b9050614f8d8585613c51565b604080820180516001600160a01b03881660008181526011602090815290859020928355600a54600190930192909255606080860151600b819055935185518a8152938401528285019390935292517f13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80929181900390910190a2600095945050505050565b60055460408051632fe3f38f60e11b81523060048201526001600160a01b0384811660248301528781166044830152868116606483015260848201869052915160009384938493911691635fc7e71e9160a48082019260209290919082900301818787803b15801561508357600080fd5b505af1158015615097573d6000803e3d6000fd5b505050506040513d60208110156150ad57600080fd5b5051905080156150d1576150c46003601283612d7e565b9250600091506154d09050565b6150d9612b1a565b600954146150ed576150c4600a6016612857565b6150f5612b1a565b846001600160a01b0316636c540baf6040518163ffffffff1660e01b815260040160206040518083038186803b15801561512e57600080fd5b505afa158015615142573d6000803e3d6000fd5b505050506040513d602081101561515857600080fd5b50511461516b576150c4600a6011612857565b866001600160a01b0316866001600160a01b03161415615191576150c460066017612857565b846151a2576150c460076015612857565b6000198514156151b8576150c460076014612857565b6000806151c6898989613748565b909250905081156151f6576151e78260108111156151e057fe5b6018612857565b9450600093506154d092505050565b6005546040805163c488847b60e01b81523060048201526001600160a01b038981166024830152604482018590528251600094859492169263c488847b926064808301939192829003018186803b15801561525057600080fd5b505afa158015615264573d6000803e3d6000fd5b505050506040513d604081101561527a57600080fd5b508051602090910151909250905081156152c1576040805162461bcd60e51b815260206004820152600360248201526254313960e81b604482015290519081900360640190fd5b80886001600160a01b03166370a082318c6040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060206040518083038186803b15801561531857600080fd5b505afa15801561532c573d6000803e3d6000fd5b505050506040513d602081101561534257600080fd5b5051101561537d576040805162461bcd60e51b815260206004820152600360248201526205432360ec1b604482015290519081900360640190fd5b60006001600160a01b0389163014156153a35761539c308d8d856130db565b905061542d565b6040805163b2a02ff160e01b81526001600160a01b038e811660048301528d81166024830152604482018590529151918b169163b2a02ff1916064808201926020929091908290030181600087803b1580156153fe57600080fd5b505af1158015615412573d6000803e3d6000fd5b505050506040513d602081101561542857600080fd5b505190505b8015615466576040805162461bcd60e51b815260206004820152600360248201526254323160e81b604482015290519081900360640190fd5b886001600160a01b03168b6001600160a01b03168d6001600160a01b03167f298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb528786604051808381526020018281526020019250505060405180910390a46000975092955050505050505b94509492505050565b600061111384845b601254604080516370a0823160e01b815230600482015290516000926001600160a01b031691839183916370a08231916024808301926020929190829003018186803b15801561553057600080fd5b505afa158015615544573d6000803e3d6000fd5b505050506040513d602081101561555a57600080fd5b5051604080516323b872dd60e01b81526001600160a01b038881166004830152306024830152604482018890529151929350908416916323b872dd9160648082019260009290919082900301818387803b1580156155b757600080fd5b505af11580156155cb573d6000803e3d6000fd5b5050505060003d600081146155e757602081146155f157600080fd5b60001991506155fd565b60206000803e60005191505b5080615635576040805162461bcd60e51b8152602060048201526002602482015261229960f11b604482015290519081900360640190fd5b601254604080516370a0823160e01b815230600482015290516000926001600160a01b0316916370a08231916024808301926020929190829003018186803b15801561568057600080fd5b505afa158015615694573d6000803e3d6000fd5b505050506040513d60208110156156aa57600080fd5b50519050828110156156e8576040805162461bcd60e51b8152602060048201526002602482015261453360f01b604482015290519081900360640190fd5b9190910395945050505050565b60006156ff615800565b615725604051806020016040528086815250604051806020016040528086815250613507565b915091509250929050565b600080600061573d615800565b61270d86866157a1565b5050565b6157536158d7565b683635c9adc5dea000008260400151111561579b576040805162461bcd60e51b815260206004820152600360248201526252443160e81b604482015290519081900360640190fd5b50919050565b60006157ab615800565b6000806157c0670de0b6b3a7640000876146d9565b909250905060008260038111156157d357fe5b146157f257506040805160208101909152600081529092509050612743565b61273c8186600001516135f0565b6040518060200160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061585457805160ff1916838001178555615881565b82800160010185558215615881579182015b82811115615881578251825591602001919060010190615866565b5061588d929150615900565b5090565b6040805161010081019091528060008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b604080516080810190915280600081526020016000815260200160008152602001600081525090565b610e0891905b8082111561588d576000815560010161590656feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa265627a7a72315820425ec8d831c4005172e9b7ff19174eb30026656b3adc3aa8b6c838c8fc38825b64736f6c63430005100032";
var deployedBytecode$3 = "0x608060405234801561001057600080fd5b50600436106103425760003560e01c8063852a12e3116101b8578063c139562b11610104578063f3fdb15a116100a2578063f8f9da281161007c578063f8f9da2814610b59578063fc610b3d14610b61578063fca7820b14610bc7578063fe9c44ae14610be457610342565b8063f3fdb15a14610b13578063f5e3c46214610b1b578063f851a44014610b5157610342565b8063db006a75116100de578063db006a7514610a9a578063dd62ed3e14610ab7578063e9c714f214610ae5578063f2b3abbd14610aed57610342565b8063c139562b14610a31578063c37f68e214610a57578063c5ebeaec14610a7d57610342565b8063a6afed9511610171578063ae9d70b01161014b578063ae9d70b0146109c5578063b2a02ff1146109cd578063b71d1a0c14610a03578063bd6d894d14610a2957610342565b8063a6afed9514610989578063a9059cbb14610991578063aa5af0fd146109bd57610342565b8063852a12e3146107cb5780638f840ddd146107e857806395d89b41146107f057806395dd9193146107f857806399d8c1b41461081e578063a0712d681461096c57610342565b8063313ce567116102925780635fe3b567116102305780636c540baf1161020a5780636c540baf1461078d5780636f307dc31461079557806370a082311461079d57806373acee98146107c357610342565b80635fe3b56714610760578063601a0bf114610768578063675d972c1461078557610342565b80633e9410101161026c5780633e941010146106c95780634576b5db146106e657806347bd37181461070c578063524fe4b51461071457610342565b8063313ce5671461067d5780633af9e6691461069b5780633b1d21a2146106c157610342565b8063182df0f5116102ff5780631df0ba9d116102d95780631df0ba9d146105ef57806323b872dd146105f75780632608f8181461062d578063267822471461065957610342565b8063182df0f5146104695780631a31d465146104715780631be19560146105c957610342565b806306fdde0314610347578063095ea7b3146103c45780630e75270214610404578063173b99041461043357806317bfdfbc1461043b57806318160ddd14610461575b600080fd5b61034f610bec565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610389578181015183820152602001610371565b50505050905090810190601f1680156103b65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6103f0600480360360408110156103da57600080fd5b506001600160a01b038135169060200135610c79565b604080519115158252519081900360200190f35b6104216004803603602081101561041a57600080fd5b5035610ce6565b60408051918252519081900360200190f35b610421610cfc565b6104216004803603602081101561045157600080fd5b50356001600160a01b0316610d02565b610421610da7565b610421610dad565b6105c7600480360360e081101561048757600080fd5b6001600160a01b03823581169260208101358216926040820135909216916060820135919081019060a081016080820135600160201b8111156104c957600080fd5b8201836020820111156104db57600080fd5b803590602001918460018302840111600160201b831117156104fc57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b81111561054e57600080fd5b82018360208201111561056057600080fd5b803590602001918460018302840111600160201b8311171561058157600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505050903560ff169150610e0b9050565b005b6105c7600480360360208110156105df57600080fd5b50356001600160a01b0316610eaa565b610421610fe1565b6103f06004803603606081101561060d57600080fd5b506001600160a01b03813581169160208101359091169060400135610fe7565b6104216004803603604081101561064357600080fd5b506001600160a01b038135169060200135611052565b610661611068565b604080516001600160a01b039092168252519081900360200190f35b610685611077565b6040805160ff9092168252519081900360200190f35b610421600480360360208110156106b157600080fd5b50356001600160a01b0316611080565b61042161111b565b610421600480360360208110156106df57600080fd5b503561112a565b610421600480360360208110156106fc57600080fd5b50356001600160a01b0316611135565b610421611270565b61073a6004803603602081101561072a57600080fd5b50356001600160a01b0316611276565b604080519485526020850193909352838301919091526060830152519081900360800190f35b6106616112a7565b6104216004803603602081101561077e57600080fd5b50356112b6565b61042161134a565b610421611350565b610661611356565b610421600480360360208110156107b357600080fd5b50356001600160a01b0316611365565b610421611380565b610421600480360360208110156107e157600080fd5b503561141b565b610421611426565b61034f61142c565b6104216004803603602081101561080e57600080fd5b50356001600160a01b0316611484565b6105c7600480360360c081101561083457600080fd5b6001600160a01b03823581169260208101359091169160408201359190810190608081016060820135600160201b81111561086e57600080fd5b82018360208201111561088057600080fd5b803590602001918460018302840111600160201b831117156108a157600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b8111156108f357600080fd5b82018360208201111561090557600080fd5b803590602001918460018302840111600160201b8311171561092657600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505050903560ff1691506114dc9050565b6104216004803603602081101561098257600080fd5b5035611694565b6104216116a0565b6103f0600480360360408110156109a757600080fd5b506001600160a01b038135169060200135611a7b565b610421611ae5565b610421611aeb565b610421600480360360608110156109e357600080fd5b506001600160a01b03813581169160208101359091169060400135611b8a565b61042160048036036020811015610a1957600080fd5b50356001600160a01b0316611bf4565b610421611c80565b61042160048036036020811015610a4757600080fd5b50356001600160a01b0316611d21565b61073a60048036036020811015610a6d57600080fd5b50356001600160a01b0316611d3c565b61042160048036036020811015610a9357600080fd5b5035611dd1565b61042160048036036020811015610ab057600080fd5b5035611ddc565b61042160048036036040811015610acd57600080fd5b506001600160a01b0381358116916020013516611de7565b610421611e12565b61042160048036036020811015610b0357600080fd5b50356001600160a01b0316611f15565b610661611f4f565b61042160048036036060811015610b3157600080fd5b506001600160a01b03813581169160208101359160409091013516611f5e565b610661611f76565b610421611f8a565b610b8760048036036020811015610b7757600080fd5b50356001600160a01b0316611fee565b60405180866003811115610b9757fe5b60ff1681526020018581526020018481526020018381526020018281526020019550505050505060405180910390f35b61042160048036036020811015610bdd57600080fd5b5035612110565b6103f0612187565b60018054604080516020600284861615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015610c715780601f10610c4657610100808354040283529160200191610c71565b820191906000526020600020905b815481529060010190602001808311610c5457829003601f168201915b505050505081565b3360008181526010602090815260408083206001600160a01b03871680855290835281842086905581518681529151939493909284927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a360019150505b92915050565b600080610cf28361218c565b509150505b919050565b60085481565b6000805460ff16610d40576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155610d526116a0565b14610d89576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b610d9282611484565b90505b6000805460ff19166001179055919050565b600d5481565b6000806000610dba61222e565b90925090506000826003811115610dcd57fe5b14610e04576040805162461bcd60e51b8152602060048201526002602482015261543960f01b604482015290519081900360640190fd5b9150505b90565b610e198686868686866114dc565b601280546001600160a01b0319166001600160a01b038981169190911791829055604080516318160ddd60e01b8152905192909116916318160ddd91600480820192602092909190829003018186803b158015610e7557600080fd5b505afa158015610e89573d6000803e3d6000fd5b505050506040513d6020811015610e9f57600080fd5b505050505050505050565b6012546001600160a01b0382811691161415610ef2576040805162461bcd60e51b8152602060048201526002602482015261453160f01b604482015290519081900360640190fd5b604080516370a0823160e01b815230600482015290516000916001600160a01b038416916370a0823191602480820192602092909190829003018186803b158015610f3c57600080fd5b505afa158015610f50573d6000803e3d6000fd5b505050506040513d6020811015610f6657600080fd5b50516003546040805163a9059cbb60e01b81526101009092046001600160a01b03908116600484015260248301849052905192935084169163a9059cbb9160448082019260009290919082900301818387803b158015610fc557600080fd5b505af1158015610fd9573d6000803e3d6000fd5b505050505050565b600e5481565b6000805460ff16611025576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561103b338686866123c6565b1490506000805460ff191660011790559392505050565b60008061105f8484612652565b50949350505050565b6004546001600160a01b031681565b60035460ff1681565b600061108a615800565b604051806020016040528061109d611c80565b90526001600160a01b0384166000908152600f60205260408120549192509081906110c99084906126f6565b909250905060008260038111156110dc57fe5b14611113576040805162461bcd60e51b81526020600482015260026024820152612a1b60f11b604482015290519081900360640190fd5b949350505050565b600061112561274a565b905090565b6000610ce0826127ca565b60035460009061010090046001600160a01b031633146111625761115b6001603f612857565b9050610cf7565b60055460408051623f1ee960e11b815290516001600160a01b0392831692851691627e3dd2916004808301926020929190829003018186803b1580156111a757600080fd5b505afa1580156111bb573d6000803e3d6000fd5b505050506040513d60208110156111d157600080fd5b505161120a576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600580546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517f7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d9281900390910190a160005b9392505050565b600b5481565b6001600160a01b03166000908152600f60205260409020805460018201546002830154600390930154919390929190565b6005546001600160a01b031681565b6000805460ff166112f4576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556113066116a0565b9050801561132c5761132481601081111561131d57fe5b6030612857565b915050610d95565b611335836128bd565b9150506000805460ff19166001179055919050565b60075481565b60095481565b6012546001600160a01b031681565b6001600160a01b03166000908152600f602052604090205490565b6000805460ff166113be576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556113d06116a0565b14611407576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b50600b546000805460ff1916600117905590565b6000610ce0826129ec565b600c5481565b6002805460408051602060018416156101000260001901909316849004601f81018490048402820184019092528181529291830182828015610c715780601f10610c4657610100808354040283529160200191610c71565b600080600061149284612a66565b909250905060008260038111156114a557fe5b14611269576040805162461bcd60e51b81526020600482015260026024820152610a8760f31b604482015290519081900360640190fd5b60035461010090046001600160a01b03163314611525576040805162461bcd60e51b8152602060048201526002602482015261543160f01b604482015290519081900360640190fd5b6009541580156115355750600a54155b61156b576040805162461bcd60e51b81526020600482015260026024820152612a1960f11b604482015290519081900360640190fd5b6007849055836115a7576040805162461bcd60e51b8152602060048201526002602482015261543360f01b604482015290519081900360640190fd5b60006115b287611135565b905080156115ec576040805162461bcd60e51b8152602060048201526002602482015261150d60f21b604482015290519081900360640190fd5b6115f4612b1a565b600955670de0b6b3a7640000600a5561160c86612b1e565b90508015611646576040805162461bcd60e51b8152602060048201526002602482015261543560f01b604482015290519081900360640190fd5b8351611659906001906020870190615813565b50825161166d906002906020860190615813565b50506003805460ff90921660ff199283161790556000805490911660011790555050505050565b600080610cf283612c79565b6000806116ab612b1a565b600954909150808214156116c457600092505050610e08565b60006116ce61274a565b600b54600c54600a54600654604080516315f2405360e01b815260048101879052602481018690526044810185905290519596509394929391926000926001600160a01b03909216916315f24053916064808301926020929190829003018186803b15801561173c57600080fd5b505afa158015611750573d6000803e3d6000fd5b505050506040513d602081101561176657600080fd5b5051905065048c273950008111156117ab576040805162461bcd60e51b815260206004820152600360248201526205431360ec1b604482015290519081900360640190fd5b6000806117b88989612cf3565b909250905060008260038111156117cb57fe5b14611803576040805162461bcd60e51b815260206004820152600360248201526254313160e81b604482015290519081900360640190fd5b61180b615800565b60008060008061182960405180602001604052808a81525087612d16565b9097509450600087600381111561183c57fe5b1461186e576118596009600689600381111561185457fe5b612d7e565b9e505050505050505050505050505050610e08565b611878858c6126f6565b9097509350600087600381111561188b57fe5b146118a3576118596009600189600381111561185457fe5b6118ad848c612de4565b909750925060008760038111156118c057fe5b146118d8576118596009600489600381111561185457fe5b6118f36040518060200160405280600854815250858c612e0a565b9097509150600087600381111561190657fe5b1461191e576118596009600589600381111561185457fe5b600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b15801561196c57600080fd5b505afa158015611980573d6000803e3d6000fd5b505050506040513d602081101561199657600080fd5b5051156119d5576119aa888d8d8d88612e66565b909750915060008760038111156119bd57fe5b146119d5576118596009600589600381111561185457fe5b6119e0858a8b612e0a565b909750905060008760038111156119f357fe5b14611a0b576118596009600389600381111561185457fe5b60098e9055600a819055600b839055600c829055604080518d8152602081018690528082018390526060810185905290517f4dec04e750ca11537cabcd8a9eab06494de08da3735bc8871cd41250e190bc049181900360800190a160009e50505050505050505050505050505090565b6000805460ff16611ab9576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155611acf333386866123c6565b1490506000805460ff1916600117905592915050565b600a5481565b6006546000906001600160a01b031663b8168816611b0761274a565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b158015611b5957600080fd5b505afa158015611b6d573d6000803e3d6000fd5b505050506040513d6020811015611b8357600080fd5b5051905090565b6000805460ff16611bc8576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19169055611bde338585856130db565b90506000805460ff191660011790559392505050565b60035460009061010090046001600160a01b03163314611c1a5761115b60016045612857565b600480546001600160a01b038481166001600160a01b0319831681179093556040805191909216808252602082019390935281517fca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9929181900390910190a16000611269565b6000805460ff16611cbe576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155611cd06116a0565b14611d07576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b611d0f610dad565b90506000805460ff1916600117905590565b6001600160a01b031660009081526011602052604090205490565b6001600160a01b0381166000908152600f6020526040812054819081908190818080611d6789612a66565b935090506000816003811115611d7957fe5b14611d975760095b975060009650869550859450611dca9350505050565b611d9f61222e565b925090506000816003811115611db157fe5b14611dbd576009611d81565b5060009650919450925090505b9193509193565b6000610ce0826132b7565b6000610ce08261332f565b6001600160a01b03918216600090815260106020908152604080832093909416825291909152205490565b6004546000906001600160a01b031633141580611e2d575033155b15611e4557611e3e60016000612857565b9050610e08565b60038054600480546001600160a01b03818116610100818102610100600160a81b0319871617968790556001600160a01b031990931690935560408051948390048216808652929095041660208401528351909391927ff9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc92908290030190a1600454604080516001600160a01b038085168252909216602083015280517fca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a99281900390910190a160009250505090565b600080611f206116a0565b90508015611f4657611f3e816010811115611f3757fe5b6040612857565b915050610cf7565b61126983612b1e565b6006546001600160a01b031681565b600080611f6c8585856133a2565b5095945050505050565b60035461010090046001600160a01b031681565b6006546000906001600160a01b03166315f24053611fa661274a565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b158015611b5957600080fd5b6001600160a01b0381166000908152600f602052604081206003810154829182918291829161201b615800565b6040518060200160405280838152509050600061203e6009548560020154612cf3565b915050612049615800565b6120538383612d16565b91505061205e615800565b61207e6040518060200160405280670de0b6b3a7640000815250836134cd565b60018801549092509050612090615800565b5060408051602081019091528181526120a7615800565b6120b18483613507565b91505060006120c4826000015185612cf3565b9150506120cf615800565b82518b546120dd91906135f0565b9150506000866000015183836000015186600001519f509f509f509f509f50505050505050505050505091939590929450565b6000805460ff1661214e576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556121606116a0565b9050801561217e5761132481601081111561217757fe5b6046612857565b611335836136a0565b600181565b60008054819060ff166121cc576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556121de6116a0565b90508015612209576121fc8160108111156121f557fe5b6036612857565b92506000915061221a9050565b612214333386613748565b92509250505b6000805460ff191660011790559092909150565b600d54600090819080612249575050600754600091506123c2565b600080600061225661274a565b9050600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b1580156122a657600080fd5b505afa1580156122ba573d6000803e3d6000fd5b505050506040513d60208110156122d057600080fd5b50511561231a576122e033613a92565b909350915060008360038111156122f357fe5b141561230857506000945092506123c2915050565b600060075495509550505050506123c2565b600654600b54600c54600d5460408051639dc8bea760e01b81526004810187905260248101949094526044840192909252606483015280516001600160a01b0390931692639dc8bea7926084808201939291829003018186803b15801561238057600080fd5b505afa158015612394573d6000803e3d6000fd5b505050506040513d60408110156123aa57600080fd5b50805160209091015190965094506123c29350505050565b9091565b600554604080516317b9b84b60e31b81523060048201526001600160a01b03868116602483015285811660448301526064820185905291516000938493169163bdcdc25891608480830192602092919082900301818787803b15801561242b57600080fd5b505af115801561243f573d6000803e3d6000fd5b505050506040513d602081101561245557600080fd5b5051905080156124745761246c6003604a83612d7e565b915050611113565b836001600160a01b0316856001600160a01b0316141561249a5761246c6002604b612857565b60006001600160a01b0387811690871614156124b957506000196124e1565b506001600160a01b038086166000908152601060209081526040808320938a16835292905220545b6000806000806124f18589612cf3565b9094509250600084600381111561250457fe5b14612522576125156009604b612857565b9650505050505050611113565b6001600160a01b038a166000908152600f60205260409020546125459089612cf3565b9094509150600084600381111561255857fe5b14612569576125156009604c612857565b6001600160a01b0389166000908152600f602052604090205461258c9089612de4565b9094509050600084600381111561259f57fe5b146125b0576125156009604d612857565b6001600160a01b03808b166000908152600f6020526040808220859055918b168152208190556000198514612608576001600160a01b03808b166000908152601060209081526040808320938f168352929052208390555b886001600160a01b03168a6001600160a01b031660008051602061591b8339815191528a6040518082815260200191505060405180910390a35060009a9950505050505050505050565b60008054819060ff16612692576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556126a46116a0565b905080156126cf576126c28160108111156126bb57fe5b6035612857565b9250600091506126e09050565b6126da338686613748565b92509250505b6000805460ff1916600117905590939092509050565b6000806000612703615800565b61270d8686612d16565b9092509050600082600381111561272057fe5b146127315750915060009050612743565b600061273c82613b74565b9350935050505b9250929050565b601254604080516370a0823160e01b815230600482015290516000926001600160a01b03169182916370a0823191602480820192602092909190829003018186803b15801561279857600080fd5b505afa1580156127ac573d6000803e3d6000fd5b505050506040513d60208110156127c257600080fd5b505191505090565b6000805460ff16612808576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561281a6116a0565b905080156128385761132481601081111561283157fe5b604e612857565b61284183613b83565b509150506000805460ff19166001179055919050565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa083601081111561288657fe5b83605281111561289257fe5b604080519283526020830191909152600082820152519081900360600190a182601081111561126957fe5b600354600090819061010090046001600160a01b031633146128e557611f3e60016031612857565b6128ed612b1a565b6009541461290157611f3e600a6033612857565b8261290a61274a565b101561291c57611f3e600e6032612857565b600c5483111561293257611f3e60026034612857565b50600c5482810390811115612974576040805162461bcd60e51b815260206004820152600360248201526254323560e81b604482015290519081900360640190fd5b600c8190556003546129949061010090046001600160a01b031684613c51565b600354604080516101009092046001600160a01b0316825260208201859052818101839052517f3bad0c59cf2f06e7314077049f48a93578cd16f5ef92329f1dab1420a99c177e916060908290030190a16000611269565b6000805460ff16612a2a576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155612a3c6116a0565b90508015612a5a57611324816010811115612a5357fe5b6027612857565b61133533600085613d2d565b6001600160a01b038116600090815260116020526040812080548291829182918291612a9d575060009450849350612b1592505050565b612aad8160000154600a546146d9565b90945092506000846003811115612ac057fe5b14612ad5575091935060009250612b15915050565b612ae3838260010154614718565b90945091506000846003811115612af657fe5b14612b0b575091935060009250612b15915050565b5060009450925050505b915091565b4390565b600354600090819061010090046001600160a01b03163314612b4657611f3e60016042612857565b612b4e612b1a565b60095414612b6257611f3e600a6041612857565b600660009054906101000a90046001600160a01b03169050826001600160a01b0316632191f92a6040518163ffffffff1660e01b815260040160206040518083038186803b158015612bb357600080fd5b505afa158015612bc7573d6000803e3d6000fd5b505050506040513d6020811015612bdd57600080fd5b5051612c16576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600680546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517fedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f9269281900390910190a16000611269565b60008054819060ff16612cb9576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155612ccb6116a0565b90508015612ce9576121fc816010811115612ce257fe5b601e612857565b6122143385614743565b600080838311612d0a575060009050818303612743565b50600390506000612743565b6000612d20615800565b600080612d318660000151866146d9565b90925090506000826003811115612d4457fe5b14612d6357506040805160208101909152600081529092509050612743565b60408051602081019091529081526000969095509350505050565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0846010811115612dad57fe5b846052811115612db957fe5b604080519283526020830191909152818101859052519081900360600190a183601081111561111357fe5b600080838301848110612dfc57600092509050612743565b506002915060009050612743565b6000806000612e17615800565b612e218787612d16565b90925090506000826003811115612e3457fe5b14612e455750915060009050612e5e565b612e57612e5182613b74565b86612de4565b9350935050505b935093915050565b60065460408051630dce3c5b60e31b815260048101879052602481018690526044810185905290516000928392839283926001600160a01b031691636e71e2d8916064808301926020929190829003018186803b158015612ec657600080fd5b505afa158015612eda573d6000803e3d6000fd5b505050506040513d6020811015612ef057600080fd5b505160065460085460408051635c0b440b60e11b8152600481018d9052602481018c9052604481018b90526064810192909252519293506000926001600160a01b039092169163b816881691608480820192602092909190829003018186803b158015612f5c57600080fd5b505afa158015612f70573d6000803e3d6000fd5b505050506040513d6020811015612f8657600080fd5b50516006546040805163327a176d60e11b8152600481018d9052602481018c9052604481018b905290519293506001600160a01b03909116916364f42eda91606480820192602092909190829003018186803b158015612fe557600080fd5b505afa158015612ff9573d6000803e3d6000fd5b505050506040513d602081101561300f57600080fd5b5051156130c55761302e6040518060200160405280848152508b6126f6565b9095509250600085600381111561304157fe5b146130535750600092506130d1915050565b61305d8382612cf3565b9095509250600085600381111561307057fe5b146130825750600092506130d1915050565b61309b6040518060200160405280858152508789612e0a565b909550935060008560038111156130ae57fe5b146130c05750600092506130d1915050565b6130cd565b600094508693505b5050505b9550959350505050565b6005546040805163d02f735160e01b81523060048201526001600160a01b038781166024830152868116604483015285811660648301526084820185905291516000938493169163d02f73519160a480830192602092919082900301818787803b15801561314857600080fd5b505af115801561315c573d6000803e3d6000fd5b505050506040513d602081101561317257600080fd5b5051905080156131895761246c6003601b83612d7e565b846001600160a01b0316846001600160a01b031614156131af5761246c6006601c612857565b6001600160a01b0384166000908152600f6020526040812054819081906131d69087612cf3565b909350915060008360038111156131e957fe5b1461320c576132016009601a85600381111561185457fe5b945050505050611113565b6001600160a01b0388166000908152600f602052604090205461322f9087612de4565b9093509050600083600381111561324257fe5b1461325a576132016009601985600381111561185457fe5b6001600160a01b038088166000818152600f60209081526040808320879055938c168083529184902085905583518a81529351919360008051602061591b833981519152929081900390910190a360009998505050505050505050565b6000805460ff166132f5576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556133076116a0565b905080156133255761132481601081111561331e57fe5b6008612857565b6113353384614d7a565b6000805460ff1661336d576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561337f6116a0565b9050801561339657611324816010811115612a5357fe5b61133533846000613d2d565b60008054819060ff166133e2576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556133f46116a0565b9050801561341f5761341281601081111561340b57fe5b600f612857565b9250600091506134b69050565b836001600160a01b031663a6afed956040518163ffffffff1660e01b8152600401602060405180830381600087803b15801561345a57600080fd5b505af115801561346e573d6000803e3d6000fd5b505050506040513d602081101561348457600080fd5b5051905080156134a45761341281601081111561349d57fe5b6010612857565b6134b033878787615012565b92509250505b6000805460ff191660011790559094909350915050565b60006134d7615800565b6000806134ec86600001518660000151612de4565b60408051602081019091529081529097909650945050505050565b6000613511615800565b600080613526866000015186600001516146d9565b9092509050600082600381111561353957fe5b1461355857506040805160208101909152600081529092509050612743565b60008061356d6706f05b59d3b2000084612de4565b9092509050600082600381111561358057fe5b146135a257506040805160208101909152600081529094509250612743915050565b6000806135b783670de0b6b3a7640000614718565b909250905060008260038111156135ca57fe5b146135d157fe5b604080516020810190915290815260009a909950975050505050505050565b60006135fa615800565b60008061360f86670de0b6b3a76400006146d9565b9092509050600082600381111561362257fe5b1461364157506040805160208101909152600081529092509050612743565b60008061364e8388614718565b9092509050600082600381111561366157fe5b1461368357506040805160208101909152600081529094509250612743915050565b604080516020810190915290815260009890975095505050505050565b60035460009061010090046001600160a01b031633146136c65761115b60016047612857565b6136ce612b1a565b600954146136e25761115b600a6048612857565b670de0b6b3a76400008211156136fe5761115b60026049612857565b6008805490839055604080518281526020810185905281517faaa68312e2ea9d50e16af5068410ab56e1a1fd06037b1a35664812c30f821460929181900390910190a16000611269565b60055460408051631200453160e11b81523060048201526001600160a01b0386811660248301528581166044830152606482018590529151600093849384939116916324008a629160848082019260209290919082900301818787803b1580156137b157600080fd5b505af11580156137c5573d6000803e3d6000fd5b505050506040513d60208110156137db57600080fd5b5051905080156137ff576137f26003603883612d7e565b925060009150612e5e9050565b613807612b1a565b6009541461381b576137f2600a6039612857565b613823615891565b6001600160a01b038616600090815260116020526040902060010154606082015261384d86612a66565b608083018190526020830182600381111561386457fe5b600381111561386f57fe5b905250600090508160200151600381111561388657fe5b146138b0576138a2600960378360200151600381111561185457fe5b935060009250612e5e915050565b6000198514156138dd576080810151604082018190526138d390889060016154d9565b60e08201526138f4565b604081018590526138ee87866154e1565b60e08201525b61390681608001518260e00151612cf3565b60a083018190526020830182600381111561391d57fe5b600381111561392857fe5b905250600090508160200151600381111561393f57fe5b14613977576040805162461bcd60e51b815260206004820152600360248201526254313760e81b604482015290519081900360640190fd5b613987600b548260e00151612cf3565b60c083018190526020830182600381111561399e57fe5b60038111156139a957fe5b90525060009050816020015160038111156139c057fe5b146139f8576040805162461bcd60e51b81526020600482015260036024820152620a862760eb1b604482015290519081900360640190fd5b60a0810180516001600160a01b03808916600081815260116020908152604091829020948555600a5460019095019490945560c0860151600b81905560e087015195518251968752948601949094528481019390935291519192908a16917f1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a19181900360600190a360e00151600097909650945050505050565b600080600d5460001415613aad575050600754600090612b15565b6001600160a01b0383166000908152600f602052604090206002810154613adc57506001915060009050612b15565b8054613af057505060075460009150612b15565b6000613afb85611fee565b505050915050613b09615800565b5060408051602081019091528181526001830154613b25615800565b506040805160208101909152818152613b3c615800565b613b468483613507565b915050613b51615800565b81518754613b5f91906135f0565b5160009a509850612b15975050505050505050565b51670de0b6b3a7640000900490565b600080600080613b91612b1a565b60095414613bb057613ba5600a604f612857565b93509150612b159050565b613bba33866154e1565b905080600c54019150600c54821015613c00576040805162461bcd60e51b815260206004820152600360248201526254323360e81b604482015290519081900360640190fd5b600c829055604080513381526020810183905280820184905290517fa91e67c5ea634cd43a12c5a482724b03de01e85ca68702a53d0c2f45cb7c1dc59181900360600190a160009350915050915091565b6012546040805163a9059cbb60e01b81526001600160a01b0385811660048301526024820185905291519190921691829163a9059cbb9160448082019260009290919082900301818387803b158015613ca957600080fd5b505af1158015613cbd573d6000803e3d6000fd5b5050505060003d60008114613cd95760208114613ce357600080fd5b6000199150613cef565b60206000803e60005191505b5080613d27576040805162461bcd60e51b8152602060048201526002602482015261114d60f21b604482015290519081900360640190fd5b50505050565b6000821580613d3a575081155b613d71576040805162461bcd60e51b81526020600482015260036024820152622a189b60e91b604482015290519081900360640190fd5b613d79615891565b6001600160a01b0385166000908152600f60205260409020613d9961222e565b6040840181905260208401826003811115613db057fe5b6003811115613dbb57fe5b9052506000905082602001516003811115613dd257fe5b14613df757613dee6009602b8460200151600381111561185457fe5b92505050611269565b6000806000806000600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b158015613e4d57600080fd5b505afa158015613e61573d6000803e3d6000fd5b505050506040513d6020811015613e7757600080fd5b505190508015613e9e57613e8a8b611fee565b60018b018190559198509095508594505050505b6006546001600160a01b031663b8168816613eb761274a565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b158015613f0957600080fd5b505afa158015613f1d573d6000803e3d6000fd5b505050506040513d6020811015613f3357600080fd5b50516003870155808015613fd157506006546001600160a01b03166364f42eda613f5b61274a565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b158015613fa357600080fd5b505afa158015613fb7573d6000803e3d6000fd5b505050506040513d6020811015613fcd57600080fd5b5051155b15614157576006546000906001600160a01b03166315f24053613ff261274a565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b15801561403a57600080fd5b505afa15801561404e573d6000803e3d6000fd5b505050506040513d602081101561406457600080fd5b50516006549091506000906001600160a01b0316636e71e2d861408561274a565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b1580156140cd57600080fd5b505afa1580156140e1573d6000803e3d6000fd5b505050506040513d60208110156140f757600080fd5b5051604080516020810190915283815290915060009061411790836126f6565b915050614128896003015482612cf3565b97506141349050615800565b614142888b600301546135f0565b91505061414f818a6126f6565b985050505050505b60001989141561418d5760408051602081018252908801518152865461417d91906126f6565b6080890181905299506141959050565b608087018990525b891561428257606087018a905280156141fe5785548a14156141c057600186015460808801526141f9565b6141c8615800565b6141d68860600151846156f5565b9150506141e1615800565b815188546141ef91906135f0565b5160808b01525050505b61427d565b61421a604051806020016040528089604001518152508b6126f6565b608089018190526020890182600381111561423157fe5b600381111561423c57fe5b905250600090508760200151600381111561425357fe5b1461427d5761426f600960298960200151600381111561185457fe5b975050505050505050611269565b614340565b6080870189905280156142cf57614297615800565b6142a9886080015188600001546156f5565b9150506142b4615800565b81516142c090856135f0565b5160608b015250614340915050565b6142eb8960405180602001604052808a60400151815250615730565b606089018190526020890182600381111561430257fe5b600381111561430d57fe5b905250600090508760200151600381111561432457fe5b146143405761426f6009602a8960200151600381111561185457fe5b60055460608801516040805163eabe7d9160e01b81523060048201526001600160a01b038f8116602483015260448201939093529051600093929092169163eabe7d919160648082019260209290919082900301818787803b1580156143a557600080fd5b505af11580156143b9573d6000803e3d6000fd5b505050506040513d60208110156143cf57600080fd5b5051905080156143f5576143e66003602883612d7e565b98505050505050505050611269565b6143fd612b1a565b60095414614411576143e6600a602c612857565b614421600d548960600151612cf3565b60a08a0181905260208a0182600381111561443857fe5b600381111561444357fe5b905250600090508860200151600381111561445a57fe5b14614476576143e66009602e8a60200151600381111561185457fe5b614482600e5486612cf3565b60e08a015250865460608901516144999190612cf3565b60c08a0181905260208a018260038111156144b057fe5b60038111156144bb57fe5b90525060009050886020015160038111156144d257fe5b146144ee576143e66009602d8a60200151600381111561185457fe5b60006144f861274a565b905082156145035750475b886080015181101561452b5761451b600e602f612857565b9950505050505050505050611269565b6145398d8a60800151613c51565b60a0890151600d5560e0890151600e5560c089015188556009546002890155600188015460808a015161456c9190612cf3565b9050886001016000829190505550306001600160a01b03168d6001600160a01b031660008051602061591b8339815191528b606001516040518082815260200191505060405180910390a38c6001600160a01b03167fe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a9298a608001518b60600151604051808381526020018281526020019250505060405180910390a2600560009054906101000a90046001600160a01b03166001600160a01b03166351dff989308f8c608001518d606001516040518563ffffffff1660e01b815260040180856001600160a01b03166001600160a01b03168152602001846001600160a01b03166001600160a01b03168152602001838152602001828152602001945050505050600060405180830381600087803b1580156146a757600080fd5b505af11580156146bb573d6000803e3d6000fd5b50600092506146c8915050565b9d9c50505050505050505050505050565b600080836146ec57506000905080612743565b838302838582816146f957fe5b041461470d57506002915060009050612743565b600092509050612743565b6000808261472c5750600190506000612743565b600083858161473757fe5b04915091509250929050565b6001600160a01b038216600090815260116020526040812054819015614796576040805162461bcd60e51b81526020600482015260036024820152622a189960e91b604482015290519081900360640190fd5b60055460408051634ef4c3e160e01b81523060048201526001600160a01b0387811660248301526044820187905291516000939290921691634ef4c3e19160648082019260209290919082900301818787803b1580156147f557600080fd5b505af1158015614809573d6000803e3d6000fd5b505050506040513d602081101561481f57600080fd5b505190508015614843576148366003601f83612d7e565b9250600091506127439050565b61484b612b1a565b6009541461485f57614836600a6022612857565b614867615891565b61486f61222e565b604083018190526020830182600381111561488657fe5b600381111561489157fe5b90525060009050816020015160038111156148a857fe5b146148d2576148c4600960218360200151600381111561185457fe5b935060009250612743915050565b608081018590526148e38682615747565b6148ed86866154e1565b60e082018190526040805160208101825290830151815261490e9190615730565b606083018190526020830182600381111561492557fe5b600381111561493057fe5b905250600090508160200151600381111561494757fe5b1461497f576040805162461bcd60e51b815260206004820152600360248201526254313360e81b604482015290519081900360640190fd5b61498f600d548260600151612de4565b60a08301819052602083018260038111156149a657fe5b60038111156149b157fe5b90525060009050816020015160038111156149c857fe5b14614a00576040805162461bcd60e51b8152602060048201526003602482015262150c4d60ea1b604482015290519081900360640190fd5b6001600160a01b0386166000908152600f60205260409020546060820151614a289190612de4565b60c0830181905260208301826003811115614a3f57fe5b6003811115614a4a57fe5b9052506000905081602001516003811115614a6157fe5b14614a99576040805162461bcd60e51b815260206004820152600360248201526254313560e81b604482015290519081900360640190fd5b6006546000906001600160a01b031663b8168816614ab561274a565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b158015614b0757600080fd5b505afa158015614b1b573d6000803e3d6000fd5b505050506040513d6020811015614b3157600080fd5b5051600654604080516338db09b960e21b815290519293506000926001600160a01b039092169163e36c26e491600480820192602092909190829003018186803b158015614b7e57600080fd5b505afa158015614b92573d6000803e3d6000fd5b505050506040513d6020811015614ba857600080fd5b50516001600160a01b0389166000908152600f602052604090205490915015614c8f57614bd3615800565b8115614bff576000614be48a611fee565b60408051602081019091529081529550614c7e945050505050565b6001600160a01b0389166000908152600f602090815260408083205481518084018352818152825193840183529188015183529291614c3e9190613507565b935090506000816003811115614c5057fe5b14614c7b57614c686009602083600381111561185457fe5b9850600097506127439650505050505050565b50505b8051614c8a9089612de4565b985050505b60a0830151600d556040805160808101825260c0850151815260208082018a815260095483850190815260608085018881526001600160a01b038f166000818152600f8752889020965187559351600187015591516002860155905160039094019390935560e087015192870151845193845291830191909152825190927f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f928290030190a2606083015160408051918252516001600160a01b038a1691309160008051602061591b8339815191529181900360200190a3505060e001516000969095509350505050565b6005546040805163368f515360e21b81523060048201526001600160a01b0385811660248301526044820185905291516000938493169163da3d454c91606480830192602092919082900301818787803b158015614dd757600080fd5b505af1158015614deb573d6000803e3d6000fd5b505050506040513d6020811015614e0157600080fd5b505190508015614e2057614e186003600e83612d7e565b915050610ce0565b614e28612b1a565b60095414614e3b57614e18600a80612857565b82614e4461274a565b1015614e5657614e18600e6009612857565b614e5e6158d7565b614e6785612a66565b6020830181905282826003811115614e7b57fe5b6003811115614e8657fe5b9052506000905081516003811115614e9a57fe5b14614ebf57614eb6600960078360000151600381111561185457fe5b92505050610ce0565b614ecd816020015185612de4565b6040830181905282826003811115614ee157fe5b6003811115614eec57fe5b9052506000905081516003811115614f0057fe5b14614f1c57614eb66009600c8360000151600381111561185457fe5b614f28600b5485612de4565b6060830181905282826003811115614f3c57fe5b6003811115614f4757fe5b9052506000905081516003811115614f5b57fe5b14614f7757614eb66009600b8360000151600381111561185457fe5b614f81858261574b565b9050614f8d8585613c51565b604080820180516001600160a01b03881660008181526011602090815290859020928355600a54600190930192909255606080860151600b819055935185518a8152938401528285019390935292517f13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80929181900390910190a2600095945050505050565b60055460408051632fe3f38f60e11b81523060048201526001600160a01b0384811660248301528781166044830152868116606483015260848201869052915160009384938493911691635fc7e71e9160a48082019260209290919082900301818787803b15801561508357600080fd5b505af1158015615097573d6000803e3d6000fd5b505050506040513d60208110156150ad57600080fd5b5051905080156150d1576150c46003601283612d7e565b9250600091506154d09050565b6150d9612b1a565b600954146150ed576150c4600a6016612857565b6150f5612b1a565b846001600160a01b0316636c540baf6040518163ffffffff1660e01b815260040160206040518083038186803b15801561512e57600080fd5b505afa158015615142573d6000803e3d6000fd5b505050506040513d602081101561515857600080fd5b50511461516b576150c4600a6011612857565b866001600160a01b0316866001600160a01b03161415615191576150c460066017612857565b846151a2576150c460076015612857565b6000198514156151b8576150c460076014612857565b6000806151c6898989613748565b909250905081156151f6576151e78260108111156151e057fe5b6018612857565b9450600093506154d092505050565b6005546040805163c488847b60e01b81523060048201526001600160a01b038981166024830152604482018590528251600094859492169263c488847b926064808301939192829003018186803b15801561525057600080fd5b505afa158015615264573d6000803e3d6000fd5b505050506040513d604081101561527a57600080fd5b508051602090910151909250905081156152c1576040805162461bcd60e51b815260206004820152600360248201526254313960e81b604482015290519081900360640190fd5b80886001600160a01b03166370a082318c6040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060206040518083038186803b15801561531857600080fd5b505afa15801561532c573d6000803e3d6000fd5b505050506040513d602081101561534257600080fd5b5051101561537d576040805162461bcd60e51b815260206004820152600360248201526205432360ec1b604482015290519081900360640190fd5b60006001600160a01b0389163014156153a35761539c308d8d856130db565b905061542d565b6040805163b2a02ff160e01b81526001600160a01b038e811660048301528d81166024830152604482018590529151918b169163b2a02ff1916064808201926020929091908290030181600087803b1580156153fe57600080fd5b505af1158015615412573d6000803e3d6000fd5b505050506040513d602081101561542857600080fd5b505190505b8015615466576040805162461bcd60e51b815260206004820152600360248201526254323160e81b604482015290519081900360640190fd5b886001600160a01b03168b6001600160a01b03168d6001600160a01b03167f298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb528786604051808381526020018281526020019250505060405180910390a46000975092955050505050505b94509492505050565b600061111384845b601254604080516370a0823160e01b815230600482015290516000926001600160a01b031691839183916370a08231916024808301926020929190829003018186803b15801561553057600080fd5b505afa158015615544573d6000803e3d6000fd5b505050506040513d602081101561555a57600080fd5b5051604080516323b872dd60e01b81526001600160a01b038881166004830152306024830152604482018890529151929350908416916323b872dd9160648082019260009290919082900301818387803b1580156155b757600080fd5b505af11580156155cb573d6000803e3d6000fd5b5050505060003d600081146155e757602081146155f157600080fd5b60001991506155fd565b60206000803e60005191505b5080615635576040805162461bcd60e51b8152602060048201526002602482015261229960f11b604482015290519081900360640190fd5b601254604080516370a0823160e01b815230600482015290516000926001600160a01b0316916370a08231916024808301926020929190829003018186803b15801561568057600080fd5b505afa158015615694573d6000803e3d6000fd5b505050506040513d60208110156156aa57600080fd5b50519050828110156156e8576040805162461bcd60e51b8152602060048201526002602482015261453360f01b604482015290519081900360640190fd5b9190910395945050505050565b60006156ff615800565b615725604051806020016040528086815250604051806020016040528086815250613507565b915091509250929050565b600080600061573d615800565b61270d86866157a1565b5050565b6157536158d7565b683635c9adc5dea000008260400151111561579b576040805162461bcd60e51b815260206004820152600360248201526252443160e81b604482015290519081900360640190fd5b50919050565b60006157ab615800565b6000806157c0670de0b6b3a7640000876146d9565b909250905060008260038111156157d357fe5b146157f257506040805160208101909152600081529092509050612743565b61273c8186600001516135f0565b6040518060200160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061585457805160ff1916838001178555615881565b82800160010185558215615881579182015b82811115615881578251825591602001919060010190615866565b5061588d929150615900565b5090565b6040805161010081019091528060008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b604080516080810190915280600081526020016000815260200160008152602001600081525090565b610e0891905b8082111561588d576000815560010161590656feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa265627a7a72315820425ec8d831c4005172e9b7ff19174eb30026656b3adc3aa8b6c838c8fc38825b64736f6c63430005100032";
var linkReferences$3 = {
};
var deployedLinkReferences$3 = {
};
var CRDOCArtifact = {
	_format: _format$3,
	contractName: contractName$3,
	sourceName: sourceName$3,
	abi: abi$3,
	bytecode: bytecode$3,
	deployedBytecode: deployedBytecode$3,
	linkReferences: linkReferences$3,
	deployedLinkReferences: deployedLinkReferences$3
};

var _format$2 = "hh-sol-artifact-1";
var contractName$2 = "StandardToken";
var sourceName$2 = "contracts/ERC20.sol";
var abi$2 = [
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_initialAmount",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "_tokenName",
				type: "string"
			},
			{
				internalType: "uint8",
				name: "_decimalUnits",
				type: "uint8"
			},
			{
				internalType: "string",
				name: "_tokenSymbol",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "_spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "dst",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "src",
				type: "address"
			},
			{
				internalType: "address",
				name: "dst",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	}
];
var bytecode$2 = "0x608060405234801561001057600080fd5b50604051610a38380380610a388339818101604052608081101561003357600080fd5b81516020830180516040519294929383019291908464010000000082111561005a57600080fd5b90830190602082018581111561006f57600080fd5b825164010000000081118282018810171561008957600080fd5b82525081516020918201929091019080838360005b838110156100b657818101518382015260200161009e565b50505050905090810190601f1680156100e35780820380516001836020036101000a031916815260200191505b5060408181526020830151920180519294919391928464010000000082111561010b57600080fd5b90830190602082018581111561012057600080fd5b825164010000000081118282018810171561013a57600080fd5b82525081516020918201929091019080838360005b8381101561016757818101518382015260200161014f565b50505050905090810190601f1680156101945780820380516001836020036101000a031916815260200191505b50604090815260038890553360009081526005602090815291812089905587516101c6955090935090870191506101f8565b5080516101da9060019060208401906101f8565b50506002805460ff191660ff92909216919091179055506102939050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061023957805160ff1916838001178555610266565b82800160010185558215610266579182015b8281111561026657825182559160200191906001019061024b565b50610272929150610276565b5090565b61029091905b80821115610272576000815560010161027c565b90565b610796806102a26000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063313ce56711610066578063313ce567146101a557806370a08231146101c357806395d89b41146101e9578063a9059cbb146101f1578063dd62ed3e1461021d57610093565b806306fdde0314610098578063095ea7b31461011557806318160ddd1461015557806323b872dd1461016f575b600080fd5b6100a061024b565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100da5781810151838201526020016100c2565b50505050905090810190601f1680156101075780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101416004803603604081101561012b57600080fd5b506001600160a01b0381351690602001356102d9565b604080519115158252519081900360200190f35b61015d61033f565b60408051918252519081900360200190f35b6101416004803603606081101561018557600080fd5b506001600160a01b03813581169160208101359091169060400135610345565b6101ad6104d1565b6040805160ff9092168252519081900360200190f35b61015d600480360360208110156101d957600080fd5b50356001600160a01b03166104da565b6100a06104ec565b6101416004803603604081101561020757600080fd5b506001600160a01b038135169060200135610546565b61015d6004803603604081101561023357600080fd5b506001600160a01b038135811691602001351661064f565b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156102d15780601f106102a6576101008083540402835291602001916102d1565b820191906000526020600020905b8154815290600101906020018083116102b457829003601f168201915b505050505081565b3360008181526004602090815260408083206001600160a01b038716808552908352818420869055815186815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a350600192915050565b60035481565b6040805180820182526016815275496e73756666696369656e7420616c6c6f77616e636560501b6020808301919091526001600160a01b038616600090815260048252838120338252909152918220546103a691849063ffffffff61066c16565b6001600160a01b0385166000818152600460209081526040808320338452825280832094909455835180850185526014815273496e73756666696369656e742062616c616e636560601b8183015292825260059052919091205461041191849063ffffffff61066c16565b6001600160a01b0380861660009081526005602081815260408084209590955584518086018652601081526f42616c616e6365206f766572666c6f7760801b81830152938816835252919091205461047091849063ffffffff61070316565b6001600160a01b0380851660008181526005602090815260409182902094909455805186815290519193928816927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a35060019392505050565b60025460ff1681565b60056020526000908152604090205481565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156102d15780601f106102a6576101008083540402835291602001916102d1565b6040805180820182526014815273496e73756666696369656e742062616c616e636560601b60208083019190915233600090815260059091529182205461059491849063ffffffff61066c16565b3360009081526005602081815260408084209490945583518085018552601081526f42616c616e6365206f766572666c6f7760801b818301526001600160a01b0388168452919052919020546105f191849063ffffffff61070316565b6001600160a01b0384166000818152600560209081526040918290209390935580518581529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a350600192915050565b600460209081526000928352604080842090915290825290205481565b600081848411156106fb5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156106c05781810151838201526020016106a8565b50505050905090810190601f1680156106ed5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600083830182858210156107585760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156106c05781810151838201526020016106a8565b5094935050505056fea265627a7a7231582088156fb10753c23f4e0a0408e335edf0e4ca70f20323cfd32cd5dc3b0d738dec64736f6c63430005100032";
var deployedBytecode$2 = "0x608060405234801561001057600080fd5b50600436106100935760003560e01c8063313ce56711610066578063313ce567146101a557806370a08231146101c357806395d89b41146101e9578063a9059cbb146101f1578063dd62ed3e1461021d57610093565b806306fdde0314610098578063095ea7b31461011557806318160ddd1461015557806323b872dd1461016f575b600080fd5b6100a061024b565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100da5781810151838201526020016100c2565b50505050905090810190601f1680156101075780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101416004803603604081101561012b57600080fd5b506001600160a01b0381351690602001356102d9565b604080519115158252519081900360200190f35b61015d61033f565b60408051918252519081900360200190f35b6101416004803603606081101561018557600080fd5b506001600160a01b03813581169160208101359091169060400135610345565b6101ad6104d1565b6040805160ff9092168252519081900360200190f35b61015d600480360360208110156101d957600080fd5b50356001600160a01b03166104da565b6100a06104ec565b6101416004803603604081101561020757600080fd5b506001600160a01b038135169060200135610546565b61015d6004803603604081101561023357600080fd5b506001600160a01b038135811691602001351661064f565b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156102d15780601f106102a6576101008083540402835291602001916102d1565b820191906000526020600020905b8154815290600101906020018083116102b457829003601f168201915b505050505081565b3360008181526004602090815260408083206001600160a01b038716808552908352818420869055815186815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a350600192915050565b60035481565b6040805180820182526016815275496e73756666696369656e7420616c6c6f77616e636560501b6020808301919091526001600160a01b038616600090815260048252838120338252909152918220546103a691849063ffffffff61066c16565b6001600160a01b0385166000818152600460209081526040808320338452825280832094909455835180850185526014815273496e73756666696369656e742062616c616e636560601b8183015292825260059052919091205461041191849063ffffffff61066c16565b6001600160a01b0380861660009081526005602081815260408084209590955584518086018652601081526f42616c616e6365206f766572666c6f7760801b81830152938816835252919091205461047091849063ffffffff61070316565b6001600160a01b0380851660008181526005602090815260409182902094909455805186815290519193928816927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a35060019392505050565b60025460ff1681565b60056020526000908152604090205481565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156102d15780601f106102a6576101008083540402835291602001916102d1565b6040805180820182526014815273496e73756666696369656e742062616c616e636560601b60208083019190915233600090815260059091529182205461059491849063ffffffff61066c16565b3360009081526005602081815260408084209490945583518085018552601081526f42616c616e6365206f766572666c6f7760801b818301526001600160a01b0388168452919052919020546105f191849063ffffffff61070316565b6001600160a01b0384166000818152600560209081526040918290209390935580518581529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a350600192915050565b600460209081526000928352604080842090915290825290205481565b600081848411156106fb5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156106c05781810151838201526020016106a8565b50505050905090810190601f1680156106ed5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600083830182858210156107585760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156106c05781810151838201526020016106a8565b5094935050505056fea265627a7a7231582088156fb10753c23f4e0a0408e335edf0e4ca70f20323cfd32cd5dc3b0d738dec64736f6c63430005100032";
var linkReferences$2 = {
};
var deployedLinkReferences$2 = {
};
var StandartTokenArtifact = {
	_format: _format$2,
	contractName: contractName$2,
	sourceName: sourceName$2,
	abi: abi$2,
	bytecode: bytecode$2,
	deployedBytecode: deployedBytecode$2,
	linkReferences: linkReferences$2,
	deployedLinkReferences: deployedLinkReferences$2
};

var CErc20 = function (_Market) {
  _inherits(CErc20, _Market);
  var _super = _createSuper(CErc20);
  function CErc20(tropykus, abi, contractAddress, erc20TokenAddress) {
    var _this;
    _classCallCheck(this, CErc20);
    _this = _super.call(this, tropykus, abi, contractAddress);
    if (erc20TokenAddress === null || erc20TokenAddress === undefined) {
      throw new Error('Must provide a valid erc20 token address');
    }
    _this.erc20Instance = new ethers.Contract(erc20TokenAddress, StandartTokenArtifact.abi, _this.tropykus.ethersProvider);
    return _this;
  }
  _createClass(CErc20, [{
    key: "mint",
    value: function () {
      var _mint = _asyncToGenerator( regeneratorRuntime.mark(function _callee(account, amount) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.erc20Instance.connect(account).approve(this.address, ethers.utils.parseEther(amount.toString()));
              case 2:
                return _context.abrupt("return", this.instance.connect(account).mint(ethers.utils.parseEther(amount.toString()), {
                  gasLimit: this.tropykus.gasLimit
                }));
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function mint(_x, _x2) {
        return _mint.apply(this, arguments);
      }
      return mint;
    }()
  }]);
  return CErc20;
}(Market);

var CRDOC = function (_CErc) {
  _inherits(CRDOC, _CErc);
  var _super = _createSuper(CRDOC);
  function CRDOC(tropykus, contractAddress, erc20TokenAddress) {
    _classCallCheck(this, CRDOC);
    return _super.call(this, tropykus, CRDOCArtifact.abi, contractAddress, erc20TokenAddress);
  }
  return CRDOC;
}(CErc20);

var _format$1 = "hh-sol-artifact-1";
var contractName$1 = "CErc20Immutable";
var sourceName$1 = "contracts/CErc20Immutable.sol";
var abi$1 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "underlying_",
				type: "address"
			},
			{
				internalType: "contract ComptrollerInterface",
				name: "comptroller_",
				type: "address"
			},
			{
				internalType: "contract InterestRateModel",
				name: "interestRateModel_",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "initialExchangeRateMantissa_",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "name_",
				type: "string"
			},
			{
				internalType: "string",
				name: "symbol_",
				type: "string"
			},
			{
				internalType: "uint8",
				name: "decimals_",
				type: "uint8"
			},
			{
				internalType: "address payable",
				name: "admin_",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "cashPrior",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "interestAccumulated",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "borrowIndex",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "totalBorrows",
				type: "uint256"
			}
		],
		name: "AccrueInterest",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "borrowAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "accountBorrows",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "totalBorrows",
				type: "uint256"
			}
		],
		name: "Borrow",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "error",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "info",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "detail",
				type: "uint256"
			}
		],
		name: "Failure",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "liquidator",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "repayAmount",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "cTokenCollateral",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "seizeTokens",
				type: "uint256"
			}
		],
		name: "LiquidateBorrow",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "minter",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "mintAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "mintTokens",
				type: "uint256"
			}
		],
		name: "Mint",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldAdmin",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newAdmin",
				type: "address"
			}
		],
		name: "NewAdmin",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract ComptrollerInterface",
				name: "oldComptroller",
				type: "address"
			},
			{
				indexed: false,
				internalType: "contract ComptrollerInterface",
				name: "newComptroller",
				type: "address"
			}
		],
		name: "NewComptroller",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract InterestRateModel",
				name: "oldInterestRateModel",
				type: "address"
			},
			{
				indexed: false,
				internalType: "contract InterestRateModel",
				name: "newInterestRateModel",
				type: "address"
			}
		],
		name: "NewMarketInterestRateModel",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldPendingAdmin",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newPendingAdmin",
				type: "address"
			}
		],
		name: "NewPendingAdmin",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "oldReserveFactorMantissa",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newReserveFactorMantissa",
				type: "uint256"
			}
		],
		name: "NewReserveFactor",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "redeemer",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "redeemAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "redeemTokens",
				type: "uint256"
			}
		],
		name: "Redeem",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "payer",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "repayAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "accountBorrows",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "totalBorrows",
				type: "uint256"
			}
		],
		name: "RepayBorrow",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "benefactor",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "addAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newTotalReserves",
				type: "uint256"
			}
		],
		name: "ReservesAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "admin",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "reduceAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newTotalReserves",
				type: "uint256"
			}
		],
		name: "ReservesReduced",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "benefactor",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "addAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newSubsidyFund",
				type: "uint256"
			}
		],
		name: "SubsidyAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		constant: false,
		inputs: [
		],
		name: "_acceptAdmin",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "addAmount",
				type: "uint256"
			}
		],
		name: "_addReserves",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "reduceAmount",
				type: "uint256"
			}
		],
		name: "_reduceReserves",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract ComptrollerInterface",
				name: "newComptroller",
				type: "address"
			}
		],
		name: "_setComptroller",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract InterestRateModel",
				name: "newInterestRateModel",
				type: "address"
			}
		],
		name: "_setInterestRateModel",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address payable",
				name: "newPendingAdmin",
				type: "address"
			}
		],
		name: "_setPendingAdmin",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "newReserveFactorMantissa",
				type: "uint256"
			}
		],
		name: "_setReserveFactor",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "accrualBlockNumber",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "accrueInterest",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "admin",
		outputs: [
			{
				internalType: "address payable",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOfUnderlying",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "borrowAmount",
				type: "uint256"
			}
		],
		name: "borrow",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "borrowBalanceCurrent",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "borrowBalanceStored",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "borrowIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "borrowRatePerBlock",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "comptroller",
		outputs: [
			{
				internalType: "contract ComptrollerInterface",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "exchangeRateCurrent",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "exchangeRateStored",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "getAccountSnapshot",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "getBorrowerPrincipalStored",
		outputs: [
			{
				internalType: "uint256",
				name: "borrowed",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getCash",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "getSupplierSnapshotStored",
		outputs: [
			{
				internalType: "uint256",
				name: "tokens",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "underlyingAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "suppliedAt",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "promisedSupplyRate",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "initialExchangeRateMantissa",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "underlying_",
				type: "address"
			},
			{
				internalType: "contract ComptrollerInterface",
				name: "comptroller_",
				type: "address"
			},
			{
				internalType: "contract InterestRateModel",
				name: "interestRateModel_",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "initialExchangeRateMantissa_",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "name_",
				type: "string"
			},
			{
				internalType: "string",
				name: "symbol_",
				type: "string"
			},
			{
				internalType: "uint8",
				name: "decimals_",
				type: "uint8"
			}
		],
		name: "initialize",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract ComptrollerInterface",
				name: "comptroller_",
				type: "address"
			},
			{
				internalType: "contract InterestRateModel",
				name: "interestRateModel_",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "initialExchangeRateMantissa_",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "name_",
				type: "string"
			},
			{
				internalType: "string",
				name: "symbol_",
				type: "string"
			},
			{
				internalType: "uint8",
				name: "decimals_",
				type: "uint8"
			}
		],
		name: "initialize",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "interestRateModel",
		outputs: [
			{
				internalType: "contract InterestRateModel",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "isCToken",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "repayAmount",
				type: "uint256"
			},
			{
				internalType: "contract CTokenInterface",
				name: "cTokenCollateral",
				type: "address"
			}
		],
		name: "liquidateBorrow",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "mintAmount",
				type: "uint256"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "pendingAdmin",
		outputs: [
			{
				internalType: "address payable",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "redeemTokens",
				type: "uint256"
			}
		],
		name: "redeem",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "redeemAmount",
				type: "uint256"
			}
		],
		name: "redeemUnderlying",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "repayAmount",
				type: "uint256"
			}
		],
		name: "repayBorrow",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "repayAmount",
				type: "uint256"
			}
		],
		name: "repayBorrowBehalf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "reserveFactorMantissa",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "liquidator",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "seizeTokens",
				type: "uint256"
			}
		],
		name: "seize",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "subsidyFund",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "supplyRatePerBlock",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract EIP20NonStandardInterface",
				name: "token",
				type: "address"
			}
		],
		name: "sweepToken",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalBorrows",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "totalBorrowsCurrent",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalReserves",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "dst",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "src",
				type: "address"
			},
			{
				internalType: "address",
				name: "dst",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "tropykusInterestAccrued",
		outputs: [
			{
				internalType: "enum CarefulMath.MathError",
				name: "",
				type: "uint8"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "underlying",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];
var bytecode$1 = "0x60806040523480156200001157600080fd5b50604051620061dd380380620061dd83398181016040526101008110156200003857600080fd5b81516020830151604080850151606086015160808701805193519597949692959194919392820192846401000000008211156200007457600080fd5b9083019060208201858111156200008a57600080fd5b8251640100000000811182820188101715620000a557600080fd5b82525081516020918201929091019080838360005b83811015620000d4578181015183820152602001620000ba565b50505050905090810190601f168015620001025780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200012657600080fd5b9083019060208201858111156200013c57600080fd5b82516401000000008111828201881017156200015757600080fd5b82525081516020918201929091019080838360005b83811015620001865781810151838201526020016200016c565b50505050905090810190601f168015620001b45780820380516001836020036101000a031916815260200191505b506040908152602082015191015160038054610100600160a81b03191633610100021790559092509050620001ef8888888888888862000223565b600380546001600160a01b0390921661010002610100600160a81b031990921691909117905550620008a695505050505050565b6200023e868686868686620002d260201b620014dc1760201c565b601280546001600160a01b0319166001600160a01b038981169190911791829055604080516318160ddd60e01b8152905192909116916318160ddd91600480820192602092909190829003018186803b1580156200029b57600080fd5b505afa158015620002b0573d6000803e3d6000fd5b505050506040513d6020811015620002c757600080fd5b505050505050505050565b60035461010090046001600160a01b031633146200031c576040805162461bcd60e51b8152602060048201526002602482015261543160f01b604482015290519081900360640190fd5b6009541580156200032d5750600a54155b62000364576040805162461bcd60e51b81526020600482015260026024820152612a1960f11b604482015290519081900360640190fd5b600784905583620003a1576040805162461bcd60e51b8152602060048201526002602482015261543360f01b604482015290519081900360640190fd5b6000620003b7876001600160e01b03620004b516565b90508015620003f2576040805162461bcd60e51b8152602060048201526002602482015261150d60f21b604482015290519081900360640190fd5b620004056001600160e01b036200060316565b600955670de0b6b3a7640000600a5562000428866001600160e01b036200060816565b9050801562000463576040805162461bcd60e51b8152602060048201526002602482015261543560f01b604482015290519081900360640190fd5b83516200047890600190602087019062000804565b5082516200048e90600290602086019062000804565b50506003805460ff90921660ff199283161790556000805490911660011790555050505050565b60035460009061010090046001600160a01b03163314620004ef57620004e76001603f6001600160e01b036200079416565b9050620005fe565b60055460408051623f1ee960e11b815290516001600160a01b0392831692851691627e3dd2916004808301926020929190829003018186803b1580156200053557600080fd5b505afa1580156200054a573d6000803e3d6000fd5b505050506040513d60208110156200056157600080fd5b50516200059b576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600580546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517f7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d9281900390910190a160005b9150505b919050565b435b90565b600354600090819061010090046001600160a01b0316331462000645576200063c600160426001600160e01b036200079416565b915050620005fe565b620006586001600160e01b036200060316565b6009541462000678576200063c600a60416001600160e01b036200079416565b600660009054906101000a90046001600160a01b03169050826001600160a01b0316632191f92a6040518163ffffffff1660e01b815260040160206040518083038186803b158015620006ca57600080fd5b505afa158015620006df573d6000803e3d6000fd5b505050506040513d6020811015620006f657600080fd5b505162000730576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600680546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517fedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f9269281900390910190a16000620005fa565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0836010811115620007c457fe5b836052811115620007d157fe5b604080519283526020830191909152600082820152519081900360600190a1826010811115620007fd57fe5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200084757805160ff191683800117855562000877565b8280016001018555821562000877579182015b82811115620008775782518255916020019190600101906200085a565b506200088592915062000889565b5090565b6200060591905b8082111562000885576000815560010162000890565b61592780620008b66000396000f3fe608060405234801561001057600080fd5b50600436106103425760003560e01c8063852a12e3116101b8578063c139562b11610104578063f3fdb15a116100a2578063f8f9da281161007c578063f8f9da2814610b59578063fc610b3d14610b61578063fca7820b14610bc7578063fe9c44ae14610be457610342565b8063f3fdb15a14610b13578063f5e3c46214610b1b578063f851a44014610b5157610342565b8063db006a75116100de578063db006a7514610a9a578063dd62ed3e14610ab7578063e9c714f214610ae5578063f2b3abbd14610aed57610342565b8063c139562b14610a31578063c37f68e214610a57578063c5ebeaec14610a7d57610342565b8063a6afed9511610171578063ae9d70b01161014b578063ae9d70b0146109c5578063b2a02ff1146109cd578063b71d1a0c14610a03578063bd6d894d14610a2957610342565b8063a6afed9514610989578063a9059cbb14610991578063aa5af0fd146109bd57610342565b8063852a12e3146107cb5780638f840ddd146107e857806395d89b41146107f057806395dd9193146107f857806399d8c1b41461081e578063a0712d681461096c57610342565b8063313ce567116102925780635fe3b567116102305780636c540baf1161020a5780636c540baf1461078d5780636f307dc31461079557806370a082311461079d57806373acee98146107c357610342565b80635fe3b56714610760578063601a0bf114610768578063675d972c1461078557610342565b80633e9410101161026c5780633e941010146106c95780634576b5db146106e657806347bd37181461070c578063524fe4b51461071457610342565b8063313ce5671461067d5780633af9e6691461069b5780633b1d21a2146106c157610342565b8063182df0f5116102ff5780631df0ba9d116102d95780631df0ba9d146105ef57806323b872dd146105f75780632608f8181461062d578063267822471461065957610342565b8063182df0f5146104695780631a31d465146104715780631be19560146105c957610342565b806306fdde0314610347578063095ea7b3146103c45780630e75270214610404578063173b99041461043357806317bfdfbc1461043b57806318160ddd14610461575b600080fd5b61034f610bec565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610389578181015183820152602001610371565b50505050905090810190601f1680156103b65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6103f0600480360360408110156103da57600080fd5b506001600160a01b038135169060200135610c79565b604080519115158252519081900360200190f35b6104216004803603602081101561041a57600080fd5b5035610ce6565b60408051918252519081900360200190f35b610421610cfc565b6104216004803603602081101561045157600080fd5b50356001600160a01b0316610d02565b610421610da7565b610421610dad565b6105c7600480360360e081101561048757600080fd5b6001600160a01b03823581169260208101358216926040820135909216916060820135919081019060a081016080820135600160201b8111156104c957600080fd5b8201836020820111156104db57600080fd5b803590602001918460018302840111600160201b831117156104fc57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b81111561054e57600080fd5b82018360208201111561056057600080fd5b803590602001918460018302840111600160201b8311171561058157600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505050903560ff169150610e0b9050565b005b6105c7600480360360208110156105df57600080fd5b50356001600160a01b0316610eaa565b610421610fe1565b6103f06004803603606081101561060d57600080fd5b506001600160a01b03813581169160208101359091169060400135610fe7565b6104216004803603604081101561064357600080fd5b506001600160a01b038135169060200135611052565b610661611068565b604080516001600160a01b039092168252519081900360200190f35b610685611077565b6040805160ff9092168252519081900360200190f35b610421600480360360208110156106b157600080fd5b50356001600160a01b0316611080565b61042161111b565b610421600480360360208110156106df57600080fd5b503561112a565b610421600480360360208110156106fc57600080fd5b50356001600160a01b0316611135565b610421611270565b61073a6004803603602081101561072a57600080fd5b50356001600160a01b0316611276565b604080519485526020850193909352838301919091526060830152519081900360800190f35b6106616112a7565b6104216004803603602081101561077e57600080fd5b50356112b6565b61042161134a565b610421611350565b610661611356565b610421600480360360208110156107b357600080fd5b50356001600160a01b0316611365565b610421611380565b610421600480360360208110156107e157600080fd5b503561141b565b610421611426565b61034f61142c565b6104216004803603602081101561080e57600080fd5b50356001600160a01b0316611484565b6105c7600480360360c081101561083457600080fd5b6001600160a01b03823581169260208101359091169160408201359190810190608081016060820135600160201b81111561086e57600080fd5b82018360208201111561088057600080fd5b803590602001918460018302840111600160201b831117156108a157600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b8111156108f357600080fd5b82018360208201111561090557600080fd5b803590602001918460018302840111600160201b8311171561092657600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505050903560ff1691506114dc9050565b6104216004803603602081101561098257600080fd5b5035611694565b6104216116a0565b6103f0600480360360408110156109a757600080fd5b506001600160a01b038135169060200135611a7b565b610421611ae5565b610421611aeb565b610421600480360360608110156109e357600080fd5b506001600160a01b03813581169160208101359091169060400135611b8a565b61042160048036036020811015610a1957600080fd5b50356001600160a01b0316611bf4565b610421611c80565b61042160048036036020811015610a4757600080fd5b50356001600160a01b0316611d21565b61073a60048036036020811015610a6d57600080fd5b50356001600160a01b0316611d3c565b61042160048036036020811015610a9357600080fd5b5035611dd1565b61042160048036036020811015610ab057600080fd5b5035611ddc565b61042160048036036040811015610acd57600080fd5b506001600160a01b0381358116916020013516611de7565b610421611e12565b61042160048036036020811015610b0357600080fd5b50356001600160a01b0316611f15565b610661611f4f565b61042160048036036060811015610b3157600080fd5b506001600160a01b03813581169160208101359160409091013516611f5e565b610661611f76565b610421611f8a565b610b8760048036036020811015610b7757600080fd5b50356001600160a01b0316611fee565b60405180866003811115610b9757fe5b60ff1681526020018581526020018481526020018381526020018281526020019550505050505060405180910390f35b61042160048036036020811015610bdd57600080fd5b5035612110565b6103f0612187565b60018054604080516020600284861615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015610c715780601f10610c4657610100808354040283529160200191610c71565b820191906000526020600020905b815481529060010190602001808311610c5457829003601f168201915b505050505081565b3360008181526010602090815260408083206001600160a01b03871680855290835281842086905581518681529151939493909284927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a360019150505b92915050565b600080610cf28361218c565b509150505b919050565b60085481565b6000805460ff16610d40576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155610d526116a0565b14610d89576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b610d9282611484565b90505b6000805460ff19166001179055919050565b600d5481565b6000806000610dba61222e565b90925090506000826003811115610dcd57fe5b14610e04576040805162461bcd60e51b8152602060048201526002602482015261543960f01b604482015290519081900360640190fd5b9150505b90565b610e198686868686866114dc565b601280546001600160a01b0319166001600160a01b038981169190911791829055604080516318160ddd60e01b8152905192909116916318160ddd91600480820192602092909190829003018186803b158015610e7557600080fd5b505afa158015610e89573d6000803e3d6000fd5b505050506040513d6020811015610e9f57600080fd5b505050505050505050565b6012546001600160a01b0382811691161415610ef2576040805162461bcd60e51b8152602060048201526002602482015261453160f01b604482015290519081900360640190fd5b604080516370a0823160e01b815230600482015290516000916001600160a01b038416916370a0823191602480820192602092909190829003018186803b158015610f3c57600080fd5b505afa158015610f50573d6000803e3d6000fd5b505050506040513d6020811015610f6657600080fd5b50516003546040805163a9059cbb60e01b81526101009092046001600160a01b03908116600484015260248301849052905192935084169163a9059cbb9160448082019260009290919082900301818387803b158015610fc557600080fd5b505af1158015610fd9573d6000803e3d6000fd5b505050505050565b600e5481565b6000805460ff16611025576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561103b338686866123c6565b1490506000805460ff191660011790559392505050565b60008061105f8484612652565b50949350505050565b6004546001600160a01b031681565b60035460ff1681565b600061108a6157b8565b604051806020016040528061109d611c80565b90526001600160a01b0384166000908152600f60205260408120549192509081906110c99084906126f6565b909250905060008260038111156110dc57fe5b14611113576040805162461bcd60e51b81526020600482015260026024820152612a1b60f11b604482015290519081900360640190fd5b949350505050565b600061112561274a565b905090565b6000610ce0826127ca565b60035460009061010090046001600160a01b031633146111625761115b6001603f612857565b9050610cf7565b60055460408051623f1ee960e11b815290516001600160a01b0392831692851691627e3dd2916004808301926020929190829003018186803b1580156111a757600080fd5b505afa1580156111bb573d6000803e3d6000fd5b505050506040513d60208110156111d157600080fd5b505161120a576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600580546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517f7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d9281900390910190a160005b9392505050565b600b5481565b6001600160a01b03166000908152600f60205260409020805460018201546002830154600390930154919390929190565b6005546001600160a01b031681565b6000805460ff166112f4576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556113066116a0565b9050801561132c5761132481601081111561131d57fe5b6030612857565b915050610d95565b611335836128bd565b9150506000805460ff19166001179055919050565b60075481565b60095481565b6012546001600160a01b031681565b6001600160a01b03166000908152600f602052604090205490565b6000805460ff166113be576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556113d06116a0565b14611407576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b50600b546000805460ff1916600117905590565b6000610ce0826129ec565b600c5481565b6002805460408051602060018416156101000260001901909316849004601f81018490048402820184019092528181529291830182828015610c715780601f10610c4657610100808354040283529160200191610c71565b600080600061149284612a66565b909250905060008260038111156114a557fe5b14611269576040805162461bcd60e51b81526020600482015260026024820152610a8760f31b604482015290519081900360640190fd5b60035461010090046001600160a01b03163314611525576040805162461bcd60e51b8152602060048201526002602482015261543160f01b604482015290519081900360640190fd5b6009541580156115355750600a54155b61156b576040805162461bcd60e51b81526020600482015260026024820152612a1960f11b604482015290519081900360640190fd5b6007849055836115a7576040805162461bcd60e51b8152602060048201526002602482015261543360f01b604482015290519081900360640190fd5b60006115b287611135565b905080156115ec576040805162461bcd60e51b8152602060048201526002602482015261150d60f21b604482015290519081900360640190fd5b6115f4612b1a565b600955670de0b6b3a7640000600a5561160c86612b1e565b90508015611646576040805162461bcd60e51b8152602060048201526002602482015261543560f01b604482015290519081900360640190fd5b83516116599060019060208701906157cb565b50825161166d9060029060208601906157cb565b50506003805460ff90921660ff199283161790556000805490911660011790555050505050565b600080610cf283612c79565b6000806116ab612b1a565b600954909150808214156116c457600092505050610e08565b60006116ce61274a565b600b54600c54600a54600654604080516315f2405360e01b815260048101879052602481018690526044810185905290519596509394929391926000926001600160a01b03909216916315f24053916064808301926020929190829003018186803b15801561173c57600080fd5b505afa158015611750573d6000803e3d6000fd5b505050506040513d602081101561176657600080fd5b5051905065048c273950008111156117ab576040805162461bcd60e51b815260206004820152600360248201526205431360ec1b604482015290519081900360640190fd5b6000806117b88989612cf3565b909250905060008260038111156117cb57fe5b14611803576040805162461bcd60e51b815260206004820152600360248201526254313160e81b604482015290519081900360640190fd5b61180b6157b8565b60008060008061182960405180602001604052808a81525087612d16565b9097509450600087600381111561183c57fe5b1461186e576118596009600689600381111561185457fe5b612d7e565b9e505050505050505050505050505050610e08565b611878858c6126f6565b9097509350600087600381111561188b57fe5b146118a3576118596009600189600381111561185457fe5b6118ad848c612de4565b909750925060008760038111156118c057fe5b146118d8576118596009600489600381111561185457fe5b6118f36040518060200160405280600854815250858c612e0a565b9097509150600087600381111561190657fe5b1461191e576118596009600589600381111561185457fe5b600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b15801561196c57600080fd5b505afa158015611980573d6000803e3d6000fd5b505050506040513d602081101561199657600080fd5b5051156119d5576119aa888d8d8d88612e66565b909750915060008760038111156119bd57fe5b146119d5576118596009600589600381111561185457fe5b6119e0858a8b612e0a565b909750905060008760038111156119f357fe5b14611a0b576118596009600389600381111561185457fe5b60098e9055600a819055600b839055600c829055604080518d8152602081018690528082018390526060810185905290517f4dec04e750ca11537cabcd8a9eab06494de08da3735bc8871cd41250e190bc049181900360800190a160009e50505050505050505050505050505090565b6000805460ff16611ab9576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155611acf333386866123c6565b1490506000805460ff1916600117905592915050565b600a5481565b6006546000906001600160a01b031663b8168816611b0761274a565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b158015611b5957600080fd5b505afa158015611b6d573d6000803e3d6000fd5b505050506040513d6020811015611b8357600080fd5b5051905090565b6000805460ff16611bc8576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19169055611bde338585856130db565b90506000805460ff191660011790559392505050565b60035460009061010090046001600160a01b03163314611c1a5761115b60016045612857565b600480546001600160a01b038481166001600160a01b0319831681179093556040805191909216808252602082019390935281517fca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9929181900390910190a16000611269565b6000805460ff16611cbe576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155611cd06116a0565b14611d07576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b611d0f610dad565b90506000805460ff1916600117905590565b6001600160a01b031660009081526011602052604090205490565b6001600160a01b0381166000908152600f6020526040812054819081908190818080611d6789612a66565b935090506000816003811115611d7957fe5b14611d975760095b975060009650869550859450611dca9350505050565b611d9f61222e565b925090506000816003811115611db157fe5b14611dbd576009611d81565b5060009650919450925090505b9193509193565b6000610ce0826132b7565b6000610ce08261332f565b6001600160a01b03918216600090815260106020908152604080832093909416825291909152205490565b6004546000906001600160a01b031633141580611e2d575033155b15611e4557611e3e60016000612857565b9050610e08565b60038054600480546001600160a01b03818116610100818102610100600160a81b0319871617968790556001600160a01b031990931690935560408051948390048216808652929095041660208401528351909391927ff9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc92908290030190a1600454604080516001600160a01b038085168252909216602083015280517fca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a99281900390910190a160009250505090565b600080611f206116a0565b90508015611f4657611f3e816010811115611f3757fe5b6040612857565b915050610cf7565b61126983612b1e565b6006546001600160a01b031681565b600080611f6c8585856133a2565b5095945050505050565b60035461010090046001600160a01b031681565b6006546000906001600160a01b03166315f24053611fa661274a565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b158015611b5957600080fd5b6001600160a01b0381166000908152600f602052604081206003810154829182918291829161201b6157b8565b6040518060200160405280838152509050600061203e6009548560020154612cf3565b9150506120496157b8565b6120538383612d16565b91505061205e6157b8565b61207e6040518060200160405280670de0b6b3a7640000815250836134cd565b600188015490925090506120906157b8565b5060408051602081019091528181526120a76157b8565b6120b18483613507565b91505060006120c4826000015185612cf3565b9150506120cf6157b8565b82518b546120dd91906135f0565b9150506000866000015183836000015186600001519f509f509f509f509f50505050505050505050505091939590929450565b6000805460ff1661214e576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556121606116a0565b9050801561217e5761132481601081111561217757fe5b6046612857565b611335836136a0565b600181565b60008054819060ff166121cc576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556121de6116a0565b90508015612209576121fc8160108111156121f557fe5b6036612857565b92506000915061221a9050565b612214333386613748565b92509250505b6000805460ff191660011790559092909150565b600d54600090819080612249575050600754600091506123c2565b600080600061225661274a565b9050600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b1580156122a657600080fd5b505afa1580156122ba573d6000803e3d6000fd5b505050506040513d60208110156122d057600080fd5b50511561231a576122e033613a92565b909350915060008360038111156122f357fe5b141561230857506000945092506123c2915050565b600060075495509550505050506123c2565b600654600b54600c54600d5460408051639dc8bea760e01b81526004810187905260248101949094526044840192909252606483015280516001600160a01b0390931692639dc8bea7926084808201939291829003018186803b15801561238057600080fd5b505afa158015612394573d6000803e3d6000fd5b505050506040513d60408110156123aa57600080fd5b50805160209091015190965094506123c29350505050565b9091565b600554604080516317b9b84b60e31b81523060048201526001600160a01b03868116602483015285811660448301526064820185905291516000938493169163bdcdc25891608480830192602092919082900301818787803b15801561242b57600080fd5b505af115801561243f573d6000803e3d6000fd5b505050506040513d602081101561245557600080fd5b5051905080156124745761246c6003604a83612d7e565b915050611113565b836001600160a01b0316856001600160a01b0316141561249a5761246c6002604b612857565b60006001600160a01b0387811690871614156124b957506000196124e1565b506001600160a01b038086166000908152601060209081526040808320938a16835292905220545b6000806000806124f18589612cf3565b9094509250600084600381111561250457fe5b14612522576125156009604b612857565b9650505050505050611113565b6001600160a01b038a166000908152600f60205260409020546125459089612cf3565b9094509150600084600381111561255857fe5b14612569576125156009604c612857565b6001600160a01b0389166000908152600f602052604090205461258c9089612de4565b9094509050600084600381111561259f57fe5b146125b0576125156009604d612857565b6001600160a01b03808b166000908152600f6020526040808220859055918b168152208190556000198514612608576001600160a01b03808b166000908152601060209081526040808320938f168352929052208390555b886001600160a01b03168a6001600160a01b03166000805160206158d38339815191528a6040518082815260200191505060405180910390a35060009a9950505050505050505050565b60008054819060ff16612692576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556126a46116a0565b905080156126cf576126c28160108111156126bb57fe5b6035612857565b9250600091506126e09050565b6126da338686613748565b92509250505b6000805460ff1916600117905590939092509050565b60008060006127036157b8565b61270d8686612d16565b9092509050600082600381111561272057fe5b146127315750915060009050612743565b600061273c82613b74565b9350935050505b9250929050565b601254604080516370a0823160e01b815230600482015290516000926001600160a01b03169182916370a0823191602480820192602092909190829003018186803b15801561279857600080fd5b505afa1580156127ac573d6000803e3d6000fd5b505050506040513d60208110156127c257600080fd5b505191505090565b6000805460ff16612808576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561281a6116a0565b905080156128385761132481601081111561283157fe5b604e612857565b61284183613b83565b509150506000805460ff19166001179055919050565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa083601081111561288657fe5b83605281111561289257fe5b604080519283526020830191909152600082820152519081900360600190a182601081111561126957fe5b600354600090819061010090046001600160a01b031633146128e557611f3e60016031612857565b6128ed612b1a565b6009541461290157611f3e600a6033612857565b8261290a61274a565b101561291c57611f3e600e6032612857565b600c5483111561293257611f3e60026034612857565b50600c5482810390811115612974576040805162461bcd60e51b815260206004820152600360248201526254323560e81b604482015290519081900360640190fd5b600c8190556003546129949061010090046001600160a01b031684613c51565b600354604080516101009092046001600160a01b0316825260208201859052818101839052517f3bad0c59cf2f06e7314077049f48a93578cd16f5ef92329f1dab1420a99c177e916060908290030190a16000611269565b6000805460ff16612a2a576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155612a3c6116a0565b90508015612a5a57611324816010811115612a5357fe5b6027612857565b61133533600085613d2d565b6001600160a01b038116600090815260116020526040812080548291829182918291612a9d575060009450849350612b1592505050565b612aad8160000154600a546146d9565b90945092506000846003811115612ac057fe5b14612ad5575091935060009250612b15915050565b612ae3838260010154614718565b90945091506000846003811115612af657fe5b14612b0b575091935060009250612b15915050565b5060009450925050505b915091565b4390565b600354600090819061010090046001600160a01b03163314612b4657611f3e60016042612857565b612b4e612b1a565b60095414612b6257611f3e600a6041612857565b600660009054906101000a90046001600160a01b03169050826001600160a01b0316632191f92a6040518163ffffffff1660e01b815260040160206040518083038186803b158015612bb357600080fd5b505afa158015612bc7573d6000803e3d6000fd5b505050506040513d6020811015612bdd57600080fd5b5051612c16576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600680546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517fedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f9269281900390910190a16000611269565b60008054819060ff16612cb9576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155612ccb6116a0565b90508015612ce9576121fc816010811115612ce257fe5b601e612857565b6122143385614743565b600080838311612d0a575060009050818303612743565b50600390506000612743565b6000612d206157b8565b600080612d318660000151866146d9565b90925090506000826003811115612d4457fe5b14612d6357506040805160208101909152600081529092509050612743565b60408051602081019091529081526000969095509350505050565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0846010811115612dad57fe5b846052811115612db957fe5b604080519283526020830191909152818101859052519081900360600190a183601081111561111357fe5b600080838301848110612dfc57600092509050612743565b506002915060009050612743565b6000806000612e176157b8565b612e218787612d16565b90925090506000826003811115612e3457fe5b14612e455750915060009050612e5e565b612e57612e5182613b74565b86612de4565b9350935050505b935093915050565b60065460408051630dce3c5b60e31b815260048101879052602481018690526044810185905290516000928392839283926001600160a01b031691636e71e2d8916064808301926020929190829003018186803b158015612ec657600080fd5b505afa158015612eda573d6000803e3d6000fd5b505050506040513d6020811015612ef057600080fd5b505160065460085460408051635c0b440b60e11b8152600481018d9052602481018c9052604481018b90526064810192909252519293506000926001600160a01b039092169163b816881691608480820192602092909190829003018186803b158015612f5c57600080fd5b505afa158015612f70573d6000803e3d6000fd5b505050506040513d6020811015612f8657600080fd5b50516006546040805163327a176d60e11b8152600481018d9052602481018c9052604481018b905290519293506001600160a01b03909116916364f42eda91606480820192602092909190829003018186803b158015612fe557600080fd5b505afa158015612ff9573d6000803e3d6000fd5b505050506040513d602081101561300f57600080fd5b5051156130c55761302e6040518060200160405280848152508b6126f6565b9095509250600085600381111561304157fe5b146130535750600092506130d1915050565b61305d8382612cf3565b9095509250600085600381111561307057fe5b146130825750600092506130d1915050565b61309b6040518060200160405280858152508789612e0a565b909550935060008560038111156130ae57fe5b146130c05750600092506130d1915050565b6130cd565b600094508693505b5050505b9550959350505050565b6005546040805163d02f735160e01b81523060048201526001600160a01b038781166024830152868116604483015285811660648301526084820185905291516000938493169163d02f73519160a480830192602092919082900301818787803b15801561314857600080fd5b505af115801561315c573d6000803e3d6000fd5b505050506040513d602081101561317257600080fd5b5051905080156131895761246c6003601b83612d7e565b846001600160a01b0316846001600160a01b031614156131af5761246c6006601c612857565b6001600160a01b0384166000908152600f6020526040812054819081906131d69087612cf3565b909350915060008360038111156131e957fe5b1461320c576132016009601a85600381111561185457fe5b945050505050611113565b6001600160a01b0388166000908152600f602052604090205461322f9087612de4565b9093509050600083600381111561324257fe5b1461325a576132016009601985600381111561185457fe5b6001600160a01b038088166000818152600f60209081526040808320879055938c168083529184902085905583518a8152935191936000805160206158d3833981519152929081900390910190a360009998505050505050505050565b6000805460ff166132f5576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556133076116a0565b905080156133255761132481601081111561331e57fe5b6008612857565b6113353384614d7a565b6000805460ff1661336d576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561337f6116a0565b9050801561339657611324816010811115612a5357fe5b61133533846000613d2d565b60008054819060ff166133e2576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556133f46116a0565b9050801561341f5761341281601081111561340b57fe5b600f612857565b9250600091506134b69050565b836001600160a01b031663a6afed956040518163ffffffff1660e01b8152600401602060405180830381600087803b15801561345a57600080fd5b505af115801561346e573d6000803e3d6000fd5b505050506040513d602081101561348457600080fd5b5051905080156134a45761341281601081111561349d57fe5b6010612857565b6134b033878787615012565b92509250505b6000805460ff191660011790559094909350915050565b60006134d76157b8565b6000806134ec86600001518660000151612de4565b60408051602081019091529081529097909650945050505050565b60006135116157b8565b600080613526866000015186600001516146d9565b9092509050600082600381111561353957fe5b1461355857506040805160208101909152600081529092509050612743565b60008061356d6706f05b59d3b2000084612de4565b9092509050600082600381111561358057fe5b146135a257506040805160208101909152600081529094509250612743915050565b6000806135b783670de0b6b3a7640000614718565b909250905060008260038111156135ca57fe5b146135d157fe5b604080516020810190915290815260009a909950975050505050505050565b60006135fa6157b8565b60008061360f86670de0b6b3a76400006146d9565b9092509050600082600381111561362257fe5b1461364157506040805160208101909152600081529092509050612743565b60008061364e8388614718565b9092509050600082600381111561366157fe5b1461368357506040805160208101909152600081529094509250612743915050565b604080516020810190915290815260009890975095505050505050565b60035460009061010090046001600160a01b031633146136c65761115b60016047612857565b6136ce612b1a565b600954146136e25761115b600a6048612857565b670de0b6b3a76400008211156136fe5761115b60026049612857565b6008805490839055604080518281526020810185905281517faaa68312e2ea9d50e16af5068410ab56e1a1fd06037b1a35664812c30f821460929181900390910190a16000611269565b60055460408051631200453160e11b81523060048201526001600160a01b0386811660248301528581166044830152606482018590529151600093849384939116916324008a629160848082019260209290919082900301818787803b1580156137b157600080fd5b505af11580156137c5573d6000803e3d6000fd5b505050506040513d60208110156137db57600080fd5b5051905080156137ff576137f26003603883612d7e565b925060009150612e5e9050565b613807612b1a565b6009541461381b576137f2600a6039612857565b613823615849565b6001600160a01b038616600090815260116020526040902060010154606082015261384d86612a66565b608083018190526020830182600381111561386457fe5b600381111561386f57fe5b905250600090508160200151600381111561388657fe5b146138b0576138a2600960378360200151600381111561185457fe5b935060009250612e5e915050565b6000198514156138dd576080810151604082018190526138d390889060016154d9565b60e08201526138f4565b604081018590526138ee87866154e1565b60e08201525b61390681608001518260e00151612cf3565b60a083018190526020830182600381111561391d57fe5b600381111561392857fe5b905250600090508160200151600381111561393f57fe5b14613977576040805162461bcd60e51b815260206004820152600360248201526254313760e81b604482015290519081900360640190fd5b613987600b548260e00151612cf3565b60c083018190526020830182600381111561399e57fe5b60038111156139a957fe5b90525060009050816020015160038111156139c057fe5b146139f8576040805162461bcd60e51b81526020600482015260036024820152620a862760eb1b604482015290519081900360640190fd5b60a0810180516001600160a01b03808916600081815260116020908152604091829020948555600a5460019095019490945560c0860151600b81905560e087015195518251968752948601949094528481019390935291519192908a16917f1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a19181900360600190a360e00151600097909650945050505050565b600080600d5460001415613aad575050600754600090612b15565b6001600160a01b0383166000908152600f602052604090206002810154613adc57506001915060009050612b15565b8054613af057505060075460009150612b15565b6000613afb85611fee565b505050915050613b096157b8565b5060408051602081019091528181526001830154613b256157b8565b506040805160208101909152818152613b3c6157b8565b613b468483613507565b915050613b516157b8565b81518754613b5f91906135f0565b5160009a509850612b15975050505050505050565b51670de0b6b3a7640000900490565b600080600080613b91612b1a565b60095414613bb057613ba5600a604f612857565b93509150612b159050565b613bba33866154e1565b905080600c54019150600c54821015613c00576040805162461bcd60e51b815260206004820152600360248201526254323360e81b604482015290519081900360640190fd5b600c829055604080513381526020810183905280820184905290517fa91e67c5ea634cd43a12c5a482724b03de01e85ca68702a53d0c2f45cb7c1dc59181900360600190a160009350915050915091565b6012546040805163a9059cbb60e01b81526001600160a01b0385811660048301526024820185905291519190921691829163a9059cbb9160448082019260009290919082900301818387803b158015613ca957600080fd5b505af1158015613cbd573d6000803e3d6000fd5b5050505060003d60008114613cd95760208114613ce357600080fd5b6000199150613cef565b60206000803e60005191505b5080613d27576040805162461bcd60e51b8152602060048201526002602482015261114d60f21b604482015290519081900360640190fd5b50505050565b6000821580613d3a575081155b613d71576040805162461bcd60e51b81526020600482015260036024820152622a189b60e91b604482015290519081900360640190fd5b613d79615849565b6001600160a01b0385166000908152600f60205260409020613d9961222e565b6040840181905260208401826003811115613db057fe5b6003811115613dbb57fe5b9052506000905082602001516003811115613dd257fe5b14613df757613dee6009602b8460200151600381111561185457fe5b92505050611269565b6000806000806000600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b158015613e4d57600080fd5b505afa158015613e61573d6000803e3d6000fd5b505050506040513d6020811015613e7757600080fd5b505190508015613e9e57613e8a8b611fee565b60018b018190559198509095508594505050505b6006546001600160a01b031663b8168816613eb761274a565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b158015613f0957600080fd5b505afa158015613f1d573d6000803e3d6000fd5b505050506040513d6020811015613f3357600080fd5b50516003870155808015613fd157506006546001600160a01b03166364f42eda613f5b61274a565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b158015613fa357600080fd5b505afa158015613fb7573d6000803e3d6000fd5b505050506040513d6020811015613fcd57600080fd5b5051155b15614157576006546000906001600160a01b03166315f24053613ff261274a565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b15801561403a57600080fd5b505afa15801561404e573d6000803e3d6000fd5b505050506040513d602081101561406457600080fd5b50516006549091506000906001600160a01b0316636e71e2d861408561274a565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b1580156140cd57600080fd5b505afa1580156140e1573d6000803e3d6000fd5b505050506040513d60208110156140f757600080fd5b5051604080516020810190915283815290915060009061411790836126f6565b915050614128896003015482612cf3565b975061413490506157b8565b614142888b600301546135f0565b91505061414f818a6126f6565b985050505050505b60001989141561418d5760408051602081018252908801518152865461417d91906126f6565b6080890181905299506141959050565b608087018990525b891561428257606087018a905280156141fe5785548a14156141c057600186015460808801526141f9565b6141c86157b8565b6141d68860600151846156f5565b9150506141e16157b8565b815188546141ef91906135f0565b5160808b01525050505b61427d565b61421a604051806020016040528089604001518152508b6126f6565b608089018190526020890182600381111561423157fe5b600381111561423c57fe5b905250600090508760200151600381111561425357fe5b1461427d5761426f600960298960200151600381111561185457fe5b975050505050505050611269565b614340565b6080870189905280156142cf576142976157b8565b6142a9886080015188600001546156f5565b9150506142b46157b8565b81516142c090856135f0565b5160608b015250614340915050565b6142eb8960405180602001604052808a60400151815250615730565b606089018190526020890182600381111561430257fe5b600381111561430d57fe5b905250600090508760200151600381111561432457fe5b146143405761426f6009602a8960200151600381111561185457fe5b60055460608801516040805163eabe7d9160e01b81523060048201526001600160a01b038f8116602483015260448201939093529051600093929092169163eabe7d919160648082019260209290919082900301818787803b1580156143a557600080fd5b505af11580156143b9573d6000803e3d6000fd5b505050506040513d60208110156143cf57600080fd5b5051905080156143f5576143e66003602883612d7e565b98505050505050505050611269565b6143fd612b1a565b60095414614411576143e6600a602c612857565b614421600d548960600151612cf3565b60a08a0181905260208a0182600381111561443857fe5b600381111561444357fe5b905250600090508860200151600381111561445a57fe5b14614476576143e66009602e8a60200151600381111561185457fe5b614482600e5486612cf3565b60e08a015250865460608901516144999190612cf3565b60c08a0181905260208a018260038111156144b057fe5b60038111156144bb57fe5b90525060009050886020015160038111156144d257fe5b146144ee576143e66009602d8a60200151600381111561185457fe5b60006144f861274a565b905082156145035750475b886080015181101561452b5761451b600e602f612857565b9950505050505050505050611269565b6145398d8a60800151613c51565b60a0890151600d5560e0890151600e5560c089015188556009546002890155600188015460808a015161456c9190612cf3565b9050886001016000829190505550306001600160a01b03168d6001600160a01b03166000805160206158d38339815191528b606001516040518082815260200191505060405180910390a38c6001600160a01b03167fe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a9298a608001518b60600151604051808381526020018281526020019250505060405180910390a2600560009054906101000a90046001600160a01b03166001600160a01b03166351dff989308f8c608001518d606001516040518563ffffffff1660e01b815260040180856001600160a01b03166001600160a01b03168152602001846001600160a01b03166001600160a01b03168152602001838152602001828152602001945050505050600060405180830381600087803b1580156146a757600080fd5b505af11580156146bb573d6000803e3d6000fd5b50600092506146c8915050565b9d9c50505050505050505050505050565b600080836146ec57506000905080612743565b838302838582816146f957fe5b041461470d57506002915060009050612743565b600092509050612743565b6000808261472c5750600190506000612743565b600083858161473757fe5b04915091509250929050565b6001600160a01b038216600090815260116020526040812054819015614796576040805162461bcd60e51b81526020600482015260036024820152622a189960e91b604482015290519081900360640190fd5b60055460408051634ef4c3e160e01b81523060048201526001600160a01b0387811660248301526044820187905291516000939290921691634ef4c3e19160648082019260209290919082900301818787803b1580156147f557600080fd5b505af1158015614809573d6000803e3d6000fd5b505050506040513d602081101561481f57600080fd5b505190508015614843576148366003601f83612d7e565b9250600091506127439050565b61484b612b1a565b6009541461485f57614836600a6022612857565b614867615849565b61486f61222e565b604083018190526020830182600381111561488657fe5b600381111561489157fe5b90525060009050816020015160038111156148a857fe5b146148d2576148c4600960218360200151600381111561185457fe5b935060009250612743915050565b608081018590526148e38682615747565b6148ed86866154e1565b60e082018190526040805160208101825290830151815261490e9190615730565b606083018190526020830182600381111561492557fe5b600381111561493057fe5b905250600090508160200151600381111561494757fe5b1461497f576040805162461bcd60e51b815260206004820152600360248201526254313360e81b604482015290519081900360640190fd5b61498f600d548260600151612de4565b60a08301819052602083018260038111156149a657fe5b60038111156149b157fe5b90525060009050816020015160038111156149c857fe5b14614a00576040805162461bcd60e51b8152602060048201526003602482015262150c4d60ea1b604482015290519081900360640190fd5b6001600160a01b0386166000908152600f60205260409020546060820151614a289190612de4565b60c0830181905260208301826003811115614a3f57fe5b6003811115614a4a57fe5b9052506000905081602001516003811115614a6157fe5b14614a99576040805162461bcd60e51b815260206004820152600360248201526254313560e81b604482015290519081900360640190fd5b6006546000906001600160a01b031663b8168816614ab561274a565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b158015614b0757600080fd5b505afa158015614b1b573d6000803e3d6000fd5b505050506040513d6020811015614b3157600080fd5b5051600654604080516338db09b960e21b815290519293506000926001600160a01b039092169163e36c26e491600480820192602092909190829003018186803b158015614b7e57600080fd5b505afa158015614b92573d6000803e3d6000fd5b505050506040513d6020811015614ba857600080fd5b50516001600160a01b0389166000908152600f602052604090205490915015614c8f57614bd36157b8565b8115614bff576000614be48a611fee565b60408051602081019091529081529550614c7e945050505050565b6001600160a01b0389166000908152600f602090815260408083205481518084018352818152825193840183529188015183529291614c3e9190613507565b935090506000816003811115614c5057fe5b14614c7b57614c686009602083600381111561185457fe5b9850600097506127439650505050505050565b50505b8051614c8a9089612de4565b985050505b60a0830151600d556040805160808101825260c0850151815260208082018a815260095483850190815260608085018881526001600160a01b038f166000818152600f8752889020965187559351600187015591516002860155905160039094019390935560e087015192870151845193845291830191909152825190927f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f928290030190a2606083015160408051918252516001600160a01b038a169130916000805160206158d38339815191529181900360200190a3505060e001516000969095509350505050565b6005546040805163368f515360e21b81523060048201526001600160a01b0385811660248301526044820185905291516000938493169163da3d454c91606480830192602092919082900301818787803b158015614dd757600080fd5b505af1158015614deb573d6000803e3d6000fd5b505050506040513d6020811015614e0157600080fd5b505190508015614e2057614e186003600e83612d7e565b915050610ce0565b614e28612b1a565b60095414614e3b57614e18600a80612857565b82614e4461274a565b1015614e5657614e18600e6009612857565b614e5e61588f565b614e6785612a66565b6020830181905282826003811115614e7b57fe5b6003811115614e8657fe5b9052506000905081516003811115614e9a57fe5b14614ebf57614eb6600960078360000151600381111561185457fe5b92505050610ce0565b614ecd816020015185612de4565b6040830181905282826003811115614ee157fe5b6003811115614eec57fe5b9052506000905081516003811115614f0057fe5b14614f1c57614eb66009600c8360000151600381111561185457fe5b614f28600b5485612de4565b6060830181905282826003811115614f3c57fe5b6003811115614f4757fe5b9052506000905081516003811115614f5b57fe5b14614f7757614eb66009600b8360000151600381111561185457fe5b614f81858261574b565b9050614f8d8585613c51565b604080820180516001600160a01b03881660008181526011602090815290859020928355600a54600190930192909255606080860151600b819055935185518a8152938401528285019390935292517f13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80929181900390910190a2600095945050505050565b60055460408051632fe3f38f60e11b81523060048201526001600160a01b0384811660248301528781166044830152868116606483015260848201869052915160009384938493911691635fc7e71e9160a48082019260209290919082900301818787803b15801561508357600080fd5b505af1158015615097573d6000803e3d6000fd5b505050506040513d60208110156150ad57600080fd5b5051905080156150d1576150c46003601283612d7e565b9250600091506154d09050565b6150d9612b1a565b600954146150ed576150c4600a6016612857565b6150f5612b1a565b846001600160a01b0316636c540baf6040518163ffffffff1660e01b815260040160206040518083038186803b15801561512e57600080fd5b505afa158015615142573d6000803e3d6000fd5b505050506040513d602081101561515857600080fd5b50511461516b576150c4600a6011612857565b866001600160a01b0316866001600160a01b03161415615191576150c460066017612857565b846151a2576150c460076015612857565b6000198514156151b8576150c460076014612857565b6000806151c6898989613748565b909250905081156151f6576151e78260108111156151e057fe5b6018612857565b9450600093506154d092505050565b6005546040805163c488847b60e01b81523060048201526001600160a01b038981166024830152604482018590528251600094859492169263c488847b926064808301939192829003018186803b15801561525057600080fd5b505afa158015615264573d6000803e3d6000fd5b505050506040513d604081101561527a57600080fd5b508051602090910151909250905081156152c1576040805162461bcd60e51b815260206004820152600360248201526254313960e81b604482015290519081900360640190fd5b80886001600160a01b03166370a082318c6040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060206040518083038186803b15801561531857600080fd5b505afa15801561532c573d6000803e3d6000fd5b505050506040513d602081101561534257600080fd5b5051101561537d576040805162461bcd60e51b815260206004820152600360248201526205432360ec1b604482015290519081900360640190fd5b60006001600160a01b0389163014156153a35761539c308d8d856130db565b905061542d565b6040805163b2a02ff160e01b81526001600160a01b038e811660048301528d81166024830152604482018590529151918b169163b2a02ff1916064808201926020929091908290030181600087803b1580156153fe57600080fd5b505af1158015615412573d6000803e3d6000fd5b505050506040513d602081101561542857600080fd5b505190505b8015615466576040805162461bcd60e51b815260206004820152600360248201526254323160e81b604482015290519081900360640190fd5b886001600160a01b03168b6001600160a01b03168d6001600160a01b03167f298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb528786604051808381526020018281526020019250505060405180910390a46000975092955050505050505b94509492505050565b600061111384845b601254604080516370a0823160e01b815230600482015290516000926001600160a01b031691839183916370a08231916024808301926020929190829003018186803b15801561553057600080fd5b505afa158015615544573d6000803e3d6000fd5b505050506040513d602081101561555a57600080fd5b5051604080516323b872dd60e01b81526001600160a01b038881166004830152306024830152604482018890529151929350908416916323b872dd9160648082019260009290919082900301818387803b1580156155b757600080fd5b505af11580156155cb573d6000803e3d6000fd5b5050505060003d600081146155e757602081146155f157600080fd5b60001991506155fd565b60206000803e60005191505b5080615635576040805162461bcd60e51b8152602060048201526002602482015261229960f11b604482015290519081900360640190fd5b601254604080516370a0823160e01b815230600482015290516000926001600160a01b0316916370a08231916024808301926020929190829003018186803b15801561568057600080fd5b505afa158015615694573d6000803e3d6000fd5b505050506040513d60208110156156aa57600080fd5b50519050828110156156e8576040805162461bcd60e51b8152602060048201526002602482015261453360f01b604482015290519081900360640190fd5b9190910395945050505050565b60006156ff6157b8565b615725604051806020016040528086815250604051806020016040528086815250613507565b915091509250929050565b600080600061573d6157b8565b61270d8686615759565b5050565b61575361588f565b50919050565b60006157636157b8565b600080615778670de0b6b3a7640000876146d9565b9092509050600082600381111561578b57fe5b146157aa57506040805160208101909152600081529092509050612743565b61273c8186600001516135f0565b6040518060200160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061580c57805160ff1916838001178555615839565b82800160010185558215615839579182015b8281111561583957825182559160200191906001019061581e565b506158459291506158b8565b5090565b6040805161010081019091528060008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b604080516080810190915280600081526020016000815260200160008152602001600081525090565b610e0891905b8082111561584557600081556001016158be56feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa265627a7a723158206df45d1d75c48e9ae5057d2a4d813943d3ddcf4d7239839922aa3f3fceae578564736f6c63430005100032";
var deployedBytecode$1 = "0x608060405234801561001057600080fd5b50600436106103425760003560e01c8063852a12e3116101b8578063c139562b11610104578063f3fdb15a116100a2578063f8f9da281161007c578063f8f9da2814610b59578063fc610b3d14610b61578063fca7820b14610bc7578063fe9c44ae14610be457610342565b8063f3fdb15a14610b13578063f5e3c46214610b1b578063f851a44014610b5157610342565b8063db006a75116100de578063db006a7514610a9a578063dd62ed3e14610ab7578063e9c714f214610ae5578063f2b3abbd14610aed57610342565b8063c139562b14610a31578063c37f68e214610a57578063c5ebeaec14610a7d57610342565b8063a6afed9511610171578063ae9d70b01161014b578063ae9d70b0146109c5578063b2a02ff1146109cd578063b71d1a0c14610a03578063bd6d894d14610a2957610342565b8063a6afed9514610989578063a9059cbb14610991578063aa5af0fd146109bd57610342565b8063852a12e3146107cb5780638f840ddd146107e857806395d89b41146107f057806395dd9193146107f857806399d8c1b41461081e578063a0712d681461096c57610342565b8063313ce567116102925780635fe3b567116102305780636c540baf1161020a5780636c540baf1461078d5780636f307dc31461079557806370a082311461079d57806373acee98146107c357610342565b80635fe3b56714610760578063601a0bf114610768578063675d972c1461078557610342565b80633e9410101161026c5780633e941010146106c95780634576b5db146106e657806347bd37181461070c578063524fe4b51461071457610342565b8063313ce5671461067d5780633af9e6691461069b5780633b1d21a2146106c157610342565b8063182df0f5116102ff5780631df0ba9d116102d95780631df0ba9d146105ef57806323b872dd146105f75780632608f8181461062d578063267822471461065957610342565b8063182df0f5146104695780631a31d465146104715780631be19560146105c957610342565b806306fdde0314610347578063095ea7b3146103c45780630e75270214610404578063173b99041461043357806317bfdfbc1461043b57806318160ddd14610461575b600080fd5b61034f610bec565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610389578181015183820152602001610371565b50505050905090810190601f1680156103b65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6103f0600480360360408110156103da57600080fd5b506001600160a01b038135169060200135610c79565b604080519115158252519081900360200190f35b6104216004803603602081101561041a57600080fd5b5035610ce6565b60408051918252519081900360200190f35b610421610cfc565b6104216004803603602081101561045157600080fd5b50356001600160a01b0316610d02565b610421610da7565b610421610dad565b6105c7600480360360e081101561048757600080fd5b6001600160a01b03823581169260208101358216926040820135909216916060820135919081019060a081016080820135600160201b8111156104c957600080fd5b8201836020820111156104db57600080fd5b803590602001918460018302840111600160201b831117156104fc57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b81111561054e57600080fd5b82018360208201111561056057600080fd5b803590602001918460018302840111600160201b8311171561058157600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505050903560ff169150610e0b9050565b005b6105c7600480360360208110156105df57600080fd5b50356001600160a01b0316610eaa565b610421610fe1565b6103f06004803603606081101561060d57600080fd5b506001600160a01b03813581169160208101359091169060400135610fe7565b6104216004803603604081101561064357600080fd5b506001600160a01b038135169060200135611052565b610661611068565b604080516001600160a01b039092168252519081900360200190f35b610685611077565b6040805160ff9092168252519081900360200190f35b610421600480360360208110156106b157600080fd5b50356001600160a01b0316611080565b61042161111b565b610421600480360360208110156106df57600080fd5b503561112a565b610421600480360360208110156106fc57600080fd5b50356001600160a01b0316611135565b610421611270565b61073a6004803603602081101561072a57600080fd5b50356001600160a01b0316611276565b604080519485526020850193909352838301919091526060830152519081900360800190f35b6106616112a7565b6104216004803603602081101561077e57600080fd5b50356112b6565b61042161134a565b610421611350565b610661611356565b610421600480360360208110156107b357600080fd5b50356001600160a01b0316611365565b610421611380565b610421600480360360208110156107e157600080fd5b503561141b565b610421611426565b61034f61142c565b6104216004803603602081101561080e57600080fd5b50356001600160a01b0316611484565b6105c7600480360360c081101561083457600080fd5b6001600160a01b03823581169260208101359091169160408201359190810190608081016060820135600160201b81111561086e57600080fd5b82018360208201111561088057600080fd5b803590602001918460018302840111600160201b831117156108a157600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b8111156108f357600080fd5b82018360208201111561090557600080fd5b803590602001918460018302840111600160201b8311171561092657600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505050903560ff1691506114dc9050565b6104216004803603602081101561098257600080fd5b5035611694565b6104216116a0565b6103f0600480360360408110156109a757600080fd5b506001600160a01b038135169060200135611a7b565b610421611ae5565b610421611aeb565b610421600480360360608110156109e357600080fd5b506001600160a01b03813581169160208101359091169060400135611b8a565b61042160048036036020811015610a1957600080fd5b50356001600160a01b0316611bf4565b610421611c80565b61042160048036036020811015610a4757600080fd5b50356001600160a01b0316611d21565b61073a60048036036020811015610a6d57600080fd5b50356001600160a01b0316611d3c565b61042160048036036020811015610a9357600080fd5b5035611dd1565b61042160048036036020811015610ab057600080fd5b5035611ddc565b61042160048036036040811015610acd57600080fd5b506001600160a01b0381358116916020013516611de7565b610421611e12565b61042160048036036020811015610b0357600080fd5b50356001600160a01b0316611f15565b610661611f4f565b61042160048036036060811015610b3157600080fd5b506001600160a01b03813581169160208101359160409091013516611f5e565b610661611f76565b610421611f8a565b610b8760048036036020811015610b7757600080fd5b50356001600160a01b0316611fee565b60405180866003811115610b9757fe5b60ff1681526020018581526020018481526020018381526020018281526020019550505050505060405180910390f35b61042160048036036020811015610bdd57600080fd5b5035612110565b6103f0612187565b60018054604080516020600284861615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015610c715780601f10610c4657610100808354040283529160200191610c71565b820191906000526020600020905b815481529060010190602001808311610c5457829003601f168201915b505050505081565b3360008181526010602090815260408083206001600160a01b03871680855290835281842086905581518681529151939493909284927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a360019150505b92915050565b600080610cf28361218c565b509150505b919050565b60085481565b6000805460ff16610d40576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155610d526116a0565b14610d89576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b610d9282611484565b90505b6000805460ff19166001179055919050565b600d5481565b6000806000610dba61222e565b90925090506000826003811115610dcd57fe5b14610e04576040805162461bcd60e51b8152602060048201526002602482015261543960f01b604482015290519081900360640190fd5b9150505b90565b610e198686868686866114dc565b601280546001600160a01b0319166001600160a01b038981169190911791829055604080516318160ddd60e01b8152905192909116916318160ddd91600480820192602092909190829003018186803b158015610e7557600080fd5b505afa158015610e89573d6000803e3d6000fd5b505050506040513d6020811015610e9f57600080fd5b505050505050505050565b6012546001600160a01b0382811691161415610ef2576040805162461bcd60e51b8152602060048201526002602482015261453160f01b604482015290519081900360640190fd5b604080516370a0823160e01b815230600482015290516000916001600160a01b038416916370a0823191602480820192602092909190829003018186803b158015610f3c57600080fd5b505afa158015610f50573d6000803e3d6000fd5b505050506040513d6020811015610f6657600080fd5b50516003546040805163a9059cbb60e01b81526101009092046001600160a01b03908116600484015260248301849052905192935084169163a9059cbb9160448082019260009290919082900301818387803b158015610fc557600080fd5b505af1158015610fd9573d6000803e3d6000fd5b505050505050565b600e5481565b6000805460ff16611025576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561103b338686866123c6565b1490506000805460ff191660011790559392505050565b60008061105f8484612652565b50949350505050565b6004546001600160a01b031681565b60035460ff1681565b600061108a6157b8565b604051806020016040528061109d611c80565b90526001600160a01b0384166000908152600f60205260408120549192509081906110c99084906126f6565b909250905060008260038111156110dc57fe5b14611113576040805162461bcd60e51b81526020600482015260026024820152612a1b60f11b604482015290519081900360640190fd5b949350505050565b600061112561274a565b905090565b6000610ce0826127ca565b60035460009061010090046001600160a01b031633146111625761115b6001603f612857565b9050610cf7565b60055460408051623f1ee960e11b815290516001600160a01b0392831692851691627e3dd2916004808301926020929190829003018186803b1580156111a757600080fd5b505afa1580156111bb573d6000803e3d6000fd5b505050506040513d60208110156111d157600080fd5b505161120a576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600580546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517f7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d9281900390910190a160005b9392505050565b600b5481565b6001600160a01b03166000908152600f60205260409020805460018201546002830154600390930154919390929190565b6005546001600160a01b031681565b6000805460ff166112f4576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556113066116a0565b9050801561132c5761132481601081111561131d57fe5b6030612857565b915050610d95565b611335836128bd565b9150506000805460ff19166001179055919050565b60075481565b60095481565b6012546001600160a01b031681565b6001600160a01b03166000908152600f602052604090205490565b6000805460ff166113be576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556113d06116a0565b14611407576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b50600b546000805460ff1916600117905590565b6000610ce0826129ec565b600c5481565b6002805460408051602060018416156101000260001901909316849004601f81018490048402820184019092528181529291830182828015610c715780601f10610c4657610100808354040283529160200191610c71565b600080600061149284612a66565b909250905060008260038111156114a557fe5b14611269576040805162461bcd60e51b81526020600482015260026024820152610a8760f31b604482015290519081900360640190fd5b60035461010090046001600160a01b03163314611525576040805162461bcd60e51b8152602060048201526002602482015261543160f01b604482015290519081900360640190fd5b6009541580156115355750600a54155b61156b576040805162461bcd60e51b81526020600482015260026024820152612a1960f11b604482015290519081900360640190fd5b6007849055836115a7576040805162461bcd60e51b8152602060048201526002602482015261543360f01b604482015290519081900360640190fd5b60006115b287611135565b905080156115ec576040805162461bcd60e51b8152602060048201526002602482015261150d60f21b604482015290519081900360640190fd5b6115f4612b1a565b600955670de0b6b3a7640000600a5561160c86612b1e565b90508015611646576040805162461bcd60e51b8152602060048201526002602482015261543560f01b604482015290519081900360640190fd5b83516116599060019060208701906157cb565b50825161166d9060029060208601906157cb565b50506003805460ff90921660ff199283161790556000805490911660011790555050505050565b600080610cf283612c79565b6000806116ab612b1a565b600954909150808214156116c457600092505050610e08565b60006116ce61274a565b600b54600c54600a54600654604080516315f2405360e01b815260048101879052602481018690526044810185905290519596509394929391926000926001600160a01b03909216916315f24053916064808301926020929190829003018186803b15801561173c57600080fd5b505afa158015611750573d6000803e3d6000fd5b505050506040513d602081101561176657600080fd5b5051905065048c273950008111156117ab576040805162461bcd60e51b815260206004820152600360248201526205431360ec1b604482015290519081900360640190fd5b6000806117b88989612cf3565b909250905060008260038111156117cb57fe5b14611803576040805162461bcd60e51b815260206004820152600360248201526254313160e81b604482015290519081900360640190fd5b61180b6157b8565b60008060008061182960405180602001604052808a81525087612d16565b9097509450600087600381111561183c57fe5b1461186e576118596009600689600381111561185457fe5b612d7e565b9e505050505050505050505050505050610e08565b611878858c6126f6565b9097509350600087600381111561188b57fe5b146118a3576118596009600189600381111561185457fe5b6118ad848c612de4565b909750925060008760038111156118c057fe5b146118d8576118596009600489600381111561185457fe5b6118f36040518060200160405280600854815250858c612e0a565b9097509150600087600381111561190657fe5b1461191e576118596009600589600381111561185457fe5b600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b15801561196c57600080fd5b505afa158015611980573d6000803e3d6000fd5b505050506040513d602081101561199657600080fd5b5051156119d5576119aa888d8d8d88612e66565b909750915060008760038111156119bd57fe5b146119d5576118596009600589600381111561185457fe5b6119e0858a8b612e0a565b909750905060008760038111156119f357fe5b14611a0b576118596009600389600381111561185457fe5b60098e9055600a819055600b839055600c829055604080518d8152602081018690528082018390526060810185905290517f4dec04e750ca11537cabcd8a9eab06494de08da3735bc8871cd41250e190bc049181900360800190a160009e50505050505050505050505050505090565b6000805460ff16611ab9576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155611acf333386866123c6565b1490506000805460ff1916600117905592915050565b600a5481565b6006546000906001600160a01b031663b8168816611b0761274a565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b158015611b5957600080fd5b505afa158015611b6d573d6000803e3d6000fd5b505050506040513d6020811015611b8357600080fd5b5051905090565b6000805460ff16611bc8576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19169055611bde338585856130db565b90506000805460ff191660011790559392505050565b60035460009061010090046001600160a01b03163314611c1a5761115b60016045612857565b600480546001600160a01b038481166001600160a01b0319831681179093556040805191909216808252602082019390935281517fca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9929181900390910190a16000611269565b6000805460ff16611cbe576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155611cd06116a0565b14611d07576040805162461bcd60e51b8152602060048201526002602482015261543760f01b604482015290519081900360640190fd5b611d0f610dad565b90506000805460ff1916600117905590565b6001600160a01b031660009081526011602052604090205490565b6001600160a01b0381166000908152600f6020526040812054819081908190818080611d6789612a66565b935090506000816003811115611d7957fe5b14611d975760095b975060009650869550859450611dca9350505050565b611d9f61222e565b925090506000816003811115611db157fe5b14611dbd576009611d81565b5060009650919450925090505b9193509193565b6000610ce0826132b7565b6000610ce08261332f565b6001600160a01b03918216600090815260106020908152604080832093909416825291909152205490565b6004546000906001600160a01b031633141580611e2d575033155b15611e4557611e3e60016000612857565b9050610e08565b60038054600480546001600160a01b03818116610100818102610100600160a81b0319871617968790556001600160a01b031990931690935560408051948390048216808652929095041660208401528351909391927ff9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc92908290030190a1600454604080516001600160a01b038085168252909216602083015280517fca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a99281900390910190a160009250505090565b600080611f206116a0565b90508015611f4657611f3e816010811115611f3757fe5b6040612857565b915050610cf7565b61126983612b1e565b6006546001600160a01b031681565b600080611f6c8585856133a2565b5095945050505050565b60035461010090046001600160a01b031681565b6006546000906001600160a01b03166315f24053611fa661274a565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b158015611b5957600080fd5b6001600160a01b0381166000908152600f602052604081206003810154829182918291829161201b6157b8565b6040518060200160405280838152509050600061203e6009548560020154612cf3565b9150506120496157b8565b6120538383612d16565b91505061205e6157b8565b61207e6040518060200160405280670de0b6b3a7640000815250836134cd565b600188015490925090506120906157b8565b5060408051602081019091528181526120a76157b8565b6120b18483613507565b91505060006120c4826000015185612cf3565b9150506120cf6157b8565b82518b546120dd91906135f0565b9150506000866000015183836000015186600001519f509f509f509f509f50505050505050505050505091939590929450565b6000805460ff1661214e576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556121606116a0565b9050801561217e5761132481601081111561217757fe5b6046612857565b611335836136a0565b600181565b60008054819060ff166121cc576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556121de6116a0565b90508015612209576121fc8160108111156121f557fe5b6036612857565b92506000915061221a9050565b612214333386613748565b92509250505b6000805460ff191660011790559092909150565b600d54600090819080612249575050600754600091506123c2565b600080600061225661274a565b9050600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b1580156122a657600080fd5b505afa1580156122ba573d6000803e3d6000fd5b505050506040513d60208110156122d057600080fd5b50511561231a576122e033613a92565b909350915060008360038111156122f357fe5b141561230857506000945092506123c2915050565b600060075495509550505050506123c2565b600654600b54600c54600d5460408051639dc8bea760e01b81526004810187905260248101949094526044840192909252606483015280516001600160a01b0390931692639dc8bea7926084808201939291829003018186803b15801561238057600080fd5b505afa158015612394573d6000803e3d6000fd5b505050506040513d60408110156123aa57600080fd5b50805160209091015190965094506123c29350505050565b9091565b600554604080516317b9b84b60e31b81523060048201526001600160a01b03868116602483015285811660448301526064820185905291516000938493169163bdcdc25891608480830192602092919082900301818787803b15801561242b57600080fd5b505af115801561243f573d6000803e3d6000fd5b505050506040513d602081101561245557600080fd5b5051905080156124745761246c6003604a83612d7e565b915050611113565b836001600160a01b0316856001600160a01b0316141561249a5761246c6002604b612857565b60006001600160a01b0387811690871614156124b957506000196124e1565b506001600160a01b038086166000908152601060209081526040808320938a16835292905220545b6000806000806124f18589612cf3565b9094509250600084600381111561250457fe5b14612522576125156009604b612857565b9650505050505050611113565b6001600160a01b038a166000908152600f60205260409020546125459089612cf3565b9094509150600084600381111561255857fe5b14612569576125156009604c612857565b6001600160a01b0389166000908152600f602052604090205461258c9089612de4565b9094509050600084600381111561259f57fe5b146125b0576125156009604d612857565b6001600160a01b03808b166000908152600f6020526040808220859055918b168152208190556000198514612608576001600160a01b03808b166000908152601060209081526040808320938f168352929052208390555b886001600160a01b03168a6001600160a01b03166000805160206158d38339815191528a6040518082815260200191505060405180910390a35060009a9950505050505050505050565b60008054819060ff16612692576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556126a46116a0565b905080156126cf576126c28160108111156126bb57fe5b6035612857565b9250600091506126e09050565b6126da338686613748565b92509250505b6000805460ff1916600117905590939092509050565b60008060006127036157b8565b61270d8686612d16565b9092509050600082600381111561272057fe5b146127315750915060009050612743565b600061273c82613b74565b9350935050505b9250929050565b601254604080516370a0823160e01b815230600482015290516000926001600160a01b03169182916370a0823191602480820192602092909190829003018186803b15801561279857600080fd5b505afa1580156127ac573d6000803e3d6000fd5b505050506040513d60208110156127c257600080fd5b505191505090565b6000805460ff16612808576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561281a6116a0565b905080156128385761132481601081111561283157fe5b604e612857565b61284183613b83565b509150506000805460ff19166001179055919050565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa083601081111561288657fe5b83605281111561289257fe5b604080519283526020830191909152600082820152519081900360600190a182601081111561126957fe5b600354600090819061010090046001600160a01b031633146128e557611f3e60016031612857565b6128ed612b1a565b6009541461290157611f3e600a6033612857565b8261290a61274a565b101561291c57611f3e600e6032612857565b600c5483111561293257611f3e60026034612857565b50600c5482810390811115612974576040805162461bcd60e51b815260206004820152600360248201526254323560e81b604482015290519081900360640190fd5b600c8190556003546129949061010090046001600160a01b031684613c51565b600354604080516101009092046001600160a01b0316825260208201859052818101839052517f3bad0c59cf2f06e7314077049f48a93578cd16f5ef92329f1dab1420a99c177e916060908290030190a16000611269565b6000805460ff16612a2a576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155612a3c6116a0565b90508015612a5a57611324816010811115612a5357fe5b6027612857565b61133533600085613d2d565b6001600160a01b038116600090815260116020526040812080548291829182918291612a9d575060009450849350612b1592505050565b612aad8160000154600a546146d9565b90945092506000846003811115612ac057fe5b14612ad5575091935060009250612b15915050565b612ae3838260010154614718565b90945091506000846003811115612af657fe5b14612b0b575091935060009250612b15915050565b5060009450925050505b915091565b4390565b600354600090819061010090046001600160a01b03163314612b4657611f3e60016042612857565b612b4e612b1a565b60095414612b6257611f3e600a6041612857565b600660009054906101000a90046001600160a01b03169050826001600160a01b0316632191f92a6040518163ffffffff1660e01b815260040160206040518083038186803b158015612bb357600080fd5b505afa158015612bc7573d6000803e3d6000fd5b505050506040513d6020811015612bdd57600080fd5b5051612c16576040805162461bcd60e51b81526020600482015260036024820152622a191960e91b604482015290519081900360640190fd5b600680546001600160a01b0319166001600160a01b03858116918217909255604080519284168352602083019190915280517fedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f9269281900390910190a16000611269565b60008054819060ff16612cb9576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff19168155612ccb6116a0565b90508015612ce9576121fc816010811115612ce257fe5b601e612857565b6122143385614743565b600080838311612d0a575060009050818303612743565b50600390506000612743565b6000612d206157b8565b600080612d318660000151866146d9565b90925090506000826003811115612d4457fe5b14612d6357506040805160208101909152600081529092509050612743565b60408051602081019091529081526000969095509350505050565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0846010811115612dad57fe5b846052811115612db957fe5b604080519283526020830191909152818101859052519081900360600190a183601081111561111357fe5b600080838301848110612dfc57600092509050612743565b506002915060009050612743565b6000806000612e176157b8565b612e218787612d16565b90925090506000826003811115612e3457fe5b14612e455750915060009050612e5e565b612e57612e5182613b74565b86612de4565b9350935050505b935093915050565b60065460408051630dce3c5b60e31b815260048101879052602481018690526044810185905290516000928392839283926001600160a01b031691636e71e2d8916064808301926020929190829003018186803b158015612ec657600080fd5b505afa158015612eda573d6000803e3d6000fd5b505050506040513d6020811015612ef057600080fd5b505160065460085460408051635c0b440b60e11b8152600481018d9052602481018c9052604481018b90526064810192909252519293506000926001600160a01b039092169163b816881691608480820192602092909190829003018186803b158015612f5c57600080fd5b505afa158015612f70573d6000803e3d6000fd5b505050506040513d6020811015612f8657600080fd5b50516006546040805163327a176d60e11b8152600481018d9052602481018c9052604481018b905290519293506001600160a01b03909116916364f42eda91606480820192602092909190829003018186803b158015612fe557600080fd5b505afa158015612ff9573d6000803e3d6000fd5b505050506040513d602081101561300f57600080fd5b5051156130c55761302e6040518060200160405280848152508b6126f6565b9095509250600085600381111561304157fe5b146130535750600092506130d1915050565b61305d8382612cf3565b9095509250600085600381111561307057fe5b146130825750600092506130d1915050565b61309b6040518060200160405280858152508789612e0a565b909550935060008560038111156130ae57fe5b146130c05750600092506130d1915050565b6130cd565b600094508693505b5050505b9550959350505050565b6005546040805163d02f735160e01b81523060048201526001600160a01b038781166024830152868116604483015285811660648301526084820185905291516000938493169163d02f73519160a480830192602092919082900301818787803b15801561314857600080fd5b505af115801561315c573d6000803e3d6000fd5b505050506040513d602081101561317257600080fd5b5051905080156131895761246c6003601b83612d7e565b846001600160a01b0316846001600160a01b031614156131af5761246c6006601c612857565b6001600160a01b0384166000908152600f6020526040812054819081906131d69087612cf3565b909350915060008360038111156131e957fe5b1461320c576132016009601a85600381111561185457fe5b945050505050611113565b6001600160a01b0388166000908152600f602052604090205461322f9087612de4565b9093509050600083600381111561324257fe5b1461325a576132016009601985600381111561185457fe5b6001600160a01b038088166000818152600f60209081526040808320879055938c168083529184902085905583518a8152935191936000805160206158d3833981519152929081900390910190a360009998505050505050505050565b6000805460ff166132f5576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556133076116a0565b905080156133255761132481601081111561331e57fe5b6008612857565b6113353384614d7a565b6000805460ff1661336d576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff1916815561337f6116a0565b9050801561339657611324816010811115612a5357fe5b61133533846000613d2d565b60008054819060ff166133e2576040805162461bcd60e51b81526020600482015260036024820152622a191b60e91b604482015290519081900360640190fd5b6000805460ff191681556133f46116a0565b9050801561341f5761341281601081111561340b57fe5b600f612857565b9250600091506134b69050565b836001600160a01b031663a6afed956040518163ffffffff1660e01b8152600401602060405180830381600087803b15801561345a57600080fd5b505af115801561346e573d6000803e3d6000fd5b505050506040513d602081101561348457600080fd5b5051905080156134a45761341281601081111561349d57fe5b6010612857565b6134b033878787615012565b92509250505b6000805460ff191660011790559094909350915050565b60006134d76157b8565b6000806134ec86600001518660000151612de4565b60408051602081019091529081529097909650945050505050565b60006135116157b8565b600080613526866000015186600001516146d9565b9092509050600082600381111561353957fe5b1461355857506040805160208101909152600081529092509050612743565b60008061356d6706f05b59d3b2000084612de4565b9092509050600082600381111561358057fe5b146135a257506040805160208101909152600081529094509250612743915050565b6000806135b783670de0b6b3a7640000614718565b909250905060008260038111156135ca57fe5b146135d157fe5b604080516020810190915290815260009a909950975050505050505050565b60006135fa6157b8565b60008061360f86670de0b6b3a76400006146d9565b9092509050600082600381111561362257fe5b1461364157506040805160208101909152600081529092509050612743565b60008061364e8388614718565b9092509050600082600381111561366157fe5b1461368357506040805160208101909152600081529094509250612743915050565b604080516020810190915290815260009890975095505050505050565b60035460009061010090046001600160a01b031633146136c65761115b60016047612857565b6136ce612b1a565b600954146136e25761115b600a6048612857565b670de0b6b3a76400008211156136fe5761115b60026049612857565b6008805490839055604080518281526020810185905281517faaa68312e2ea9d50e16af5068410ab56e1a1fd06037b1a35664812c30f821460929181900390910190a16000611269565b60055460408051631200453160e11b81523060048201526001600160a01b0386811660248301528581166044830152606482018590529151600093849384939116916324008a629160848082019260209290919082900301818787803b1580156137b157600080fd5b505af11580156137c5573d6000803e3d6000fd5b505050506040513d60208110156137db57600080fd5b5051905080156137ff576137f26003603883612d7e565b925060009150612e5e9050565b613807612b1a565b6009541461381b576137f2600a6039612857565b613823615849565b6001600160a01b038616600090815260116020526040902060010154606082015261384d86612a66565b608083018190526020830182600381111561386457fe5b600381111561386f57fe5b905250600090508160200151600381111561388657fe5b146138b0576138a2600960378360200151600381111561185457fe5b935060009250612e5e915050565b6000198514156138dd576080810151604082018190526138d390889060016154d9565b60e08201526138f4565b604081018590526138ee87866154e1565b60e08201525b61390681608001518260e00151612cf3565b60a083018190526020830182600381111561391d57fe5b600381111561392857fe5b905250600090508160200151600381111561393f57fe5b14613977576040805162461bcd60e51b815260206004820152600360248201526254313760e81b604482015290519081900360640190fd5b613987600b548260e00151612cf3565b60c083018190526020830182600381111561399e57fe5b60038111156139a957fe5b90525060009050816020015160038111156139c057fe5b146139f8576040805162461bcd60e51b81526020600482015260036024820152620a862760eb1b604482015290519081900360640190fd5b60a0810180516001600160a01b03808916600081815260116020908152604091829020948555600a5460019095019490945560c0860151600b81905560e087015195518251968752948601949094528481019390935291519192908a16917f1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a19181900360600190a360e00151600097909650945050505050565b600080600d5460001415613aad575050600754600090612b15565b6001600160a01b0383166000908152600f602052604090206002810154613adc57506001915060009050612b15565b8054613af057505060075460009150612b15565b6000613afb85611fee565b505050915050613b096157b8565b5060408051602081019091528181526001830154613b256157b8565b506040805160208101909152818152613b3c6157b8565b613b468483613507565b915050613b516157b8565b81518754613b5f91906135f0565b5160009a509850612b15975050505050505050565b51670de0b6b3a7640000900490565b600080600080613b91612b1a565b60095414613bb057613ba5600a604f612857565b93509150612b159050565b613bba33866154e1565b905080600c54019150600c54821015613c00576040805162461bcd60e51b815260206004820152600360248201526254323360e81b604482015290519081900360640190fd5b600c829055604080513381526020810183905280820184905290517fa91e67c5ea634cd43a12c5a482724b03de01e85ca68702a53d0c2f45cb7c1dc59181900360600190a160009350915050915091565b6012546040805163a9059cbb60e01b81526001600160a01b0385811660048301526024820185905291519190921691829163a9059cbb9160448082019260009290919082900301818387803b158015613ca957600080fd5b505af1158015613cbd573d6000803e3d6000fd5b5050505060003d60008114613cd95760208114613ce357600080fd5b6000199150613cef565b60206000803e60005191505b5080613d27576040805162461bcd60e51b8152602060048201526002602482015261114d60f21b604482015290519081900360640190fd5b50505050565b6000821580613d3a575081155b613d71576040805162461bcd60e51b81526020600482015260036024820152622a189b60e91b604482015290519081900360640190fd5b613d79615849565b6001600160a01b0385166000908152600f60205260409020613d9961222e565b6040840181905260208401826003811115613db057fe5b6003811115613dbb57fe5b9052506000905082602001516003811115613dd257fe5b14613df757613dee6009602b8460200151600381111561185457fe5b92505050611269565b6000806000806000600660009054906101000a90046001600160a01b03166001600160a01b031663e36c26e46040518163ffffffff1660e01b815260040160206040518083038186803b158015613e4d57600080fd5b505afa158015613e61573d6000803e3d6000fd5b505050506040513d6020811015613e7757600080fd5b505190508015613e9e57613e8a8b611fee565b60018b018190559198509095508594505050505b6006546001600160a01b031663b8168816613eb761274a565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b158015613f0957600080fd5b505afa158015613f1d573d6000803e3d6000fd5b505050506040513d6020811015613f3357600080fd5b50516003870155808015613fd157506006546001600160a01b03166364f42eda613f5b61274a565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b158015613fa357600080fd5b505afa158015613fb7573d6000803e3d6000fd5b505050506040513d6020811015613fcd57600080fd5b5051155b15614157576006546000906001600160a01b03166315f24053613ff261274a565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b15801561403a57600080fd5b505afa15801561404e573d6000803e3d6000fd5b505050506040513d602081101561406457600080fd5b50516006549091506000906001600160a01b0316636e71e2d861408561274a565b600b54600c546040518463ffffffff1660e01b815260040180848152602001838152602001828152602001935050505060206040518083038186803b1580156140cd57600080fd5b505afa1580156140e1573d6000803e3d6000fd5b505050506040513d60208110156140f757600080fd5b5051604080516020810190915283815290915060009061411790836126f6565b915050614128896003015482612cf3565b975061413490506157b8565b614142888b600301546135f0565b91505061414f818a6126f6565b985050505050505b60001989141561418d5760408051602081018252908801518152865461417d91906126f6565b6080890181905299506141959050565b608087018990525b891561428257606087018a905280156141fe5785548a14156141c057600186015460808801526141f9565b6141c86157b8565b6141d68860600151846156f5565b9150506141e16157b8565b815188546141ef91906135f0565b5160808b01525050505b61427d565b61421a604051806020016040528089604001518152508b6126f6565b608089018190526020890182600381111561423157fe5b600381111561423c57fe5b905250600090508760200151600381111561425357fe5b1461427d5761426f600960298960200151600381111561185457fe5b975050505050505050611269565b614340565b6080870189905280156142cf576142976157b8565b6142a9886080015188600001546156f5565b9150506142b46157b8565b81516142c090856135f0565b5160608b015250614340915050565b6142eb8960405180602001604052808a60400151815250615730565b606089018190526020890182600381111561430257fe5b600381111561430d57fe5b905250600090508760200151600381111561432457fe5b146143405761426f6009602a8960200151600381111561185457fe5b60055460608801516040805163eabe7d9160e01b81523060048201526001600160a01b038f8116602483015260448201939093529051600093929092169163eabe7d919160648082019260209290919082900301818787803b1580156143a557600080fd5b505af11580156143b9573d6000803e3d6000fd5b505050506040513d60208110156143cf57600080fd5b5051905080156143f5576143e66003602883612d7e565b98505050505050505050611269565b6143fd612b1a565b60095414614411576143e6600a602c612857565b614421600d548960600151612cf3565b60a08a0181905260208a0182600381111561443857fe5b600381111561444357fe5b905250600090508860200151600381111561445a57fe5b14614476576143e66009602e8a60200151600381111561185457fe5b614482600e5486612cf3565b60e08a015250865460608901516144999190612cf3565b60c08a0181905260208a018260038111156144b057fe5b60038111156144bb57fe5b90525060009050886020015160038111156144d257fe5b146144ee576143e66009602d8a60200151600381111561185457fe5b60006144f861274a565b905082156145035750475b886080015181101561452b5761451b600e602f612857565b9950505050505050505050611269565b6145398d8a60800151613c51565b60a0890151600d5560e0890151600e5560c089015188556009546002890155600188015460808a015161456c9190612cf3565b9050886001016000829190505550306001600160a01b03168d6001600160a01b03166000805160206158d38339815191528b606001516040518082815260200191505060405180910390a38c6001600160a01b03167fe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a9298a608001518b60600151604051808381526020018281526020019250505060405180910390a2600560009054906101000a90046001600160a01b03166001600160a01b03166351dff989308f8c608001518d606001516040518563ffffffff1660e01b815260040180856001600160a01b03166001600160a01b03168152602001846001600160a01b03166001600160a01b03168152602001838152602001828152602001945050505050600060405180830381600087803b1580156146a757600080fd5b505af11580156146bb573d6000803e3d6000fd5b50600092506146c8915050565b9d9c50505050505050505050505050565b600080836146ec57506000905080612743565b838302838582816146f957fe5b041461470d57506002915060009050612743565b600092509050612743565b6000808261472c5750600190506000612743565b600083858161473757fe5b04915091509250929050565b6001600160a01b038216600090815260116020526040812054819015614796576040805162461bcd60e51b81526020600482015260036024820152622a189960e91b604482015290519081900360640190fd5b60055460408051634ef4c3e160e01b81523060048201526001600160a01b0387811660248301526044820187905291516000939290921691634ef4c3e19160648082019260209290919082900301818787803b1580156147f557600080fd5b505af1158015614809573d6000803e3d6000fd5b505050506040513d602081101561481f57600080fd5b505190508015614843576148366003601f83612d7e565b9250600091506127439050565b61484b612b1a565b6009541461485f57614836600a6022612857565b614867615849565b61486f61222e565b604083018190526020830182600381111561488657fe5b600381111561489157fe5b90525060009050816020015160038111156148a857fe5b146148d2576148c4600960218360200151600381111561185457fe5b935060009250612743915050565b608081018590526148e38682615747565b6148ed86866154e1565b60e082018190526040805160208101825290830151815261490e9190615730565b606083018190526020830182600381111561492557fe5b600381111561493057fe5b905250600090508160200151600381111561494757fe5b1461497f576040805162461bcd60e51b815260206004820152600360248201526254313360e81b604482015290519081900360640190fd5b61498f600d548260600151612de4565b60a08301819052602083018260038111156149a657fe5b60038111156149b157fe5b90525060009050816020015160038111156149c857fe5b14614a00576040805162461bcd60e51b8152602060048201526003602482015262150c4d60ea1b604482015290519081900360640190fd5b6001600160a01b0386166000908152600f60205260409020546060820151614a289190612de4565b60c0830181905260208301826003811115614a3f57fe5b6003811115614a4a57fe5b9052506000905081602001516003811115614a6157fe5b14614a99576040805162461bcd60e51b815260206004820152600360248201526254313560e81b604482015290519081900360640190fd5b6006546000906001600160a01b031663b8168816614ab561274a565b600b54600c546008546040518563ffffffff1660e01b81526004018085815260200184815260200183815260200182815260200194505050505060206040518083038186803b158015614b0757600080fd5b505afa158015614b1b573d6000803e3d6000fd5b505050506040513d6020811015614b3157600080fd5b5051600654604080516338db09b960e21b815290519293506000926001600160a01b039092169163e36c26e491600480820192602092909190829003018186803b158015614b7e57600080fd5b505afa158015614b92573d6000803e3d6000fd5b505050506040513d6020811015614ba857600080fd5b50516001600160a01b0389166000908152600f602052604090205490915015614c8f57614bd36157b8565b8115614bff576000614be48a611fee565b60408051602081019091529081529550614c7e945050505050565b6001600160a01b0389166000908152600f602090815260408083205481518084018352818152825193840183529188015183529291614c3e9190613507565b935090506000816003811115614c5057fe5b14614c7b57614c686009602083600381111561185457fe5b9850600097506127439650505050505050565b50505b8051614c8a9089612de4565b985050505b60a0830151600d556040805160808101825260c0850151815260208082018a815260095483850190815260608085018881526001600160a01b038f166000818152600f8752889020965187559351600187015591516002860155905160039094019390935560e087015192870151845193845291830191909152825190927f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f928290030190a2606083015160408051918252516001600160a01b038a169130916000805160206158d38339815191529181900360200190a3505060e001516000969095509350505050565b6005546040805163368f515360e21b81523060048201526001600160a01b0385811660248301526044820185905291516000938493169163da3d454c91606480830192602092919082900301818787803b158015614dd757600080fd5b505af1158015614deb573d6000803e3d6000fd5b505050506040513d6020811015614e0157600080fd5b505190508015614e2057614e186003600e83612d7e565b915050610ce0565b614e28612b1a565b60095414614e3b57614e18600a80612857565b82614e4461274a565b1015614e5657614e18600e6009612857565b614e5e61588f565b614e6785612a66565b6020830181905282826003811115614e7b57fe5b6003811115614e8657fe5b9052506000905081516003811115614e9a57fe5b14614ebf57614eb6600960078360000151600381111561185457fe5b92505050610ce0565b614ecd816020015185612de4565b6040830181905282826003811115614ee157fe5b6003811115614eec57fe5b9052506000905081516003811115614f0057fe5b14614f1c57614eb66009600c8360000151600381111561185457fe5b614f28600b5485612de4565b6060830181905282826003811115614f3c57fe5b6003811115614f4757fe5b9052506000905081516003811115614f5b57fe5b14614f7757614eb66009600b8360000151600381111561185457fe5b614f81858261574b565b9050614f8d8585613c51565b604080820180516001600160a01b03881660008181526011602090815290859020928355600a54600190930192909255606080860151600b819055935185518a8152938401528285019390935292517f13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80929181900390910190a2600095945050505050565b60055460408051632fe3f38f60e11b81523060048201526001600160a01b0384811660248301528781166044830152868116606483015260848201869052915160009384938493911691635fc7e71e9160a48082019260209290919082900301818787803b15801561508357600080fd5b505af1158015615097573d6000803e3d6000fd5b505050506040513d60208110156150ad57600080fd5b5051905080156150d1576150c46003601283612d7e565b9250600091506154d09050565b6150d9612b1a565b600954146150ed576150c4600a6016612857565b6150f5612b1a565b846001600160a01b0316636c540baf6040518163ffffffff1660e01b815260040160206040518083038186803b15801561512e57600080fd5b505afa158015615142573d6000803e3d6000fd5b505050506040513d602081101561515857600080fd5b50511461516b576150c4600a6011612857565b866001600160a01b0316866001600160a01b03161415615191576150c460066017612857565b846151a2576150c460076015612857565b6000198514156151b8576150c460076014612857565b6000806151c6898989613748565b909250905081156151f6576151e78260108111156151e057fe5b6018612857565b9450600093506154d092505050565b6005546040805163c488847b60e01b81523060048201526001600160a01b038981166024830152604482018590528251600094859492169263c488847b926064808301939192829003018186803b15801561525057600080fd5b505afa158015615264573d6000803e3d6000fd5b505050506040513d604081101561527a57600080fd5b508051602090910151909250905081156152c1576040805162461bcd60e51b815260206004820152600360248201526254313960e81b604482015290519081900360640190fd5b80886001600160a01b03166370a082318c6040518263ffffffff1660e01b815260040180826001600160a01b03166001600160a01b0316815260200191505060206040518083038186803b15801561531857600080fd5b505afa15801561532c573d6000803e3d6000fd5b505050506040513d602081101561534257600080fd5b5051101561537d576040805162461bcd60e51b815260206004820152600360248201526205432360ec1b604482015290519081900360640190fd5b60006001600160a01b0389163014156153a35761539c308d8d856130db565b905061542d565b6040805163b2a02ff160e01b81526001600160a01b038e811660048301528d81166024830152604482018590529151918b169163b2a02ff1916064808201926020929091908290030181600087803b1580156153fe57600080fd5b505af1158015615412573d6000803e3d6000fd5b505050506040513d602081101561542857600080fd5b505190505b8015615466576040805162461bcd60e51b815260206004820152600360248201526254323160e81b604482015290519081900360640190fd5b886001600160a01b03168b6001600160a01b03168d6001600160a01b03167f298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb528786604051808381526020018281526020019250505060405180910390a46000975092955050505050505b94509492505050565b600061111384845b601254604080516370a0823160e01b815230600482015290516000926001600160a01b031691839183916370a08231916024808301926020929190829003018186803b15801561553057600080fd5b505afa158015615544573d6000803e3d6000fd5b505050506040513d602081101561555a57600080fd5b5051604080516323b872dd60e01b81526001600160a01b038881166004830152306024830152604482018890529151929350908416916323b872dd9160648082019260009290919082900301818387803b1580156155b757600080fd5b505af11580156155cb573d6000803e3d6000fd5b5050505060003d600081146155e757602081146155f157600080fd5b60001991506155fd565b60206000803e60005191505b5080615635576040805162461bcd60e51b8152602060048201526002602482015261229960f11b604482015290519081900360640190fd5b601254604080516370a0823160e01b815230600482015290516000926001600160a01b0316916370a08231916024808301926020929190829003018186803b15801561568057600080fd5b505afa158015615694573d6000803e3d6000fd5b505050506040513d60208110156156aa57600080fd5b50519050828110156156e8576040805162461bcd60e51b8152602060048201526002602482015261453360f01b604482015290519081900360640190fd5b9190910395945050505050565b60006156ff6157b8565b615725604051806020016040528086815250604051806020016040528086815250613507565b915091509250929050565b600080600061573d6157b8565b61270d8686615759565b5050565b61575361588f565b50919050565b60006157636157b8565b600080615778670de0b6b3a7640000876146d9565b9092509050600082600381111561578b57fe5b146157aa57506040805160208101909152600081529092509050612743565b61273c8186600001516135f0565b6040518060200160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061580c57805160ff1916838001178555615839565b82800160010185558215615839579182015b8281111561583957825182559160200191906001019061581e565b506158459291506158b8565b5090565b6040805161010081019091528060008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b604080516080810190915280600081526020016000815260200160008152602001600081525090565b610e0891905b8082111561584557600081556001016158be56feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa265627a7a723158206df45d1d75c48e9ae5057d2a4d813943d3ddcf4d7239839922aa3f3fceae578564736f6c63430005100032";
var linkReferences$1 = {
};
var deployedLinkReferences$1 = {
};
var CErc20Artifact = {
	_format: _format$1,
	contractName: contractName$1,
	sourceName: sourceName$1,
	abi: abi$1,
	bytecode: bytecode$1,
	deployedBytecode: deployedBytecode$1,
	linkReferences: linkReferences$1,
	deployedLinkReferences: deployedLinkReferences$1
};

var cToken = function (_CErc) {
  _inherits(cToken, _CErc);
  var _super = _createSuper(cToken);
  function cToken(tropykus, contractAddress, erc20TokenAddress) {
    _classCallCheck(this, cToken);
    return _super.call(this, tropykus, CErc20Artifact.abi, contractAddress, erc20TokenAddress);
  }
  return cToken;
}(CErc20);

var _format = "hh-sol-artifact-1";
var contractName = "Unitroller";
var sourceName = "contracts/Unitroller.sol";
var abi = [
	{
		inputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "error",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "info",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "detail",
				type: "uint256"
			}
		],
		name: "Failure",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldAdmin",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newAdmin",
				type: "address"
			}
		],
		name: "NewAdmin",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldImplementation",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newImplementation",
				type: "address"
			}
		],
		name: "NewImplementation",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldPendingAdmin",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newPendingAdmin",
				type: "address"
			}
		],
		name: "NewPendingAdmin",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldPendingImplementation",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newPendingImplementation",
				type: "address"
			}
		],
		name: "NewPendingImplementation",
		type: "event"
	},
	{
		payable: true,
		stateMutability: "payable",
		type: "fallback"
	},
	{
		constant: false,
		inputs: [
		],
		name: "_acceptAdmin",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "_acceptImplementation",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "newPendingAdmin",
				type: "address"
			}
		],
		name: "_setPendingAdmin",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "newPendingImplementation",
				type: "address"
			}
		],
		name: "_setPendingImplementation",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "admin",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "comptrollerImplementation",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "pendingAdmin",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "pendingComptrollerImplementation",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];
var bytecode = "0x608060405234801561001057600080fd5b50600080546001600160a01b031916331790556105e4806100326000396000f3fe60806040526004361061007b5760003560e01c8063dcfbc0c71161004e578063dcfbc0c71461019e578063e992a041146101b3578063e9c714f2146101e6578063f851a440146101fb5761007b565b806326782247146100fe578063b71d1a0c1461012f578063bb82aa5e14610174578063c1e8033414610189575b6002546040516000916001600160a01b031690829036908083838082843760405192019450600093509091505080830381855af49150503d80600081146100de576040519150601f19603f3d011682016040523d82523d6000602084013e6100e3565b606091505b505090506040513d6000823e8180156100fa573d82f35b3d82fd5b34801561010a57600080fd5b50610113610210565b604080516001600160a01b039092168252519081900360200190f35b34801561013b57600080fd5b506101626004803603602081101561015257600080fd5b50356001600160a01b031661021f565b60408051918252519081900360200190f35b34801561018057600080fd5b506101136102b0565b34801561019557600080fd5b506101626102bf565b3480156101aa57600080fd5b506101136103ba565b3480156101bf57600080fd5b50610162600480360360208110156101d657600080fd5b50356001600160a01b03166103c9565b3480156101f257600080fd5b5061016261044d565b34801561020757600080fd5b50610113610533565b6001546001600160a01b031681565b600080546001600160a01b031633146102455761023e6001600e610542565b90506102ab565b600180546001600160a01b038481166001600160a01b0319831681179093556040805191909216808252602082019390935281517fca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9929181900390910190a160005b9150505b919050565b6002546001600160a01b031681565b6003546000906001600160a01b0316331415806102e557506003546001600160a01b0316155b156102fc576102f5600180610542565b90506103b7565b60028054600380546001600160a01b038082166001600160a01b031980861682179687905590921690925560408051938316808552949092166020840152815190927fd604de94d45953f9138079ec1b82d533cb2160c906d1076d1f7ed54befbca97a92908290030190a1600354604080516001600160a01b038085168252909216602083015280517fe945ccee5d701fc83f9b8aa8ca94ea4219ec1fcbd4f4cab4f0ea57c5c3e1d8159281900390910190a160005b925050505b90565b6003546001600160a01b031681565b600080546001600160a01b031633146103e85761023e6001600f610542565b600380546001600160a01b038481166001600160a01b0319831617928390556040805192821680845293909116602083015280517fe945ccee5d701fc83f9b8aa8ca94ea4219ec1fcbd4f4cab4f0ea57c5c3e1d8159281900390910190a160006102a7565b6001546000906001600160a01b031633141580610468575033155b15610479576102f560016000610542565b60008054600180546001600160a01b038082166001600160a01b031980861682179687905590921690925560408051938316808552949092166020840152815190927ff9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc92908290030190a1600154604080516001600160a01b038085168252909216602083015280517fca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a99281900390910190a160006103b2565b6000546001600160a01b031681565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa083601181111561057157fe5b83601381111561057d57fe5b604080519283526020830191909152600082820152519081900360600190a18260118111156105a857fe5b939250505056fea265627a7a723158206f46ed6a20f48906463dff3e825d6012fa5cf79c38afa84ec175cd69b60b764864736f6c63430005100032";
var deployedBytecode = "0x60806040526004361061007b5760003560e01c8063dcfbc0c71161004e578063dcfbc0c71461019e578063e992a041146101b3578063e9c714f2146101e6578063f851a440146101fb5761007b565b806326782247146100fe578063b71d1a0c1461012f578063bb82aa5e14610174578063c1e8033414610189575b6002546040516000916001600160a01b031690829036908083838082843760405192019450600093509091505080830381855af49150503d80600081146100de576040519150601f19603f3d011682016040523d82523d6000602084013e6100e3565b606091505b505090506040513d6000823e8180156100fa573d82f35b3d82fd5b34801561010a57600080fd5b50610113610210565b604080516001600160a01b039092168252519081900360200190f35b34801561013b57600080fd5b506101626004803603602081101561015257600080fd5b50356001600160a01b031661021f565b60408051918252519081900360200190f35b34801561018057600080fd5b506101136102b0565b34801561019557600080fd5b506101626102bf565b3480156101aa57600080fd5b506101136103ba565b3480156101bf57600080fd5b50610162600480360360208110156101d657600080fd5b50356001600160a01b03166103c9565b3480156101f257600080fd5b5061016261044d565b34801561020757600080fd5b50610113610533565b6001546001600160a01b031681565b600080546001600160a01b031633146102455761023e6001600e610542565b90506102ab565b600180546001600160a01b038481166001600160a01b0319831681179093556040805191909216808252602082019390935281517fca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9929181900390910190a160005b9150505b919050565b6002546001600160a01b031681565b6003546000906001600160a01b0316331415806102e557506003546001600160a01b0316155b156102fc576102f5600180610542565b90506103b7565b60028054600380546001600160a01b038082166001600160a01b031980861682179687905590921690925560408051938316808552949092166020840152815190927fd604de94d45953f9138079ec1b82d533cb2160c906d1076d1f7ed54befbca97a92908290030190a1600354604080516001600160a01b038085168252909216602083015280517fe945ccee5d701fc83f9b8aa8ca94ea4219ec1fcbd4f4cab4f0ea57c5c3e1d8159281900390910190a160005b925050505b90565b6003546001600160a01b031681565b600080546001600160a01b031633146103e85761023e6001600f610542565b600380546001600160a01b038481166001600160a01b0319831617928390556040805192821680845293909116602083015280517fe945ccee5d701fc83f9b8aa8ca94ea4219ec1fcbd4f4cab4f0ea57c5c3e1d8159281900390910190a160006102a7565b6001546000906001600160a01b031633141580610468575033155b15610479576102f560016000610542565b60008054600180546001600160a01b038082166001600160a01b031980861682179687905590921690925560408051938316808552949092166020840152815190927ff9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc92908290030190a1600154604080516001600160a01b038085168252909216602083015280517fca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a99281900390910190a160006103b2565b6000546001600160a01b031681565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa083601181111561057157fe5b83601381111561057d57fe5b604080519283526020830191909152600082820152519081900360600190a18260118111156105a857fe5b939250505056fea265627a7a723158206f46ed6a20f48906463dff3e825d6012fa5cf79c38afa84ec175cd69b60b764864736f6c63430005100032";
var linkReferences = {
};
var deployedLinkReferences = {
};
var UnitrollerArtifact = {
	_format: _format,
	contractName: contractName,
	sourceName: sourceName,
	abi: abi,
	bytecode: bytecode,
	deployedBytecode: deployedBytecode,
	linkReferences: linkReferences,
	deployedLinkReferences: deployedLinkReferences
};

var Unitroller = function () {
  function Unitroller(contractAddress, tropykus) {
    _classCallCheck(this, Unitroller);
    this.tropykus = tropykus;
    this.address = contractAddress;
    this.instance = new ethers.Contract(contractAddress, UnitrollerArtifact.abi, this.tropykus.ethersProvider);
  }
  _createClass(Unitroller, [{
    key: "setPendingImplementation",
    value: function setPendingImplementation(comptrollerAddress) {
      var _this = this;
      return new Promise(function (resolve, reject) {
        _this.instance.connect(_this.tropykus.account)._setPendingImplementation(comptrollerAddress).then(resolve)["catch"](reject);
      });
    }
  }]);
  return Unitroller;
}();

var Tropykus = function () {
  function Tropykus(providerURL, gasLimit) {
    _classCallCheck(this, Tropykus);
    this.ethersProvider = new ethers.providers.JsonRpcProvider(providerURL);
    this.internalAccount = null;
    this.internalComptroller = null;
    this.internalPriceOracle = null;
    this.currentGasLimit = gasLimit;
    this.markets = [];
  }
  _createClass(Tropykus, [{
    key: "account",
    get: function get() {
      return this.internalAccount;
    }
  }, {
    key: "setAccount",
    value: function setAccount(mnemonic, derivationPath) {
      this.internalAccount = Wallet.fromMnemonic(mnemonic, derivationPath).connect(this.ethersProvider);
    }
  }, {
    key: "gasLimit",
    get: function get() {
      return this.currentGasLimit;
    }
  }, {
    key: "comptroller",
    get: function get() {
      return this.internalComptroller;
    }
  }, {
    key: "priceOracle",
    get: function get() {
      return this.internalPriceOracle;
    }
  }, {
    key: "addMarket",
    value: function () {
      var _addMarket = _asyncToGenerator( regeneratorRuntime.mark(function _callee(artifact) {
        var deployed,
            marketAddress,
            erc20TokenAddress,
            args,
            market,
            address,
            marketDeployed,
            marketFactory,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                deployed = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
                marketAddress = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
                erc20TokenAddress = _args.length > 3 && _args[3] !== undefined ? _args[3] : null;
                args = _args.length > 4 && _args[4] !== undefined ? _args[4] : {
                  comptrollerAddress: '',
                  interestRateModelAddress: '',
                  initialExchangeRate: 0.02,
                  name: '',
                  symbol: '',
                  decimals: 0
                };
                address = marketAddress;
                if (deployed) {
                  _context.next = 23;
                  break;
                }
                _context.t0 = artifact;
                _context.next = _context.t0 === 'CRBTC' ? 9 : _context.t0 === 'CRDOC' ? 14 : 16;
                break;
              case 9:
                marketFactory = new ethers.ContractFactory(CRBTCArtifact.abi, CRBTCArtifact.bytecode, this.account);
                _context.next = 12;
                return marketFactory.deploy(args.comptrollerAddress, args.interestRateModelAddress, ethers.utils.parseEther(args.initialExchangeRate.toString()), args.name, args.symbol, args.decimals, this.account.address);
              case 12:
                marketDeployed = _context.sent;
                return _context.abrupt("break", 18);
              case 14:
                marketFactory = new ethers.ContractFactory(CRDOCArtifact.abi, CRDOCArtifact.bytecode, this.account);
                return _context.abrupt("break", 18);
              case 16:
                marketFactory = new ethers.ContractFactory(CErc20Artifact.abi, CErc20Artifact.bytecode, this.account);
                return _context.abrupt("break", 18);
              case 18:
                if (!(artifact !== 'CRBTC')) {
                  _context.next = 22;
                  break;
                }
                _context.next = 21;
                return marketFactory.deploy(erc20TokenAddress, args.comptrollerAddress, args.interestRateModelAddress, ethers.utils.parseEther(args.initialExchangeRate.toString()), args.name, args.symbol, args.decimals, this.account.address);
              case 21:
                marketDeployed = _context.sent;
              case 22:
                address = marketDeployed.address;
              case 23:
                _context.t1 = artifact;
                _context.next = _context.t1 === 'CRDOC' ? 26 : _context.t1 === 'CRBTC' ? 28 : 30;
                break;
              case 26:
                market = new CRDOC(this, address, erc20TokenAddress);
                return _context.abrupt("break", 32);
              case 28:
                market = new CRBTC(this, address);
                return _context.abrupt("break", 32);
              case 30:
                market = new cToken(this, address, erc20TokenAddress);
                return _context.abrupt("break", 32);
              case 32:
                this.markets.push(market);
                return _context.abrupt("return", market);
              case 34:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function addMarket(_x) {
        return _addMarket.apply(this, arguments);
      }
      return addMarket;
    }()
  }, {
    key: "setComptroller",
    value: function () {
      var _setComptroller = _asyncToGenerator( regeneratorRuntime.mark(function _callee2(comptrollerAddress) {
        var deployed,
            args,
            unitrollerFactory,
            unitrollerDeployed,
            unitroller,
            comptrollerFactory,
            comptrollerDeployed,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                deployed = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : true;
                args = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {
                  priceOracleAddress: '',
                  closeFactor: 0.5,
                  liquidationIncentive: 0.07
                };
                if (deployed) {
                  _context2.next = 21;
                  break;
                }
                unitrollerFactory = new ethers.ContractFactory(UnitrollerArtifact.abi, UnitrollerArtifact.bytecode, this.account);
                _context2.next = 6;
                return unitrollerFactory.deploy();
              case 6:
                unitrollerDeployed = _context2.sent;
                unitroller = new Unitroller(unitrollerDeployed.address, this);
                comptrollerFactory = new ethers.ContractFactory(ComptrollerArtifact.abi, ComptrollerArtifact.bytecode, this.account);
                _context2.next = 11;
                return comptrollerFactory.deploy();
              case 11:
                comptrollerDeployed = _context2.sent;
                _context2.next = 14;
                return unitroller.setPendingImplementation(comptrollerDeployed.address);
              case 14:
                this.internalComptroller = new Comptroller(comptrollerDeployed.address, this);
                this.internalComptroller.become(unitroller.address);
                this.internalComptroller.setOracle(args.priceOracleAddress);
                this.internalComptroller.setCloseFactor(args.closeFactor);
                this.internalComptroller.setLiquidationIncentive(args.liquidationIncentive);
                _context2.next = 22;
                break;
              case 21:
                this.internalComptroller = new Comptroller(comptrollerAddress, this);
              case 22:
                return _context2.abrupt("return", this.internalComptroller);
              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function setComptroller(_x2) {
        return _setComptroller.apply(this, arguments);
      }
      return setComptroller;
    }()
  }, {
    key: "setPriceOracle",
    value: function setPriceOracle(priceOracleAddress) {
      this.internalPriceOracle = new PriceOracle(priceOracleAddress, this);
    }
  }]);
  return Tropykus;
}();

export { Tropykus as default };
