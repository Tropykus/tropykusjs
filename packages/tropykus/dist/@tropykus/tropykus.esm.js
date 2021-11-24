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

var ComptrollerAbi = [
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

var Comptroller = function () {
  function Comptroller(contractAddress, tropykus) {
    _classCallCheck(this, Comptroller);
    this.tropykus = tropykus;
    this.instance = new ethers.Contract(contractAddress, ComptrollerAbi, this.tropykus.ethersProvider);
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
  }]);
  return Comptroller;
}();

var CRBTCAbi = [
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
    key: "redeem",
    value: function redeem(account, amount) {
      var _this6 = this;
      var maxValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return new Promise(function (resolve, reject) {
        if (maxValue) {
          _this6.instance.callStatic.balanceOf(account.address).then(function (kTokens) {
            return _this6.instance.connect(account).redeem(kTokens, {
              gasLimit: _this6.tropykus.gasLimit
            });
          }).then(resolve)["catch"](reject);
        } else {
          _this6.instance.connect(account).redeemUnderlying(ethers.utils.parseEther(amount.toString()), {
            gasLimit: _this6.tropykus.gasLimit
          }).then(resolve)["catch"](reject);
        }
      });
    }
  }, {
    key: "repayBorrow",
    value: function repayBorrow(account, amount) {
      console.log('bye', account, amount, this);
    }
  }]);
  return Market;
}();

var CRBTC = function (_Market) {
  _inherits(CRBTC, _Market);
  var _super = _createSuper(CRBTC);
  function CRBTC(tropykus, contractAddress) {
    _classCallCheck(this, CRBTC);
    return _super.call(this, tropykus, CRBTCAbi, contractAddress);
  }
  return CRBTC;
}(Market);

var CRDOCAbi = "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"underlying_\",\"type\":\"address\"},{\"internalType\":\"contract ComptrollerInterface\",\"name\":\"comptroller_\",\"type\":\"address\"},{\"internalType\":\"contract InterestRateModel\",\"name\":\"interestRateModel_\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"initialExchangeRateMantissa_\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"name_\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"symbol_\",\"type\":\"string\"},{\"internalType\":\"uint8\",\"name\":\"decimals_\",\"type\":\"uint8\"},{\"internalType\":\"address payable\",\"name\":\"admin_\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"cashPrior\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"interestAccumulated\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"borrowIndex\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"totalBorrows\",\"type\":\"uint256\"}],\"name\":\"AccrueInterest\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"borrower\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"borrowAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"accountBorrows\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"totalBorrows\",\"type\":\"uint256\"}],\"name\":\"Borrow\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"error\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"info\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"detail\",\"type\":\"uint256\"}],\"name\":\"Failure\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"liquidator\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"borrower\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"repayAmount\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"cTokenCollateral\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"seizeTokens\",\"type\":\"uint256\"}],\"name\":\"LiquidateBorrow\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"minter\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"mintAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"mintTokens\",\"type\":\"uint256\"}],\"name\":\"Mint\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"oldAdmin\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"newAdmin\",\"type\":\"address\"}],\"name\":\"NewAdmin\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"contract ComptrollerInterface\",\"name\":\"oldComptroller\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"contract ComptrollerInterface\",\"name\":\"newComptroller\",\"type\":\"address\"}],\"name\":\"NewComptroller\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"contract InterestRateModel\",\"name\":\"oldInterestRateModel\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"contract InterestRateModel\",\"name\":\"newInterestRateModel\",\"type\":\"address\"}],\"name\":\"NewMarketInterestRateModel\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"oldPendingAdmin\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"newPendingAdmin\",\"type\":\"address\"}],\"name\":\"NewPendingAdmin\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"oldReserveFactorMantissa\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newReserveFactorMantissa\",\"type\":\"uint256\"}],\"name\":\"NewReserveFactor\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"redeemer\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"redeemAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"redeemTokens\",\"type\":\"uint256\"}],\"name\":\"Redeem\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"payer\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"borrower\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"repayAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"accountBorrows\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"totalBorrows\",\"type\":\"uint256\"}],\"name\":\"RepayBorrow\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"benefactor\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"addAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newTotalReserves\",\"type\":\"uint256\"}],\"name\":\"ReservesAdded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"admin\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"reduceAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newTotalReserves\",\"type\":\"uint256\"}],\"name\":\"ReservesReduced\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"benefactor\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"addAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newSubsidyFund\",\"type\":\"uint256\"}],\"name\":\"SubsidyAdded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"constant\":false,\"inputs\":[],\"name\":\"_acceptAdmin\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"addAmount\",\"type\":\"uint256\"}],\"name\":\"_addReserves\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"reduceAmount\",\"type\":\"uint256\"}],\"name\":\"_reduceReserves\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"contract ComptrollerInterface\",\"name\":\"newComptroller\",\"type\":\"address\"}],\"name\":\"_setComptroller\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"contract InterestRateModel\",\"name\":\"newInterestRateModel\",\"type\":\"address\"}],\"name\":\"_setInterestRateModel\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address payable\",\"name\":\"newPendingAdmin\",\"type\":\"address\"}],\"name\":\"_setPendingAdmin\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"newReserveFactorMantissa\",\"type\":\"uint256\"}],\"name\":\"_setReserveFactor\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"accrualBlockNumber\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"accrueInterest\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"admin\",\"outputs\":[{\"internalType\":\"address payable\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOfUnderlying\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"borrowAmount\",\"type\":\"uint256\"}],\"name\":\"borrow\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"borrowBalanceCurrent\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"borrowBalanceStored\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"borrowIndex\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"borrowRatePerBlock\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"comptroller\",\"outputs\":[{\"internalType\":\"contract ComptrollerInterface\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"exchangeRateCurrent\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"exchangeRateStored\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"getAccountSnapshot\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"getBorrowerPrincipalStored\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"borrowed\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getCash\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"getSupplierSnapshotStored\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"tokens\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"underlyingAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"suppliedAt\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"promisedSupplyRate\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"initialExchangeRateMantissa\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"underlying_\",\"type\":\"address\"},{\"internalType\":\"contract ComptrollerInterface\",\"name\":\"comptroller_\",\"type\":\"address\"},{\"internalType\":\"contract InterestRateModel\",\"name\":\"interestRateModel_\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"initialExchangeRateMantissa_\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"name_\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"symbol_\",\"type\":\"string\"},{\"internalType\":\"uint8\",\"name\":\"decimals_\",\"type\":\"uint8\"}],\"name\":\"initialize\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"contract ComptrollerInterface\",\"name\":\"comptroller_\",\"type\":\"address\"},{\"internalType\":\"contract InterestRateModel\",\"name\":\"interestRateModel_\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"initialExchangeRateMantissa_\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"name_\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"symbol_\",\"type\":\"string\"},{\"internalType\":\"uint8\",\"name\":\"decimals_\",\"type\":\"uint8\"}],\"name\":\"initialize\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"interestRateModel\",\"outputs\":[{\"internalType\":\"contract InterestRateModel\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"isCToken\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"borrower\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"repayAmount\",\"type\":\"uint256\"},{\"internalType\":\"contract CTokenInterface\",\"name\":\"cTokenCollateral\",\"type\":\"address\"}],\"name\":\"liquidateBorrow\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"mintAmount\",\"type\":\"uint256\"}],\"name\":\"mint\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"pendingAdmin\",\"outputs\":[{\"internalType\":\"address payable\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"redeemTokens\",\"type\":\"uint256\"}],\"name\":\"redeem\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"redeemAmount\",\"type\":\"uint256\"}],\"name\":\"redeemUnderlying\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"repayAmount\",\"type\":\"uint256\"}],\"name\":\"repayBorrow\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"borrower\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"repayAmount\",\"type\":\"uint256\"}],\"name\":\"repayBorrowBehalf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"reserveFactorMantissa\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"liquidator\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"borrower\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"seizeTokens\",\"type\":\"uint256\"}],\"name\":\"seize\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"subsidyFund\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"supplyRatePerBlock\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"contract EIP20NonStandardInterface\",\"name\":\"token\",\"type\":\"address\"}],\"name\":\"sweepToken\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalBorrows\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"totalBorrowsCurrent\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalReserves\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"dst\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"src\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"dst\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"tropykusInterestAccrued\",\"outputs\":[{\"internalType\":\"enum CarefulMath.MathError\",\"name\":\"\",\"type\":\"uint8\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"underlying\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"}]";

