'use strict';

var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var ethers = require('ethers');
var _inherits = require('@babel/runtime/helpers/inherits');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

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
    _classCallCheck__default["default"](this, Comptroller);
    this.tropykus = tropykus;
    this.instance = new ethers.ethers.Contract(contractAddress, ComptrollerAbi, this.tropykus.ethersProvider);
  }
  _createClass__default["default"](Comptroller, [{
    key: "allMarkets",
    value: function allMarkets() {
      var _this = this;
      return new Promise(function (resolve, reject) {
        _this.instance.callStatic.getAllMarkets().then(resolve).catch(reject);
      });
    }
  }, {
    key: "getAssetsIn",
    value: function getAssetsIn(account) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        _this2.instance.callStatic.getAssetsIn(account.address).then(resolve).catch(reject);
      });
    }
  }, {
    key: "enterMarkets",
    value: function enterMarkets(account, marketAddresses) {
      var _this3 = this;
      return new Promise(function (resolve, reject) {
        _this3.instance.connect(account).enterMarkets(marketAddresses).then(resolve).catch(reject);
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
  function Market(tropykus, marketAddress, ABI) {
    _classCallCheck__default["default"](this, Market);
    this.tropykus = tropykus;
    this.instance = new ethers.ethers.Contract(marketAddress, ABI, this.tropykus.ethersProvider);
    this.address = marketAddress;
  }
  _createClass__default["default"](Market, [{
    key: "balanceOfUnderlying",
    value: function balanceOfUnderlying(account) {
      var _this = this;
      return new Promise(function (resolve, reject) {
        _this.instance.connect(account).callStatic.balanceOf(account.address).then(resolve).catch(reject);
      });
    }
  }, {
    key: "mint",
    value: function mint(account, amount) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        _this2.instance.connect(account).mint({
          value: amount,
          gasLimit: _this2.tropykus.gasLimit
        }).then(resolve).catch(reject);
      });
    }
  }]);
  return Market;
}();

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }
function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CRBTC = function (_Market) {
  _inherits__default["default"](CRBTC, _Market);
  var _super = _createSuper$1(CRBTC);
  function CRBTC(tropykus, contractAddress) {
    _classCallCheck__default["default"](this, CRBTC);
    return _super.call(this, tropykus, contractAddress, CRBTCAbi);
  }
  return CRBTC;
}(Market);

var CTokenAbi = [
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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CToken = function (_Market) {
  _inherits__default["default"](CToken, _Market);
  var _super = _createSuper(CToken);
  function CToken(tropykus, contractAddress, erc20TokenAddress) {
    var _this;
    _classCallCheck__default["default"](this, CToken);
    _this = _super.call(this, tropykus, contractAddress, CTokenAbi);
    if (erc20TokenAddress === null || erc20TokenAddress === undefined) {
      throw new Error('Must provide a valid erc20 token address');
    }
    _this.erc20Instance = new ethers.ethers.Contract(erc20TokenAddress, StandartTokenAbi, _this.tropykus.ethersProvider);
    return _this;
  }
  _createClass__default["default"](CToken, [{
    key: "mint",
    value: function () {
      var _mint = _asyncToGenerator__default["default"]( _regeneratorRuntime__default["default"].mark(function _callee(account, amount) {
        return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.erc20Instance.connect(account).approve(this.address, amount);
              case 2:
                return _context.abrupt("return", this.instance.connect(account).mint(amount, {
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
  return CToken;
}(Market);

var Tropykus = function () {
  function Tropykus(providerURL, gasLimit) {
    _classCallCheck__default["default"](this, Tropykus);
    this.ethersProvider = new ethers.ethers.providers.JsonRpcProvider(providerURL);
    this.internalAccount = null;
    this.internalComptroller = null;
    this.currentMarket = null;
    this.currentGasLimit = gasLimit;
    this.markets = [];
  }
  _createClass__default["default"](Tropykus, [{
    key: "account",
    get: function get() {
      return this.internalAccount;
    }
  }, {
    key: "setAccount",
    value: function setAccount(mnemonic, derivationPath) {
      this.internalAccount = ethers.Wallet.fromMnemonic(mnemonic, derivationPath).connect(this.ethersProvider);
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
    key: "setComptroller",
    value: function setComptroller(comptrollerAddress) {
      this.internalComptroller = new Comptroller(comptrollerAddress, this);
    }
  }, {
    key: "market",
    get: function get() {
      return this.currentMarket;
    }
  }, {
    key: "addMarket",
    value: function addMarket(marketAddress) {
      var isCRBTCMarket = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var erc20TokenAddress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (isCRBTCMarket) {
        this.currentMarket = new CRBTC(this, marketAddress);
      } else {
        this.currentMarket = new CToken(this, marketAddress, erc20TokenAddress);
      }
      this.markets.push(this.currentMarket);
      return this.currentMarket;
    }
  }]);
  return Tropykus;
}();

module.exports = Tropykus;