var StandartTokenAbi = [
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
    _this.erc20Instance = new ethers.Contract(erc20TokenAddress, StandartTokenAbi, _this.tropykus.ethersProvider);
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
    return _super.call(this, tropykus, CRDOCAbi, contractAddress, erc20TokenAddress);
  }
  return CRDOC;
}(CErc20);

var CErc20ImmutableAbi = [
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

var cToken = function (_CErc) {
  _inherits(cToken, _CErc);
  var _super = _createSuper(cToken);
  function cToken(tropykus, contractAddress, erc20TokenAddress) {
    _classCallCheck(this, cToken);
    return _super.call(this, tropykus, CErc20ImmutableAbi, contractAddress, erc20TokenAddress);
  }
  return cToken;
}(CErc20);

var Tropykus = function () {
  function Tropykus(providerURL, gasLimit) {
    _classCallCheck(this, Tropykus);
    this.ethersProvider = new ethers.providers.JsonRpcProvider(providerURL);
    this.internalAccount = null;
    this.internalComptroller = null;
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
                  _context.next = 17;
                  break;
                }
                marketFactory = new ethers.ContractFactory(artifact);
                if (!(artifact === 'CRBTC')) {
                  _context.next = 13;
                  break;
                }
                _context.next = 10;
                return marketFactory.deploy(args.comptrollerAddress, args.interestRateModelAddress, ethers.utils.parseEther(args.initialExchangeRate.toString()), args.name, args.symbol, args.decimals, this.account.address);
              case 10:
                marketDeployed = _context.sent;
                _context.next = 16;
                break;
              case 13:
                _context.next = 15;
                return marketFactory.deploy(erc20TokenAddress, args.comptrollerAddress, args.interestRateModelAddress, ethers.utils.parseEther(args.initialExchangeRate.toString()), args.name, args.symbol, args.decimals, this.account.address);
              case 15:
                marketDeployed = _context.sent;
              case 16:
                address = marketDeployed.address;
              case 17:
                _context.t0 = artifact;
                _context.next = _context.t0 === 'CRDOC' ? 20 : _context.t0 === 'CRBTC' ? 22 : 24;
                break;
              case 20:
                market = new CRDOC(this, address, erc20TokenAddress);
                return _context.abrupt("break", 26);
              case 22:
                market = new CRBTC(this, address);
                return _context.abrupt("break", 26);
              case 24:
                market = new cToken(this, address, erc20TokenAddress);
                return _context.abrupt("break", 26);
              case 26:
                this.markets.push(market);
                return _context.abrupt("return", market);
              case 28:
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
    value: function setComptroller(comptrollerAddress) {
      this.internalComptroller = new Comptroller(comptrollerAddress, this);
    }
  }]);
  return Tropykus;
}();

export { Tropykus as default };
